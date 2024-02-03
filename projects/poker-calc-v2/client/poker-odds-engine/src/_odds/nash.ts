import {
    INashChart,
    ICalcNashOpts,
    IWinCombResult,
    THand,
    INashElement
} from 'src/_odds/interface';
import {genDeck, TCardName, sortRunks} from 'src/deal';
import NashChart from 'src/_odds/NashChart';
import {TNashKey, TSymilar} from 'src/_odds/consts';

export function calcNash(opts: ICalcNashOpts, prevNash?: INashChart): INashChart {
    const {tableCards, playersCount, iterCount} = opts;
    const nashChart = prevNash ?? new NashChart();
    for (let i = 0; i < iterCount; i++) {
        const witComb = getWinComb(tableCards, playersCount);
        spreadToChart(nashChart, witComb);
    }
    return nashChart;
}

function getWinComb(tableCards: TCardName[], playersCount: number): IWinCombResult {

}

function spreadToChart(nashChart: INashChart, winComb: IWinCombResult): void {
    const {hand, comb} = winComb;
    const nashKey: TNashKey = handToKey(hand);
    nashChart.count ++;
    const nashElement: INashElement = nashChart.chart[nashKey];
    nashElement.count ++;
    nashElement.combs[comb] ++;
}

function handToKey(hand: THand): TNashKey {
    const sym: TSymilar = hand[0].suit === hand[1].suit ? 'o' : 'p';
    const runks = sortRunks([hand[0].runk, hand[1].runk]);
    return `${runks[1]}${runks[0]}${sym}`;
}