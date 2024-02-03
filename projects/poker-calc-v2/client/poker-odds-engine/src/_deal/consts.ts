// export enum SUIT {'D','H','C','S'}
// export enum RUNK {'_A', '_K', '_Q', '_J', '_10', '_9', '_8', '_7', '_6', '_5', '_4', '_3', '_2'}

export const SUIT = {
    'D': 0,
    'H': 1,
    'C': 2,
    'S': 3
};

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

export type TSuit = keyof typeof SUIT;
export const SUITS = Object.keys(SUIT) as TSuit[];

export type TRunk = keyof typeof RUNK;
export const RUNKS = Object.keys(RUNK) as TRunk[];