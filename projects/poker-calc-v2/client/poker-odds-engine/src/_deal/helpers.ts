import {SUITS, RUNKS, TRunk, RUNK} from 'src/_deal/consts';
import Card from 'src/_deal/Card';

/** Полная колода */
let deck: Card[];

/** Создает колоду */
export function genDeck(): Card[] {
    // Делаем так, чтобы колода генерировалась только при первом вызове функции
    if (!deck) {
        const cards: Card[] = [];
        RUNKS.forEach((runk) => {
            SUITS.forEach((suit) => {
                const card = new Card(`${runk}${suit}`);
                Object.freeze(card);
                cards.push(card);
            });
        });
        deck = cards;
        Object.freeze(deck);
    }
    return deck;
}

/** Выполнить сортировку номиналов по возрастанию */
export function sortRunksUp(runks: TRunk[]): TRunk[] {
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