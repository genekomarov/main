import {NashChart, INashChart} from 'src/nash';
import {TCardName, genDeck} from 'src/deal';
import {game} from 'src/_oddsUtils/game';

/** Параметры для расчета таблицы вероятностей */
interface ICalcNashParams {
    /** Карты на столе */
    tableCards: TCardName[];
    /** Количество игроков */
    playerCount: number;
    /** Количество итераций (игр) для расчета */
    iterCount: number;
    /** Таблица вероятностей для дополнения */
    prevNash?: INashChart;
    /** Опорная таблица вероятностей */
    referenceNash?: INashChart;
    /** Ограничение вероятности*/
    threshold?: number;
}

/** Рассчитать таблицу вероятностей */
export function calcNash(params: ICalcNashParams): INashChart {
    const {prevNash, tableCards, playerCount, iterCount, threshold, referenceNash} = params;
    const nashChart = prevNash ?? new NashChart();
    const deal = genDeck();
    const desk = deal.pullCards(tableCards);
    for (let iter = 0; iter < iterCount; iter++) {
        const gameResult = game({
            deal: deal.clone(),
            desk: desk.clone(),
            playerCount,
            referenceNash,
            threshold
        });
        nashChart.up(gameResult);
    }
    return nashChart;
}