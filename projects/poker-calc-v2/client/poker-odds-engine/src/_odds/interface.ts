import {TComb, TNashKey} from 'src/_odds/consts';
import {TCardName, ICard} from 'src/deal';

export type TCombsMap = {
    [key in TComb]: number;
};

export interface INashElement {
    count: number;
    combs: TCombsMap;
}

export type TNashChartMap = {
    [key in TNashKey]: INashElement;
};

export interface INashChart {
    count: number;
    chart: TNashChartMap;
}

export interface ICalcNashOpts {
    tableCards: TCardName[];
    iterCount: number;
    playersCount: number;
}

export type THand = [ICard, ICard];

export interface IWinCombResult {
    hand: THand;
    comb: TComb;
}