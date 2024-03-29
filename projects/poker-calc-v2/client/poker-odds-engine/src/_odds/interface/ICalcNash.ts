import {TCardName, ICard} from 'src/meal';
import {TComb} from 'src/_odds/consts';
import {IDeal} from 'src/meal';

export type TGetWinComb = (deal: IDeal, desk: IDeal, playersCount: number) => IWinCombResult;

export interface IBaseCalcNashOpts {
    tableCards: TCardName[];
    iterCount: number;
    playersCount: number;
}

export interface ICalcNashOpts extends IBaseCalcNashOpts {
    getWinCombCallback: TGetWinComb;
}

export type THand = ICard[];

export interface IWinCombResult {
    hand: THand;
    comb: TComb | null;
}