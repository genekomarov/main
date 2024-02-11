import {calcNash} from 'src/_odds/utils/nash';
import {Deal, genDeck} from 'src/deal';

describe('Nash', () => {
    it('toString', () => {
        const deal = new Deal(genDeck());
        deal.shuffle();
        const tableCards = deal.pullCount(5).cardNames;
        const chart = calcNash({
            tableCards,
            playersCount: 5,
            iterCount: 500000
        });
        chart.updatePercents();
        console.log(tableCards);
        console.log(chart.toString());
    });
});