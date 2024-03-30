import {TNashKey, TComb} from 'src/_new_odds/consts';
import {TCardName} from 'src/deal';

export interface INashChart {
    up(gameResult: Partial<IGameResult>): void;
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

export interface ICounts {
        wins: number,
        count: number
}

export type IGameResult = Record<TNashKey, ICounts>;

export interface IPlayerCards {
    playerId: string;
    cards: TCardName[];
    isWin: boolean;
}