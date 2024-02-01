import Deal from 'src/Deal';
import {genDeck} from 'src/helpers';

describe('test', () => {
    it('test', () => {
        const deck = genDeck();
       
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const deal = new Deal(deck);
    });
});