import {TNashKey, TCombKey, LEVELS, PHASES} from 'src/_nash/consts';

export interface INashChartMapData {
    count: number;
}

export interface IBaseNashElementData {
    count: number;
    wins: number;
    winProbability: number;
}

export interface INashElementData extends IBaseNashElementData {
    key: TNashKey;
}

export interface IBaseCombData {
    count: number;
    wins: number;
}

export interface ICombData extends IBaseCombData {
    key: TCombKey;
}

export type TCombNode = INode<ICombData>;

export type TNashElementSubNodes = Record<TCombKey, TCombNode>;
export type TNashElementNode = INodeWithSubNodes<TCombKey, TCombNode, INashElementData>;

export type TNashChartMapSubNodes = Record<TNashKey, TNashElementNode>;
export type TNashChartMapNode = INodeWithSubNodes<TNashKey, TNashElementNode, INashChartMapData>;

export type TLevels = keyof typeof LEVELS;
export type TPhases = keyof typeof PHASES;

/** Интерфейс узла */
interface INode<D = object> {
    data: D;
}

/** Интерфейс узла с подузлами */
interface INodeWithSubNodes<K extends string | number | symbol = '', N extends INode | INodeWithSubNodes = INode, D = object> extends INode<D> {
    subNodes: Record<K, N>;
}