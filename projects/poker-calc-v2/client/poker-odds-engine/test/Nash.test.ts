import {calcNash_1} from 'src/_odds/utils/nash';
import {Deal, genDeck} from 'src/deal';

describe('Nash', () => {
    it('toString', () => {
        const deal = new Deal(genDeck());
        deal.shuffle();
        const tableCards = deal.pullCount(0).cardNames;
        const chart = calcNash_1({
            tableCards,
            playersCount: 5,
            iterCount: 100_000
        });
        chart.updatePercents();
        console.log(tableCards);
        console.log(chart.toString());
    });
});