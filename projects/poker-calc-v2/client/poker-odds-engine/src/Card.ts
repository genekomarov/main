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

interface IDealMap {
    [cardName: string]: Card;
}

/** */
export class Deal {

    private _map: IDealMap = {};
    private _orders: number[];

    constructor() {

    }

    includes(): boolean {

    }

    shuffle(): void {

    }

    getByCount(count: number): Deal {

    }

    getByCards(cards: Card[]): Deal {

    }

    getCards(): Card[] {
        return this._orders.map((order) => {
            return
        });
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
