import {ICardSet, ICard} from 'src/interface';
import _ from 'lodash';

interface ICardsMap {
    [cardName: string]: ICard;
}

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
        const cardName: string = card.toString();
        if (this.includes(cardName)) {
            throw(new Error(`Карта уже есть в наборе: ${cardName}`));
        } else {
            this._cards[cardName] = card;
        }
    }

    pull(cardName: string): ICard | null {
        if (this.includes(cardName)) {
            const card: ICard = this._cards[cardName];
            delete this._cards[cardName];
            return card;
        } else {
            return null;
        }
    }

    includes(cardName: string): boolean {
        return this._cards.hasOwnProperty(cardName);
    }

    shuffle(): void {
        const entires = Object.entries(this._cards);
        this._cards = Object.fromEntries(_.shuffle(entires));
    }

    get cardNames(): string[] {
        return Object.keys(this._cards);
    }

    get cards(): ICard[] {
        return Object.values(this._cards);
    }

    get length(): number {
        return this.cardNames.length;
    }
}