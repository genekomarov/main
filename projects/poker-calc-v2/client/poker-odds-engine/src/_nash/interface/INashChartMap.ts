import {TNashKey, TCombKey} from 'src/_nash/consts';

/** Интерфейс базовых данных узла */
export interface IBaseNashNodeData {
    count: number;
    wins: number;
}

/** Интерфейс данных корневого узла чарта */
export interface INashChartMapData {
    count: number;
}

/** Интерфейс данных элемента чарта */
export interface INashElementData extends IBaseNashNodeData {
    key: TNashKey;
}

/** Интерфейс данных узла комбинации */
export interface ICombData extends IBaseNashNodeData {
    key: TCombKey;
}

/** Интерфейс узла комбинации */
export interface ICombNode {
    data: ICombData;
}

/** Тип подузлов элемента чарта (комбинации) */
export type TNashElementSubnodes = Record<TCombKey, ICombNode>;

/** Интерфейс отдельного подузла чарта (пара) */
export interface INashElementNode {
    data: INashElementData;
    subnodes: TNashElementSubnodes;
}

/** Тип подузлов чарта (пары) */
export type TNashSubNodes = Record<TNashKey, INashElementNode>

/** Интерфейс корневого узла чарта */
export interface INashChartMapNode {
    data: INashChartMapData;
    subnodes: TNashSubNodes;
}