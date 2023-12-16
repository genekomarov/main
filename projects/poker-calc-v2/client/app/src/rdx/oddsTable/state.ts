import {IOddItem} from 'interface/IOddItem';

const CARD_NAMES = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
enum SUITED {
    SUIT = 's',
    OFFSUIT = 'o'
}

class Item implements IOddItem {
    readonly name: string;
    probability = 0;

    constructor(name: string) {
        this.name = name;
    }
}

type TItems = Item[][];

export interface IState {
    items: TItems;
    rowNames: string[];
}

const state: IState = {
    items: generateItems(),
    rowNames: CARD_NAMES
};

export default state;

function generateItems(): TItems {
    return CARD_NAMES.map((rowName) => {
        let suited = SUITED.OFFSUIT;
        return CARD_NAMES.map((columnName) => {
            let name = columnName + rowName;
            if (rowName !== columnName) {
                name += suited;
            } else {
                suited = SUITED.SUIT;
            }
            return new Item(name);
        });
    });
}
