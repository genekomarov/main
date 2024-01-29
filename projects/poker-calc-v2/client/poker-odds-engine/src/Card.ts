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

    private _cards: ICardsMap = {};

    constructor(cards: Card[]) {
        cards.forEach((card) => {
            this._add(card);
        });
    }

    /** Добавить карту */
    private _add(card: Card): void {
        const cardName = card.toString();
        if (this.includes(cardName)) {
            throw(new Error(`Карта уже содержится в наборе: ${cardName}`));
        } else {
            this._cards[cardName] = card;
        }
    }

    includes(cardName: string): boolean {
        return this._cards.hasOwnProperty(cardName);
    }

    shuffle(): void {

    }

    pullCount(count: number): Deal {

    }

    pullByCards(cardNames: string[]): Deal {

    }

    getAllCards(): Card[] {
        return Object.values(this._cards);
    }

    get length(): number {
        return Object.keys(this._cards).length;
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
