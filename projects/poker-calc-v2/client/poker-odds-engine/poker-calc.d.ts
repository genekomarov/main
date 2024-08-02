import {TCardName} from 'src/deal';
import {TCombKey} from 'src/nash';

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
    type: TCombKey;
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