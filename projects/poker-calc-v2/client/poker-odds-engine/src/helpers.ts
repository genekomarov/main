import {SUITS, RUNKS} from 'src/consts';
import Card from 'src/Card';

/** Создает колоду */
export function genDeck(): Card[] {
    const cards: Card[] = [];
    SUITS.forEach((suit) => {
        RUNKS.forEach((runk) => {
            cards.push(new Card(suit, runk));
        });
    });
    return cards;
}