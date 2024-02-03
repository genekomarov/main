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

export type TCombs = keyof typeof COMB;
export const SUITS = Object.keys(COMB) as TCombs[];