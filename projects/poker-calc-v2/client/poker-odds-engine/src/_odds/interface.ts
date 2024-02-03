import {TCombs} from 'src/_odds/consts';

type TCombsMap<T> = {
    [key in TCombs]: T;
};

interface INashElement {
    count: number;
    combs: TCombsMap<number>;
}

interface INashChart {
    [key: string]: INashElement;
}

export interface INash {
    count: number;
    chart: INashChart;
}

export interface ICalcNashOpts {
    tableCards: string[];
    iterCount: number;
    playersCount: number;
}