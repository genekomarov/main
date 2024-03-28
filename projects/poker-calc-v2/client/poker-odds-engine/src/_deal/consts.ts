/** Номиналы */
export const RUNK = {
    '2': 0,
    '3': 1,
    '4': 2,
    '5': 3,
    '6': 4,
    '7': 5,
    '8': 6,
    '9': 7,
    '10': 8,
    'J': 9,
    'Q': 10,
    'K': 11,
    'A': 12,
};

/** Масти */
export const SUIT = {
    'D': 0,
    'H': 1,
    'C': 2,
    'S': 3
};

/** Тип номинала */
export type TRunk = keyof typeof RUNK;
/** Все номиналы в виде массива */
export const RUNKS = Object.keys(RUNK) as TRunk[];

/** Тип масти */
export type TSuit = keyof typeof SUIT;
/** Все масти в виде массива */
export const SUITS = Object.keys(SUIT) as TSuit[];

/** Тип все карты (все комбинации номинала и масти) */
export type TCardName = `${TRunk}${TSuit}`;