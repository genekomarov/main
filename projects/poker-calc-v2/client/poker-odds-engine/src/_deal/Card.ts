import {TSuit, TRunk, SUIT, RUNK, TCardName} from 'src/_deal/consts';
import {ICard} from 'src/_deal/interface';

/** Одна карта */
export default class Card implements ICard {
    private _runk: TRunk;
    private _suit: TSuit;

    constructor(cardName: TCardName) {
        const {runk, suit} = this._split(cardName);
        this._runk = runk;
        this._suit = suit;
    }

    get runk(): TRunk {
        return this._runk;
    }

    get suit(): TSuit {
        return this._suit;
    }

    toString(): TCardName {
        return `${this._runk}${this._suit}`;
    }

    private _split(cardName: TCardName): {
        runk: TRunk,
        suit: TSuit
        
    } {
        const runk: TRunk = cardName.slice(0, cardName.length - 1) as TRunk;
        const suit: TSuit = cardName.slice(cardName.length -1, cardName.length) as TSuit;
        if (!RUNK.hasOwnProperty(runk) || !SUIT.hasOwnProperty(suit)) {
            throw(new Error(`Неправильное имя карты: ${cardName}`));
        }
        return {runk, suit};
    }
}