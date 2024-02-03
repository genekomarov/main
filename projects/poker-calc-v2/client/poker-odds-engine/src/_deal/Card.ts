import {TSuit, TRunk, SUIT, RUNK} from 'src/_deal/consts';
import {ICard} from 'src/_deal/interface';

/** Карта */
export default class Card implements ICard {
    private _suit: TSuit;
    private _runk: TRunk;

    constructor(cardName: string) {
        const {suit, runk} = this._split(cardName);
        this._suit = suit;
        this._runk = runk;
    }

    get suit(): TSuit {
        return this._suit;
    }

    get runk(): TRunk {
        return this._runk;
    }

    toString(): string {
        return `${this._suit}${this._runk}`;
    }

    private _split(cardName: string): {
        suit: TSuit,
        runk: TRunk
    } {
        const suit: TSuit = cardName.slice(0, 1) as TSuit;
        const runk: TRunk = cardName.slice(1, cardName.length) as TRunk;
        if (!SUIT.hasOwnProperty(suit) || !RUNK.hasOwnProperty(runk)) {
            throw(new Error(`Неправильное имя карты: ${cardName}`));
        }
        return {suit, runk};
    }
}