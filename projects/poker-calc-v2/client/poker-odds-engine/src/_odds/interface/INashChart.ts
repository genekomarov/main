import {TComb, TNashKey} from 'src/_odds/consts';
import {IWinCombResult} from 'src/_odds/interface/ICalcNash';

export interface ICombElement {
    count: number;
    percent: number;
}

export type TCombsMap = {
    [key in TComb]: ICombElement;
};

export interface INashElement {
    count: number;
    percent: number;
    combs: TCombsMap;
}

export type TNashChartMap = {
    [key in TNashKey]: INashElement;
};

export interface INashChart {
    count: number;
    chart: TNashChartMap;
    up(winComb: IWinCombResult): void;
    updatePercents(): void;
    toString(printKey?: boolean): string;
}