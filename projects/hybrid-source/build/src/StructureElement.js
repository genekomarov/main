"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetResult = exports.Meta = void 0;
class Meta {
    constructor(hasMore, nextOrder) {
        this.hasMore = hasMore;
        this.nextOrder = nextOrder;
    }
}
exports.Meta = Meta;
/** Резутьтат запроса */
class GetResult {
    constructor(items, parent, hasMore, nextOrder) {
        this.items = items;
        this.parent = parent;
        this.meta = new Meta(hasMore, nextOrder);
    }
}
exports.GetResult = GetResult;
/** Элементы с одним родителем */
class StructureElement {
    constructor(parent) {
        this._items = [];
        this._readPos = 0;
        this._nextMeta = new Meta(true, null);
        this._parent = parent;
    }
    /** Добавление элементов */
    add(items, reSort) {
        if (reSort) {
            const endPos = this._items.length;
            const beginItems = this._items.slice(0, this._readPos);
            const endItems = this._items.slice(this._readPos, endPos);
            this._items = beginItems.concat(sort(endItems.concat(items)));
        }
        else {
            this._items.push(...items);
        }
    }
    /** Произвольное чтение */
    get(limit, offset, remove) {
        const startPos = limit * offset;
        const endPos = startPos + limit;
        const actualEndPos = getEndPos(this._items, endPos);
        const itemsLength = this._items.length;
        const beginItems = this._items.slice(0, startPos === 0 ? 0 : startPos - 1);
        const middleItems = this._items.slice(startPos, actualEndPos);
        const endItems = this._items.slice(actualEndPos, itemsLength);
        const hasMore = actualEndPos < itemsLength;
        let nextItemPos = actualEndPos;
        if (remove) {
            this._items = beginItems.concat(endItems);
            nextItemPos = actualEndPos - limit;
        }
        return new GetResult(middleItems, this._parent, hasMore, hasMore ? this._items[nextItemPos].order : null);
    }
    /** Последовательное чтение */
    getNext(limit, remove) {
        const offset = this._readPos === 0 ? 0 : this._readPos / limit;
        const getResult = this.get(limit, offset, remove);
        if (!remove) {
            this._readPos += limit;
        }
        this._nextMeta = getResult.meta;
        return getResult;
    }
    /** Получить метаинформацию по следующему элементу */
    getNextMeta() {
        return this._nextMeta;
    }
}
exports.default = StructureElement;
/** получить фактический индекс последнего элемента в выборке */
function getEndPos(items, endPos) {
    const itemsEndPos = items.length;
    if (endPos >= itemsEndPos) {
        return itemsEndPos;
    }
    return endPos;
}
/** Функция сортировки */
function sort(items) {
    return items.sort((itemA, itemB) => {
        const idA = itemA.id;
        const idB = itemB.id;
        const orderA = itemA.order;
        const orderB = itemB.order;
        if (orderA < orderB) {
            return -1;
        }
        if (orderA > orderB) {
            return 1;
        }
        if (idA < idB) {
            return -1;
        }
        if (idA > idB) {
            return 1;
        }
        return 0;
    });
}
