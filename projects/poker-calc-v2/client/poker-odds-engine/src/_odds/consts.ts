import {TRunk} from 'src/deal';

export const COMB = {
    'High Card': 0,
    'One Pair': 1,
    'Two Pair': 2,
    'Three of a Kind': 3,
    'Straight': 4,
    'Flush': 5,
    'Full House': 6,
    'Four of a Kind': 7,
    'Straight Flush': 8,
    'Royal Flush': 9,
};

export type TComb = keyof typeof COMB;
export const COMBS = Object.keys(COMB) as TComb[];

export const SYMILAR = ['o', 'p'] as const;
export type TSymilar = typeof SYMILAR[number];

export type TNashKey = `${TRunk}${TRunk}${TSymilar}`;

export const TABLE_COUNT = 5;