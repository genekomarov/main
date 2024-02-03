import {SUITS, RUNKS} from 'src/_deal/consts';
import Card from 'src/_deal/Card';

/** Создает колоду */
export function genDeck(): Card[] {
    const cards: Card[] = [];
    SUITS.forEach((suit) => {
        RUNKS.forEach((runk) => {
            cards.push(new Card(`${suit}${runk}`));
        });
    });
    return cards;
}