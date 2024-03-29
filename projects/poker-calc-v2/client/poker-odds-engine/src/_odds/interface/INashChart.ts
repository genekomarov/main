import {TComb, TNashKey} from 'src/_odds/consts';
import {IWinCombResult} from 'src/_odds/interface/ICalcNash';

/** Элемент вероятностей для конкретной комбинации */
export interface ICombElement {
    count: number;
    percent: number;
}

/** Интерфейс карты для разбивки по комбинациям для элемента таблицы вероятностей */
export type TCombsMap = {
    [key in TComb]: ICombElement;
};

/** Интерфейс элемента таблицы вероятностей */
export interface INashElement {
    count: number;
    percent: number;
    combs: TCombsMap;
}

/** Интерфейс карты для таблицы вероятностей */
export type TNashChartMap = {
    [key in TNashKey]: INashElement;
};

/** Интерфейс таблицы вероятностей */
export interface INashChart {
    count: number;
    chart: TNashChartMap;
    up(winComb: IWinCombResult): void;
    updatePercents(): void;
    toString(printKey?: boolean): string;
}