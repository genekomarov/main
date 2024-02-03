import {SUITS, RUNKS, TRunk, RUNK} from 'src/_deal/consts';
import Card from 'src/_deal/Card';

let deck: Card[];

/** Создает колоду */
export function genDeck(): Card[] {
    if (!deck) {
        const cards: Card[] = [];
        SUITS.forEach((suit) => {
            RUNKS.forEach((runk) => {
                const card = new Card(`${suit}${runk}`);
                Object.freeze(card);
                cards.push(card);
            });
        });
        deck = cards;
        Object.freeze(deck);
    }
    return deck;
}

export function sortRunks(runks: TRunk[]): TRunk[] {
    return runks.sort((runkA, runkB) => {
        const aPow = RUNK[runkA];
        const bPow = RUNK[runkB];
        if (aPow > bPow) {
            return 1;
        }
        if (aPow < bPow) {
            return -1;
        }
        return 0;
    });
}