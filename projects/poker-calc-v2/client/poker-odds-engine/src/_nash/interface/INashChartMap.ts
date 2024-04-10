import {TNashKey, TCombKey, LEVELS} from 'src/_nash/consts';
import {INodeWithSubNodes, INode} from 'src/common';

export interface INashChartMapData {
    count: number;
}

export interface IBaseNashElementData {
    count: number;
    wins: number;
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