import {TCardName} from 'src/deal';
import {TComb, IPlayerCards} from 'src/odds';

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