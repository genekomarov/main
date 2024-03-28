import {ICardSet, ICard} from 'src/_deal/interface';
import {TCardName} from 'src/_deal/consts';
import _ from 'lodash';

interface ICardsMap {
    [cardName: string]: ICard;
}

/** Набор карт, в который можно добавлять и доставать карты по одной */
export default class CardSet implements ICardSet {
    
    private _cards: ICardsMap = {};

    constructor(cards?: ICard[]) {
        if (!cards) {
            return;
        }
        cards.forEach((card) => {
            this.push(card);
        });
    }
    
    push(card: ICard): void {
        const cardName: TCardName = card.toString();
        if (this.includes(cardName)) {
            throw(new Error(`Карта уже есть в наборе: ${cardName}`));
        } else {
            this._cards[cardName] = card;
        }
    }

    pull(cardName: TCardName): ICard | null {
        if (this.includes(cardName)) {
            const card: ICard = this._cards[cardName];
            delete this._cards[cardName];
            return card;
        } else {
            return null;
        }
    }

    includes(cardName: TCardName): boolean {
        return this._cards.hasOwnProperty(cardName);
    }

    shuffle(): void {
        const entires = Object.entries(this._cards);
        this._cards = Object.fromEntries(_.shuffle(entires));
    }

    get cardNames(): TCardName[] {
        return Object.keys(this._cards) as unknown as TCardName[];
    }

    get cards(): ICard[] {
        return Object.values(this._cards);
    }

    get length(): number {
        return this.cardNames.length;
    }
}