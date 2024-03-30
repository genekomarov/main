import {TNashKey, TComb} from 'src/_new_odds/consts';

export interface INashChart {
    up(): void;
    toString(): string;
}

export interface IComb {
    count: number;
    wins: number;
}

export interface INashElement extends Record<TComb, IComb> {
    count: number;
    wins: number;
}

export interface INashChartMap extends Record<TNashKey, INashElement> {
    count: number;
}