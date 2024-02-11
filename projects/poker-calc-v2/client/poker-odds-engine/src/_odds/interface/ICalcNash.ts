import {TCardName, ICard} from 'src/deal';
import {TComb} from 'src/_odds/consts';

export interface ICalcNashOpts {
    tableCards: TCardName[];
    iterCount: number;
    playersCount: number;
}

export type THand = ICard[];

export interface IWinCombResult {
    hand: THand;
    comb: TComb;
}