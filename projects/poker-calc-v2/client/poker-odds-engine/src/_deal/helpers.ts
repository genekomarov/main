import {SUITS, RUNKS, TRunk, RUNK} from 'src/_deal/consts';
import {ICard, IDeal} from 'src/_deal/interface';
import Card from 'src/_deal/Card';
import Deal from 'src/_deal/Deal';

/** Полная колода */
let deck: ICard[];

/** Создает колоду */
export function genDeck(): IDeal {
    // Делаем так, чтобы колода генерировалась только при первом вызове функции
    if (!deck) {
        const cards: ICard[] = [];
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
    return new Deal(deck);
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