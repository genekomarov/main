import Deal from 'src/Deal';
import Card from 'src/Card';
import {genDeck} from 'src/helpers';

const deck: Card[] = genDeck();

describe('Deal', () => {
    it('length', () => {
        const deal_52 = new Deal(deck);
        expect(deal_52.length).toBe(52);
        const deal_10 = new Deal(deck.slice(0, 10));
        expect(deal_10.length).toBe(10);
        const deal_30 = new Deal(deck.slice(0, 30));
        expect(deal_30.length).toBe(30);
    });
    it('includes', () => {
        const cards: Card[] = [
            new Card('H2'),
            new Card('D10'),
            new Card('SJ')
        ];
        const deal = new Deal(cards);
        expect(deal.includes('H2')).toBe(true);
        expect(deal.includes('C7')).toBe(false);
    });
    it('pullCount', () => {
        const deal = new Deal(deck);
        const deal_10_1 = deal.pullCount(10);
        expect(deal.length).toBe(42);
        expect(deal_10_1.length).toBe(10);
        const deal_10_2 = deal.pullCount(10);
        expect(deal.length).toBe(32);
        expect(deal_10_2.length).toBe(10);
    });
});