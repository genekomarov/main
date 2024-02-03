import Deal from 'src/Deal';
import Card from 'src/Card';
import {genDeck} from 'src/helpers';

const deck: Card[] = genDeck();

describe('Deal', () => {
    it('create', () => {
        const wrognCards: Card[] = [
            new Card('H2'),
            new Card('D10'),
            new Card('D10')
        ];
        expect(() => {
            new Deal(wrognCards);
        }).toThrow();
        const rightCards: Card[] = [
            new Card('H2'),
            new Card('D10'),
            new Card('SJ')
        ];
        expect(() => {
            new Deal(rightCards);
        }).not.toThrow();
    });
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
    it('pullCount empty', () => {
        const deal = new Deal([]);
        const deal_2 = deal.pullCount(2);
        expect(deal_2.length).toBe(0);
    });
    it('pullCards', () => {
        const deal = new Deal(deck);
        const deal_0 = deal.pullCards([]);
        expect(deal_0.length).toBe(0);
        expect(deal.length).toBe(52);
        const deal_2 = deal.pullCards(['H2', 'D10']);
        expect(deal_2.length).toBe(2);
        expect(deal_2.cardNames).toEqual(['H2', 'D10']);
        expect(deal.length).toBe(50);
    });
    it('pullCards empty', () => {
        const deal = new Deal([]);
        const deal_2 = deal.pullCards(['H2', 'D10']);
        expect(deal_2.length).toBe(0);
    });
    it('push', () => {
        const deal = new Deal([]);
        const cards: Card[] = [
            new Card('H2'),
            new Card('D10'),
            new Card('SJ')
        ];
        deal.push(new Deal(cards));
        expect(deal.length).toBe(3);
        expect(() => {
            deal.push(new Deal([cards[2]]));
        }).toThrow();
    });
    it('shuffle', () => {
        const deal = new Deal(deck);
        const cardNames = deal.cardNames;
        deal.shuffle();
        const cardNames_shuffle_1 = deal.cardNames;
        deal.shuffle();
        const cardNames_shuffle_2 = deal.cardNames;
        expect(cardNames).not.toEqual(cardNames_shuffle_1);
        expect(cardNames).not.toEqual(cardNames_shuffle_2);
        expect(cardNames_shuffle_1).not.toEqual(cardNames_shuffle_2);
    });
});