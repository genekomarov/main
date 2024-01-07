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
const Unit_1 = __importDefault(require("./Unit"));
/** Класс для работы с разбитой по родителям структурой, дополненный массовыми операциями */
class BulkOperationsUnit extends Unit_1.default {
    /** Массовое добавление элементов */
    addBulk(items, reSort) {
        const itemsByParents = {};
        items.forEach((item) => {
            const { parent } = item;
            if (!itemsByParents.hasOwnProperty(parent)) {
                itemsByParents[parent] = [];
            }
            itemsByParents[parent].push(item);
        });
        for (const parent in itemsByParents) {
            if (itemsByParents.hasOwnProperty(parent)) {
                this.add({ parent, items: itemsByParents[parent], reSort: reSort });
            }
        }
    }
    /** Массовое произвольное чтение */
    getBulk(parents, toFirstLeaf, limit, offset) {
        return this._getBulk(this.get, toFirstLeaf, parents, { limit, offset });
    }
    /** Массовое последовательное чтение */
    getNextBulk(parents, toFirstLeaf, limit, remove) {
        return this._getBulk(this.getNext, toFirstLeaf, parents, { limit, remove, offset: 0 });
    }
    _getBulk(getMethod, toFirstLeaf, parents, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            if (!toFirstLeaf) {
                for (const parent of parents) {
                    result[parent] = yield getMethod(Object.assign(Object.assign({}, params), { parent }));
                }
            }
            return result;
        });
    }
}
exports.default = BulkOperationsUnit;
