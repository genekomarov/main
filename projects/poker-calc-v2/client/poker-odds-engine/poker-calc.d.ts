import {TCardName} from 'src/deal';
import {TComb} from 'src/odds';

interface IPlayerCards {
    playerId: string;
    cards: TCardName[];
}

interface IGetHoldemWinnerParams {
    boardCards: TCardName[];
    playerCards: IPlayerCards[];
}

interface IFlags {
    compactCards: true;
}

interface IHandInfo {
    type: TComb;
    strength: number;
}

interface IGetHoldemWinner {
    playerId: string;
    hand: IHandInfo;
    cards: [TCardName, TCardName, TCardName, TCardName, TCardName];
}

export function getHoldemWinner(params: IGetHoldemWinnerParams, flags: IFlags): IGetHoldemWinner[];

// export function getOmahaWinner(params: any): any;

// export function getType(set: any): any;