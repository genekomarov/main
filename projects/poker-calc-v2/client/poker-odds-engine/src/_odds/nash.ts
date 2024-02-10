import {
    INashChart,
    ICalcNashOpts,
    IWinCombResult
} from 'src/_odds/interface';
import {IDeal, Deal, genDeck} from 'src/deal';
import NashChart from 'src/_odds/NashChart';
import {TABLE_COUNT} from 'src/_odds/consts';
import pokerCalc from 'poker-calc';

export function calcNash(opts: ICalcNashOpts, prevNash?: INashChart): INashChart {
    const {tableCards, playersCount, iterCount} = opts;
    const nashChart: INashChart = prevNash ?? new NashChart();
    const deal: IDeal = new Deal(genDeck());
    const desk = deal.pullCards(tableCards);
    for (let i = 0; i < iterCount; i++) {
        const witComb = getWinComb(deal.clone(), desk.clone(), playersCount);
        nashChart.up(witComb);
    }
    return nashChart;
}

function getWinComb(deal: IDeal, desk: IDeal, playersCount: number): IWinCombResult {
    deal.shuffle();
    const deskCount = desk.length;
    desk.push(deal.pullCount(TABLE_COUNT - deskCount));
    const players: IDeal[] = [];
    for (let i = 0; i < playersCount; i++) {
        players.push(deal.pullCount(2));
    }
    
}
