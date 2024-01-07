import BulkOperationsUnit, {IGetBulkResult} from './BulkOperationsUnit';
import {IByParentStructure, IItem} from './interface';
import {makeTreeSequence} from './helpers';

type IPage<DATA> = IByParentStructure<IItem<DATA>[]>;
type TGetMethod<DATA> = (parents: string[], limit: number, offset: number) =>  Promise<IPage<DATA>>;

export default class BaseSource<DATA> {

    /** Источники */
    private readonly _units: BulkOperationsUnit<DATA>[];
    /** Кэш */
    private readonly _cache: BulkOperationsUnit<DATA> = new BulkOperationsUnit<DATA>();
    /** Буфер */
    private readonly _buffer: BulkOperationsUnit<DATA> = new BulkOperationsUnit<DATA>();

    constructor(units: BulkOperationsUnit<DATA>[]) {
        this._units = units;
    }

    /** Получить выборку */
    async query(parents: string[], limit: number, offset: number): Promise<DATA[]> {
        const methods: TGetMethod<DATA>[] = [this._getFromBuffer, this._getFromCache];
        const page: IPage<DATA> = {};
        let fillRemindParents: string[] = [...parents];

        do {
            const methodListEmpty = !!methods.length;
            const method = methods.pop() ?? this._getFromUnits;
            const addPage = await method(fillRemindParents, limit, offset);
            mergePages<DATA>(page, addPage);

            const emptyParents: string[] = methodListEmpty ? calcEmptyParents(addPage, fillRemindParents) : [];
            fillRemindParents = this._hasFillRemind(page, fillRemindParents, emptyParents, limit);

        } while (fillRemindParents.length);

        const spread = spreadPage<DATA>(page);
        const treeSequence = makeTreeSequence<DATA>(spread, parents[0]);
        return treeSequence.map((item) => item.data);
    }

    /** Получить из кэша */
    private _getFromCache(parents: string[], limit: number, offset: number): Promise<IPage<DATA>> {
        return getBulkExecute(this._cache, parents, limit, offset);
    }


    /** Получить из буфера */
    private async _getFromBuffer(parents: string[], limit: number, offset: number): Promise<IPage<DATA>> {
        const pageFromBuffer = await getBulkExecute(this._buffer, parents, limit, offset);
        const spread = spreadPage<DATA>(pageFromBuffer);
        this._cache.addBulk(spread, false);
        return pageFromBuffer;
    }

    /** Получить из юнитов */
    private async _getFromUnits(parents: string[], limit: number, offset: number): Promise<IPage<DATA>> {
        const page: IPage<DATA> = {};
        const unitsWithMinOrder: BulkOperationsUnit<DATA>[] = getUnitsWithMinOrder<DATA>(this._units, parents[0]);
        for (const unit of unitsWithMinOrder) {
            const pageFromUnit = await getBulkExecute(unit, parents, limit, offset);
            mergePages<DATA>(page, pageFromUnit);
        }
        const spread = spreadPage<DATA>(page);
        this._buffer.addBulk(spread, false);
        return this._getFromBuffer(parents, limit, offset);
    }

    private _hasFillRemind(page: IPage<DATA>, parents: string[], emptyParents: string[], limit: number): string[] {
        // 1. Выбираем все содержащиеся в результатах + из исходного запроса
        let fillRemindParents = Array.from(new Set(Object.keys(page).concat(parents)));

        // 2. Убираем те, которые полностью вычитаны
        fillRemindParents = fillRemindParents.filter((parent) => !emptyParents.includes(parent));

        // 3. По оставшимся страницы должны быть заполнены
        return fillRemindParents.filter((parent) => !page.hasOwnProperty(parent) || page[parent].length < limit);
    }
}

/** Выполнить массовое получение результатов из юнита */
async function getBulkExecute<DATA>(unit: BulkOperationsUnit<DATA>, parents: string[], limit: number, offset: number): Promise<IPage<DATA>> {
    const bulkResult = await unit.getBulk(parents, true, limit, offset);
    return spreadBulkResult(bulkResult);
}

/** Раскладывает результат get метода в страницу */
function spreadBulkResult<DATA>(bulkResult: IGetBulkResult<DATA>): IPage<DATA> {
    const page: IPage<DATA> = {}
    for (const parent in bulkResult) {
        if (bulkResult.hasOwnProperty(parent) && bulkResult[parent] !== null) {
            const items = bulkResult[parent]?.items;
            if (items) {
                page[parent] = items;
            }
        }
    }
    return page;
}

/** Мерджит страницы */
function mergePages<DATA>(page: IPage<DATA>, mergedPage: IPage<DATA>): void {
    for (const parent in mergedPage) {
        if (mergedPage.hasOwnProperty(parent)) {
            if (page.hasOwnProperty(parent)) {
                page[parent] = Array.from(new Set(page[parent].concat(mergedPage[parent])));
            } else {
                page[parent] = mergedPage[parent];
            }
        }
    }
}

/** Разложить страницу в массив */
function spreadPage<DATA>(page: IPage<DATA>): IItem<DATA>[] {
    const result: IItem<DATA>[] = [];
    for (const parent in page) {
        if (page.hasOwnProperty(parent)) {
            result.push(...page[parent]);
        }
    }
    return result;
}

/** Получить юнит с минимальным ордером */
function getUnitsWithMinOrder<DATA>(units: BulkOperationsUnit<DATA>[], parent: string): BulkOperationsUnit<DATA>[] {
    const notSurveyedUnits = units.filter((unit) => {
        const {hasMore, nextOrder} = unit.getNextMeta(parent);
        return hasMore && nextOrder === null;
    });
    if (notSurveyedUnits.length) {
        return notSurveyedUnits;
    }
    let minOrder: number | null = null;
    let foundIndex: number | null = null;
    units.forEach((unit, index) => {
        const {hasMore, nextOrder} = unit.getNextMeta(parent);
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
function calcEmptyParents<DATA>(page: IPage<DATA>, parents: string[]): string[] {
    return parents.filter((parent) => {
        return !page.hasOwnProperty(parent);
    });
}