import {calcNash_1, calcHandPriority} from 'src/_odds/utils/nash';
import {genDeck} from 'src/deal';
import NashChart from 'src/_odds/NashChart';

describe('Nash', () => {
    /** Генерация чарта */
    it('calcNash_1', () => {
        const deal = genDeck();
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
    
    /** Вероятность выпадения пар */
    it('calcHandPriority', () => {
        const chart = calcHandPriority({
            tableCards: [],
            playersCount: 0,
            iterCount: 100_000
        });
        chart.updatePercents();
        console.log(chart.toString());
    });
    
    /** Имена элементов чарта */
    it('nashKey', () => {
        const chart = new NashChart();
        console.log(chart.toString(true));
    });
});