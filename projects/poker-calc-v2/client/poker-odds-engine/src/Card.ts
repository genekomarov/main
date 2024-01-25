enum SUIT {
    // Буби (Diamonds)
    D = 'D',
    // Черви (Hearts)
    H = 'H',
    // Крести (Clubs)
    C = 'C',
    // Пики (Spades)
    S = 'S'
}

enum RUNK {
    A = 'A',
    K = 'K',
    Q = 'Q',
    J = 'J',
    _10 = '10',
    _9 = '9',
    _8 = '8',
    _7 = '7',
    _6 = '6',
    _5 = '5',
    _4 = '4',
    _3 = '3',
    _2 = '2'
}

export default class Card {
    suit: SUIT;
    runk: RUNK;

    constructor(suit: SUIT, runk: RUNK) {
        this.suit = suit;
        this.runk = runk;
    }

    toString(): string {
        return `${SUIT[this.suit]} ${RUNK[this.runk]}`;
    }
}