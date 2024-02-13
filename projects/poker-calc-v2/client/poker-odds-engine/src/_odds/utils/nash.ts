import {INashChart} from 'src/_odds/interface/INashChart';
import {ICalcNashOpts, IWinCombResult, IBaseCalcNashOpts} from 'src/_odds/interface/ICalcNash';
import {ICalcNashOpts, IWinCombResult, IBaseCalcNashOpts} from 'src/_odds/interface/ICalcNash';
import {IDeal, Deal, genDeck} from 'src/deal';
import NashChart from 'src/_odds/NashChart';
import {TABLE_COUNT, TComb} from 'src/_odds/consts';
import pokerCalc from 'poker-calc';


export function calcNash_1(opts: IBaseCalcNashOpts, prevNash?: INashChart): INashChart {
    return calcNash({
        ...opts,
        getWinCombCallback: getWinComb
    }, prevNash);
}


export function calcNash_1(opts: IBaseCalcNashOpts, prevNash?: INashChart): INashChart {
    return calcNash({
        ...opts,
        getWinCombCallback: getWinComb
    }, prevNash);
}

function calcNash(opts: ICalcNashOpts, prevNash?: INashChart): INashChart {
    const {tableCards, playersCount, iterCount, getWinCombCallback} = opts;
    const nashChart: INashChart = prevNash ?? new NashChart();
    const deal: IDeal = new Deal(genDeck());
    const desk = deal.pullCards(tableCards);
    for (let i = 0; i < iterCount; i++) {
        const witComb = getWinCombCallback(deal.clone(), desk.clone(), playersCount);
        const witComb = getWinCombCallback(deal.clone(), desk.clone(), playersCount);
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
    const {playerId, hand} = pokerCalc.getHoldemWinner({
        boardCards: desk.cardNames,
        playerCards: players.map((player, index) => {
            return {
                playerId: String(index),
                cards: player.cardNames
            };
        })
    }, {compactCards: true})[0];
    const {handInfo} = hand;
    const {type} = handInfo;
    return {
        hand: players[Number(playerId)].cards,
        comb: type.toLowerCase() as TComb
    };
}
