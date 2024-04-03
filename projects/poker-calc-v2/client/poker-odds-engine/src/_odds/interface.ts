import {TNashKey, TComb} from 'src/_odds/consts';
import {TCardName} from 'src/deal';

/** Интерфейс Таблица веротяностей */
export interface INashChart {
    /** Применить результат игры */
    up(gameResult: Partial<IGameResult>): void;
    /** Получить в виде массива */
    toArray(printKey: boolean): (string | number) [][];
    /** Вывести в форме строки */
    toString(printKey?: boolean): string;
}

/** Интерфейс Счетчики вероятностей для комбинаций */
export interface IComb {
    count: number;
    wins: number;
}

/** Интерфейс Элемент таблицы вероятностей */
export interface INashElement extends Record<TComb, IComb> {
    count: number;
    wins: number;
}

/** Интерфейс Корень объекта карты таблицы вероятностей */
export interface INashChartMap extends Record<TNashKey, INashElement> {
    count: number;
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