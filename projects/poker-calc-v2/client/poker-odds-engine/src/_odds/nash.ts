import {
    INashChart,
    ICalcNashOpts,
    IWinCombResult
} from 'src/_odds/interface';
import {TCardName} from 'src/deal';
import NashChart from 'src/_odds/NashChart';
import pokerCalc from 'poker-calc';

export function calcNash(opts: ICalcNashOpts, prevNash?: INashChart): INashChart {
    const {tableCards, playersCount, iterCount} = opts;
    const nashChart = prevNash ?? new NashChart();
    for (let i = 0; i < iterCount; i++) {
        const witComb = getWinComb(tableCards, playersCount);
        nashChart.up(witComb);
    }
    return nashChart;
}

function getWinComb(tableCards: TCardName[], playersCount: number): IWinCombResult {

}