import {ICardSet, ICard} from 'src/interface';

interface ICardsMap {
    [cardName: string]: ICard;
}

export class CardSet implements ICardSet {
    
    private _cards: ICardsMap = {};
    
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

    get cardNames(): string[] {
        return Object.keys(this._cards);
    }

    get cards(): ICard[] {
        return Object.values(this._cards);
    }
}