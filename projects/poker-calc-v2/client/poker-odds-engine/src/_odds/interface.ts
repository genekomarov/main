import {TCombs} from 'src/_odds/consts';
import {TCardName} from 'src/deal';

type TCombsMap<T> = {
    [key in TCombs]: T;
};

interface INashElement {
    count: number;
    combs: TCombsMap<number>;
}

type TNashChartMap<T> = {
    [key in TCardName]: T;
};

export interface INash {
    count: number;
    chart: TNashChartMap<INashElement>;
}

export interface ICalcNashOpts {
    tableCards: string[];
    iterCount: number;
    playersCount: number;
}