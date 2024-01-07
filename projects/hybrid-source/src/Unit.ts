import StructureElement, {GetResult, Meta} from './StructureElement';
import {IItem} from './interface';

/** Структура с разбивкой по родителям */
interface IStructure<DATA> {
    [parent: string]: StructureElement<DATA> | null;
}

export interface IAddParams<DATA> {
    parent: string;
    items: IItem<DATA>[];
    reSort: boolean;
}

export interface IGetParams {
    parent: string;
    limit: number;
    offset: number;
}

export interface IGetNextParams {
    parent: string;
    limit: number;
    remove?: boolean;
}

export type TGetMethod<DATA> = (params: IGetParams) => Promise<GetResult<DATA> | null>;
export type TGetNextMethod<DATA> = (params: IGetNextParams) => Promise<GetResult<DATA> | null>;

/** Класс для работы с разбитой по родителям структурой */
export default class Unit<DATA> {
    private _structure: IStructure<DATA> = {};

    /** Добавление элементов */
    add(params: IAddParams<DATA>): void {
        const {parent, items, reSort} = params;
        this._initNode(parent);
        this._getNode(parent)?.add(items, reSort);
    }

    /** Произвольное чтение */
    async get(params: IGetParams): Promise<GetResult<DATA> | null> {
        const {parent, limit, offset} = params;
        return this._getNode(parent)?.get(limit, offset) ?? null;
    }

    /** Последовательное чтение */
    async getNext(params: IGetNextParams): Promise<GetResult<DATA> | null> {
        const {parent, limit, remove} = params;
        return this._getNode(parent)?.getNext(limit, remove) ?? null;
    }

    /** Получить метаинформацию по следующему элементу */
    getNextMeta(parent: string): Meta {
        if (this._hasNode(parent)) {
            const node = this._getNode(parent);
            if (node) {
                return node.getNextMeta();
            } else {
                return new Meta(false, null);
            }
        } else {
            return new Meta(true, null);
        }
    }


    private _initNode(parent: string): void {
        if (!this._hasNode(parent)) {
            this._structure[parent] = new StructureElement(parent);
        }
    }

    private _hasNode(parent: string): boolean {
        return this._structure.hasOwnProperty(parent);
    }

    private _getNode(parent: string): StructureElement<DATA> | null {
        if (!this._hasNode(parent)) {
            return null;
        }
        return this._structure[parent];
    }
}
