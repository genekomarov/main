import {TSuit, TRunk} from 'src/consts';
import {ICard} from 'src/interface';

/** Карта */
export class Card implements ICard {
    private _suit: TSuit;
    private _runk: TRunk;

    constructor(suit: TSuit, runk: TRunk) {
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
        return `${this._suit} ${this._runk}`;
    }
}