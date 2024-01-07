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
        if (!toFirstLeaf) {
            for (const parent of parents) {
                result[parent] = await getMethod({...params, parent});
            }
        }
        return result;
    }
}