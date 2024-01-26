enum SUIT {'D','H','C','S'}
enum RUNK {'_A', '_K', '_Q', '_J', '_10', '_9', '_8', '_7', '_6', '_5', '_4', '_3', '_2'}

type TSuit = keyof typeof SUIT;
const SUITS = Object.keys(SUIT) as TSuit[];

type TRunk = keyof typeof RUNK;
const RUNKS = Object.keys(RUNK) as TRunk[];



/** Карта */
export class Card {
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

interface ICardsMap {
    [cardName: string]: Card;
}

/** Раздача */
export class Deal {

    private _cardsMap: ICardsMap = {};
    private _cardNames: string[] = [];
    private _droppedNames: string[] = [];

    constructor(cards: Card[]) {
        cards.forEach((card) => {
            const cardName = card.toString();
            if (this._cardsMap.hasOwnProperty(cardName)) {
                throw(new Error(`Карта ${cardName} уже есть в выборке`));
            } else {
                this._cardsMap[cardName] = card;
                this._cardNames.push(cardName);
            }
        });
    }

    includes(cardName: string): boolean {
        return !!(this._cardNames.includes(cardName) && this._cardsMap[cardName]);
    }

    shuffle(): void {

    }

    pullByCount(count: number): Deal {
        const cardNames = this._cardNames.splice(0, count);
        this._droppedNames.push(...cardNames);
        const cards = this._getCardsByNames(cardNames);
        return new Deal(cards);
    }

    pullByCards(cardNames: string[]): Deal {
        const cards = cardNames.map((cardName) => {
            if (this.includes(cardName)) {
                const card = this._cardsMap[cardName];
                this._droppedNames.push(this._cardNames.splice());
            } else {
                throw(new Error(`Карты нет в выборке: ${cardName}`));
            }
        });
    }

    getAllCards(): Card[] {
        return this._getCardsByNames(this._cardNames);
    }

    private _getCardsByNames(cardNames: string[]): Card[] {
        return cardNames.map((cardName) => {
            const card = this._cardsMap[cardName];
            if (!card) {
                throw(new Error(`Нет информации о карте ${cardName}`));
            }
            return this._cardsMap[cardName];
        });
    }

    get length(): number {
        return this._cardNames.length;
    }
}

/** Создает колоду */
function genDeck(): Card[] {
    const cards: Card[] = [];
    SUITS.forEach((suit) => {
        RUNKS.forEach((runk) => {
            cards.push(new Card(suit, runk));
        });
    });
    return cards;
}


export const deal = new Deal(genDeck());

// /** Масти */
// const SUITS = ['D', 'H', 'C', 'S'] as const;
// /** Номиналы */
// const RUNKS = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];


// enum Some {
//     'A',
//     'B'
// }

// type TSome = keyof typeof Some;

// let a: TSome

// const arr = Object.keys(Some);


// /** Тип масти */
// type TSuit = typeof SUITS[number];
// /** Тип номинала */
// type TRunk = typeof RUNKS[number];

// /** Карта */
// export class Card {
//     private _suit: TSuit
//     private _runk: TRunk

//     constructor(suit: TSuit, runk: TRunk) {
//         this._suit = suit;
//         this._runk = runk;
//     }

//     get suit(): TSuit {
//         return this._suit;
//     }

//     get runk(): TRunk {
//         return this._runk;
//     }

//     toString(): string {
//         return `${this._suit} ${this._runk}`;
//     }
// }

// interface IDealMap {
//     [card: string]: Card;
// }

// export class Deal {
//     private _map: IDealMap = {};
// }

// export class Deck {
//     private _deck: Card[] = []

//     constructor() {
//         SUITS.forEach((suit) => {
//             RUNKS.forEach((runk) => {
//                 this._deck.push(new Card(suit, runk))
//             });
//         });
//     }

//     getByCount(count: number): Card[] {
//         return this._deck.splice(0, count)
//     }

//     getByCards(cards: Card[]): void {
//         let deck: Card[] = [...this._deck];
//         deck = deck.filter((card) => {

//         });
//     }
// }
