import {TRunk} from 'src/deal';

export const COMB = {
    'high card': 0,
    'one pair': 1,
    'two pair': 2,
    'three of a kind': 3,
    'straight': 4,
    'flush': 5,
    'full house': 6,
    'four of a kind': 7,
    'straight flush': 8,
    'royal flush': 9,
};

export type TComb = keyof typeof COMB;
export const COMBS = Object.keys(COMB) as TComb[];

export const SYMILAR = ['o', 'p'] as const;
export type TSymilar = typeof SYMILAR[number];

export type TNashKey = `${TRunk}${TRunk}${TSymilar}`;

export const TABLE_COUNT = 5;