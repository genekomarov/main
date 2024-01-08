import Unit, {IGetNextParams, IGetParams, TGetMethod, TGetNextMethod} from './Unit';
import {IItem, IByParentStructure} from './interface';
import {GetResult} from './StructureElement';

type TUniversalGetMethod<DATA> = TGetMethod<DATA> | TGetNextMethod<DATA>;
type IUniversalGetParams = IGetParams & IGetNextParams;
type IGetParamsWitoutParent = Omit<IUniversalGetParams, 'parent'>;

/** Результат массового запроса */
export interface IGetBulkResult<DATA> {
    [parent: string]: GetResult<DATA> | null;
}

/** Класс для работы с разбитой по родителям структурой, дополненный массовыми операциями */
export default class BulkOperationsUnit<DATA> extends Unit<DATA> {

    /** Массовое добавление элементов */
    addBulk(items: IItem<DATA>[], reSort: boolean): void {
        const itemsByParents: IByParentStructure<IItem<DATA>[]> = {};
        items.forEach((item) => {
            const {parent} = item;
            if (!itemsByParents.hasOwnProperty(parent)) {
                itemsByParents[parent] = [];
            }
            itemsByParents[parent].push(item);
        });
        for (const parent in itemsByParents) {
            if (itemsByParents.hasOwnProperty(parent)) {
                this.add({parent, items: itemsByParents[parent], reSort: reSort});
            }
        }
    }

    /** Массовое произвольное чтение */
    getBulk(parents: string[], toFirstLeaf: boolean, limit: number, offset: number): Promise<IGetBulkResult<DATA>> {
        return this._getBulk(this.get, toFirstLeaf, parents, {limit, offset});
    }

    /** Массовое последовательное чтение */
    getNextBulk(parents: string[], toFirstLeaf: boolean, limit: number, remove?: boolean): Promise<IGetBulkResult<DATA>> {
        return this._getBulk(this.getNext, toFirstLeaf, parents, {limit, remove, offset: 0});
    }

    private async _getBulk(getMethod: TUniversalGetMethod<DATA>, toFirstLeaf: boolean, parents: string[], params: IGetParamsWitoutParent): Promise<IGetBulkResult<DATA>> {
        const result: IGetBulkResult<DATA> = {};
        for (let i = 0; i < parents.length; i++) {
            const parent = parents[i];
            const parentResults = await getMethod({...params, parent});
            result[parent] = parentResults;
            if (toFirstLeaf && i === 0 && parentResults) {
                const deepResults = await this._goDown(parentResults, params);
                for (const parent in deepResults) {
                    if (deepResults.hasOwnProperty(parent) && !result.hasOwnProperty(parent)) {
                        result[parent] = deepResults[parent];
                    }
                }
            }
        }
        return result;
    }

    private async _goDown(parentResults: GetResult<DATA>, params: IGetParamsWitoutParent): Promise<IGetBulkResult<DATA>> {
        const result: IGetBulkResult<DATA> = {};
        if (!hasLeafs(parentResults)) {
            const parent = parentResults.items[0].id;
            const results = await this.get({...params, parent});
            if (results === null) {
                return result;
            }
            result[parent] = results;
            const deepResults = await this._goDown(results, params);
            for (const parent in deepResults) {
                if (deepResults.hasOwnProperty(parent) && !result.hasOwnProperty(parent)) {
                    result[parent] = deepResults[parent];
                }
            }
        }
        return result;
    }
}

function hasLeafs<DATA>(getResultData: GetResult<DATA>): boolean {
    const {items} = getResultData;
    return !!items.find((item) => {
        return !item.isFolder;
    });
}