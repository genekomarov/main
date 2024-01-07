"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BulkOperationsUnit_1 = __importDefault(require("./BulkOperationsUnit"));
const helpers_1 = require("./helpers");
class BaseSource {
    constructor(units) {
        /** Кэш */
        this._cache = new BulkOperationsUnit_1.default();
        /** Буфер */
        this._buffer = new BulkOperationsUnit_1.default();
        this._units = units;
    }
    /** Получить выборку */
    query(parents, limit, offset) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const methods = [this._getFromBuffer, this._getFromCache];
            const page = {};
            let fillRemindParents = [...parents];
            do {
                const methodListEmpty = !!methods.length;
                const method = (_a = methods.pop()) !== null && _a !== void 0 ? _a : this._getFromUnits;
                const addPage = yield method(fillRemindParents, limit, offset);
                mergePages(page, addPage);
                const emptyParents = methodListEmpty ? calcEmptyParents(addPage, fillRemindParents) : [];
                fillRemindParents = this._hasFillRemind(page, fillRemindParents, emptyParents, limit);
            } while (fillRemindParents.length);
            const spread = spreadPage(page);
            const treeSequence = (0, helpers_1.makeTreeSequence)(spread, parents[0]);
            return treeSequence.map((item) => item.data);
        });
    }
    /** Получить из кэша */
    _getFromCache(parents, limit, offset) {
        return getBulkExecute(this._cache, parents, limit, offset);
    }
    /** Получить из буфера */
    _getFromBuffer(parents, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageFromBuffer = yield getBulkExecute(this._buffer, parents, limit, offset);
            const spread = spreadPage(pageFromBuffer);
            this._cache.addBulk(spread, false);
            return pageFromBuffer;
        });
    }
    /** Получить из юнитов */
    _getFromUnits(parents, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = {};
            const unitsWithMinOrder = getUnitsWithMinOrder(this._units, parents[0]);
            for (const unit of unitsWithMinOrder) {
                const pageFromUnit = yield getBulkExecute(unit, parents, limit, offset);
                mergePages(page, pageFromUnit);
            }
            const spread = spreadPage(page);
            this._buffer.addBulk(spread, false);
            return this._getFromBuffer(parents, limit, offset);
        });
    }
    _hasFillRemind(page, parents, emptyParents, limit) {
        // 1. Выбираем все содержащиеся в результатах + из исходного запроса
        let fillRemindParents = Array.from(new Set(Object.keys(page).concat(parents)));
        // 2. Убираем те, которые полностью вычитаны
        fillRemindParents = fillRemindParents.filter((parent) => !emptyParents.includes(parent));
        // 3. По оставшимся страницы должны быть заполнены
        return fillRemindParents.filter((parent) => !page.hasOwnProperty(parent) || page[parent].length < limit);
    }
}
exports.default = BaseSource;
/** Выполнить массовое получение результатов из юнита */
function getBulkExecute(unit, parents, limit, offset) {
    return __awaiter(this, void 0, void 0, function* () {
        const bulkResult = yield unit.getBulk(parents, true, limit, offset);
        return spreadBulkResult(bulkResult);
    });
}
/** Раскладывает результат get метода в страницу */
function spreadBulkResult(bulkResult) {
    var _a;
    const page = {};
    for (const parent in bulkResult) {
        if (bulkResult.hasOwnProperty(parent) && bulkResult[parent] !== null) {
            const items = (_a = bulkResult[parent]) === null || _a === void 0 ? void 0 : _a.items;
            if (items) {
                page[parent] = items;
            }
        }
    }
    return page;
}
/** Мерджит страницы */
function mergePages(page, mergedPage) {
    for (const parent in mergedPage) {
        if (mergedPage.hasOwnProperty(parent)) {
            if (page.hasOwnProperty(parent)) {
                page[parent] = Array.from(new Set(page[parent].concat(mergedPage[parent])));
            }
            else {
                page[parent] = mergedPage[parent];
            }
        }
    }
}
/** Разложить страницу в массив */
function spreadPage(page) {
    const result = [];
    for (const parent in page) {
        if (page.hasOwnProperty(parent)) {
            result.push(...page[parent]);
        }
    }
    return result;
}
/** Получить юнит с минимальным ордером */
function getUnitsWithMinOrder(units, parent) {
    const notSurveyedUnits = units.filter((unit) => {
        const { hasMore, nextOrder } = unit.getNextMeta(parent);
        return hasMore && nextOrder === null;
    });
    if (notSurveyedUnits.length) {
        return notSurveyedUnits;
    }
    let minOrder = null;
    let foundIndex = null;
    units.forEach((unit, index) => {
        const { hasMore, nextOrder } = unit.getNextMeta(parent);
        if (!hasMore || nextOrder === null) {
            return;
        }
        if (minOrder === null) {
            minOrder = nextOrder;
            foundIndex = index;
            return;
        }
        if (nextOrder < minOrder) {
            minOrder = nextOrder;
            foundIndex = index;
            return;
        }
    });
    if (foundIndex !== null) {
        return [units[foundIndex]];
    }
    return [];
}
/** Посчитать по каким родителям вернулись результаты */
function calcEmptyParents(page, parents) {
    return parents.filter((parent) => {
        return !page.hasOwnProperty(parent);
    });
}
