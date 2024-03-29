import {TCardName} from 'src/meal';
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

interface IHand {
    handInfo: IHandInfo;
    cards: [TCardName, TCardName, TCardName, TCardName, TCardName];
}

interface IGetHoldemWinner {
    playerId: string;
    hand: IHand;
}

export function getHoldemWinner(params: IGetHoldemWinnerParams, flags: IFlags): IGetHoldemWinner[];

// export function getOmahaWinner(params: any): any;

// export function getType(set: any): any;