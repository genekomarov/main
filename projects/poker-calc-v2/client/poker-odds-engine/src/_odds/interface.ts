import {TNashKey, TCombKey, STRING_TYPE_MODE} from 'src/_odds/consts';
import {INodeWithSubNodes, INode} from 'src/common';
import {TCardName} from 'src/deal';

/** Интерфейс параметров метода toString */
export interface IToStringParams {
    mode?: STRING_TYPE_MODE;
    useThreshold?: boolean; 
}

/** Интерфейс Таблица веротяностей */
export interface INashChart {
    /** Применить результат игры */
    up(gameResult: Partial<IGameResult>): void;
    /** Вывести в форме строки */
    toString(params?: IToStringParams): string;
}

/** Интерфейс Счетчики в результате игры */
export interface ICounts {
        wins: number,
        count: number
}

/** Интерфейс Результат игры */
export type IGameResult = Record<TNashKey, ICounts>;

/** Интерфейс данных игрока */
export interface IPlayerCards {
    playerId: string;
    cards: TCardName[];
    isWin: boolean;
}



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
export type TNashElementNode = INodeWithSubNodes<INashElementData, TNashElementSubNodes>;

export type TNashChartMapSubNodes = Record<TNashKey, TNashElementNode>;
export type TNashChartMapNode = INodeWithSubNodes<INashChartMapData, TNashChartMapSubNodes>;