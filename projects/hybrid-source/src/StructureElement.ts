import {IItem} from './interface';

export class Meta {
    hasMore: boolean;
    nextOrder: number | null;
    constructor(hasMore: boolean, nextOrder: number | null) {
        this.hasMore = hasMore;
        this.nextOrder = nextOrder;
    }
}

/** Резутьтат запроса */
export class GetResult<DATA> {
    items: IItem<DATA>[];
    parent: string;
    meta: Meta
    constructor(items: IItem<DATA>[], parent: string, hasMore: boolean, nextOrder: number | null) {
        this.items = items;
        this.parent = parent;
        this.meta = new Meta(hasMore, nextOrder);
    }
}

/** Элементы с одним родителем */
export default class StructureElement<DATA> {
    private _items: IItem<DATA>[] = [];
    private _readPos: number = 0;
    private _nextMeta: Meta = new Meta(true, null);
    private readonly _parent: string;

    constructor(parent: string) {
        this._parent = parent;
    }

    /** Добавление элементов */
    add(items: IItem<DATA>[], reSort: boolean): void {
        if (reSort) {
            const endPos: number = this._items.length;
            const beginItems: IItem<DATA>[] = this._items.slice(0, this._readPos);
            const endItems: IItem<DATA>[] = this._items.slice(this._readPos, endPos);
            this._items = beginItems.concat(sort<DATA>(endItems.concat(items)));
        } else {
            this._items.push(...items);
        }
    }

    /** Произвольное чтение */
    get(limit: number, offset: number, remove?: boolean): GetResult<DATA> {
        const startPos: number = limit * offset;
        const endPos: number = startPos + limit;
        const actualEndPos: number = getEndPos<DATA>(this._items, endPos);
        const itemsLength = this._items.length;

        const beginItems = this._items.slice(0, startPos === 0 ? 0 : startPos -1);
        const middleItems = this._items.slice(startPos, actualEndPos);
        const endItems = this._items.slice(actualEndPos, itemsLength);

        const hasMore = actualEndPos < itemsLength;
        let nextItemPos = actualEndPos;

        if (remove) {
            this._items = beginItems.concat(endItems);
            nextItemPos = actualEndPos - limit;
        }

        return new GetResult(
            middleItems,
            this._parent,
            hasMore,
            hasMore ? this._items[nextItemPos].order : null
        );
    }

    /** Последовательное чтение */
    getNext(limit: number, remove?: boolean): GetResult<DATA> {
        const offset = this._readPos === 0 ? 0 : this._readPos / limit;
        const getResult = this.get(limit, offset, remove);
        if (!remove) {
            this._readPos += limit;
        }
        this._nextMeta = getResult.meta;
        return getResult;
    }

    /** Получить метаинформацию по следующему элементу */
    getNextMeta(): Meta {
        return this._nextMeta;
    }
}

/** получить фактический индекс последнего элемента в выборке */
function getEndPos<DATA>(items: IItem<DATA>[], endPos: number): number {
    const itemsEndPos: number = items.length;
    if (endPos >= itemsEndPos) {
        return itemsEndPos;
    }
    return endPos;
}

/** Функция сортировки */
function sort<DATA>(items: IItem<DATA>[]): IItem<DATA>[] {
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
