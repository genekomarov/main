import {TSuit, TRunk, TCardName} from 'src/_deal/consts';

export interface ICard {
    readonly runk: TRunk;
    readonly suit: TSuit;
    toString(): TCardName;
}

export interface ICardSet {
    readonly cardNames: TCardName[];
    readonly cards: ICard[];
    readonly length: number;
    push(card: ICard): void;
    pull(cardName: TCardName): ICard | null;
    includes(cardName: TCardName): boolean;
    shuffle(): void;
}

export interface IDeal {
    readonly cardNames: TCardName[];
    readonly cards: ICard[];
    readonly length: number;
    pullCount(count: number): IDeal;
    pullCards(cardNames: TCardName[]): IDeal;
    push(deal: IDeal): void;
    includes(cardName: TCardName): boolean;
    shuffle(): void;
    clone(): IDeal;
}