import {TSuit, TRunk} from 'src/consts';

export interface ICard {
    readonly suit: TSuit;
    readonly runk: TRunk;
    toString(): string;
}

export interface ICardSet {
    readonly cardNames: string[];
    readonly cards: ICard[];
    readonly length: number;
    push(card: ICard): void;
    pull(cardName: string): ICard | null;
    includes(cardName: string): boolean;
}

export interface IDeal {
    readonly cardNames: string[];
    readonly cards: ICard[];
    readonly length: number;
    pullCount(count: number): IDeal;
    pullCards(cardNames: string[]): IDeal;
    includes(cardName: string): boolean;
    shuffle(): void;
}