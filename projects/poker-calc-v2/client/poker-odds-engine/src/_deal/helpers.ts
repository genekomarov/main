import {SUITS, RUNKS} from 'src/_deal/consts';
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