import NashChart from 'src/_new_odds/NashChart';
import {INashChart} from 'src/_new_odds/interface';
import {TCardName, genDeck} from 'src/deal';
import {game} from 'src/_new_odds/utils/game';

interface ICalcNashParams {
    prevNash?: INashChart;
    tableCards: TCardName[];
    playerCount: number;
    iterCount: number;
}

export function calcNash(params: ICalcNashParams): INashChart {
    const {prevNash, tableCards, playerCount, iterCount} = params;
    const nashChart = prevNash ?? new NashChart();
    const deal = genDeck();
    const desk = deal.pullCards(tableCards);
    for (let iter = 0; iter < iterCount; iter++) {
        const gameResult = game(deal.clone(), desk.clone(), playerCount);
        nashChart.up(gameResult);
    }
    return nashChart;
}