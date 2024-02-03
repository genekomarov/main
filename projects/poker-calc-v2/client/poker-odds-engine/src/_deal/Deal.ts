import {ICard, ICardSet, IDeal} from 'src/_deal/interface';
import CardSet from 'src/_deal/CardSet';
import {TCardName} from 'src/_deal/consts';

export default class Deal implements IDeal {

    private readonly _cardSet: ICardSet;

    constructor(cards?: ICard[]) {
        this._cardSet = new CardSet(cards);
    }

    pullCount(count: number): IDeal {
        const cards: ICard[] = [];
        for (let i = 0; i < count; i++) {
            if (this.length) {
                const cardName: TCardName = this.cardNames[0];
                const card: ICard | null = this._cardSet.pull(cardName);
                if (!card) {
                    break;
                }
                cards.push(card);
            } else {
                break;
            }
        }
        return new Deal(cards);
    }

    pullCards(cardNames: TCardName[]): IDeal {
        const cards: ICard[] = [];
        for (let i = 0; i < cardNames.length; i++) {
            const cardName: TCardName = cardNames[i];
            const card: ICard | null = this._cardSet.pull(cardName);
            if (card) {
                cards.push(card);
            }
        }
        return new Deal(cards);
    }

    push(deal: IDeal): void {
        const cards: ICard[] = deal.cards;
        cards.forEach((card) => {
            this._cardSet.push(card);
        });
    }

    includes(cardName: TCardName): boolean {
        return this._cardSet.includes(cardName);
    }

    shuffle(): void {
        this._cardSet.shuffle();
    }

    get cardNames(): TCardName[] {
        return this._cardSet.cardNames;
    }

    get cards(): ICard[] {
        return this._cardSet.cards;
    }

    get length(): number {
        return this._cardSet.length;
    }
}