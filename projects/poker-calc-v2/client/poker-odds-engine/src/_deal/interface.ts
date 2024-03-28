import {TSuit, TRunk, TCardName} from 'src/_deal/consts';

/** Интерфейс Одна карта */
export interface ICard {
    readonly runk: TRunk;
    readonly suit: TSuit;
    toString(): TCardName;
}

/**  Интерфейс Набор карт, в который можно добавлять и доставать карты по одной */
export interface ICardSet {
    readonly cardNames: TCardName[];
    readonly cards: ICard[];
    readonly length: number;
    /** Положить карту в набор */
    push(card: ICard): void;
    /** Достать карту из набора */
    pull(cardName: TCardName): ICard | null;
    /** Проверка карты на вхождение в набор */
    includes(cardName: TCardName): boolean;
    /** Перемешать */
    shuffle(): void;
}

/** Интерфейс Раздача. Прокси объект, в которм реализованы режимы массового удаления карт, а также механизм клонирования */
export interface IDeal {
    readonly cardNames: TCardName[];
    readonly cards: ICard[];
    readonly length: number;
    /** Достать определенное число карт */
    pullCount(count: number): IDeal;
    /** Достать конкретные карты */
    pullCards(cardNames: TCardName[]): IDeal;
    /** Положить один набор карт в другой */
    push(deal: IDeal): void;
    /** Проверка карты на вхождение в набор */
    includes(cardName: TCardName): boolean;
    /** Перемешать */
    shuffle(): void;
    /** Клонировать */
    clone(): IDeal;
}