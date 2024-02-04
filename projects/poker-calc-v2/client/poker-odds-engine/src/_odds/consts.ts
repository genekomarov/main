import {TRunk} from 'src/deal';

export const COMB = {
    HighCard: 0,
    OnePair: 1,
    TwoPair: 2,
    ThreeOfaKind: 3,
    Straight: 4,
    Flush: 5,
    FullHouse: 6,
    FourOfaKind: 7,
    StraightFlush: 8,
    RoyalFlush: 9,
};

export type TComb = keyof typeof COMB;
export const COMBS = Object.keys(COMB) as TComb[];

export const SYMILAR = ['o', 'p'] as const;
export type TSymilar = typeof SYMILAR[number];

export type TNashKey = `${TRunk}${TRunk}${TSymilar}`;