import {TCalcStateHandlers, TNodes} from 'src/_nash/interface/ICalcStateHandlers';

/** Обработчики расчета состояния */
export const CALC_STATE_HANDLERS: TCalcStateHandlers = {
    root: [],
    elements: [calcElementProbability],
    combs: []
};

function calcElementProbability(nodes: TNodes): void {
    const node = nodes[1];
    if (!node) return;
    const {count, wins} = node.data;
    node.data.winProbability = count ? wins / count * 100 : 0;
}

// function printElementName(nodes: TNodes): void {
//     console.log(nodes[1]?.data.key);
// }

// function printCombName(nodes: TNodes): void {
//     console.log(nodes[2]?.data.key);
// }