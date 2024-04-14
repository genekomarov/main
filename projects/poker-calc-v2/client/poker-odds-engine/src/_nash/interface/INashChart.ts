import {INashElementData, TNashChartMapNode} from 'src/_nash/interface/INashChartMap';

/** Обработчик преобразования элемента таблицы вероятностей к строке */
export type TArrayHandler = (data: INashElementData, rootNode: TNashChartMapNode) => string;

export interface INashChartParams {
    /** Ограничение вероятности */
    threshold?: number;
    /** Количество игроков */
    playerCount?: number;
}

import {TNashKey, STRING_TYPE_MODE} from 'src/_nash/consts';
import {TCardName} from 'src/deal';

/** Интерфейс параметров метода toString */
export interface IToStringParams {
    mode?: STRING_TYPE_MODE;
    useThreshold?: boolean; 
}

/** Метаинформация */
export interface IMeta {
    totalCount: number;
    treshHold: number;
    playTime: number | null;
    calcTime: number | null;
    tresholdWaiting: number;
}

/** Интерфейс Таблица веротяностей */
export interface INashChart {
    /** Применить результат игры */
    up(gameResult: Partial<IGameResult>): void;
    /** Расчет полного состояния */
    calc(): void;
    /** Получить мета информацию */
    getMeta(): IMeta;
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