import {TCalcStateHandlers, TNodes} from 'src/_nash/interface/ICalcStateHandlers';
import {calcPercentOrZero} from 'src/common/helpers/mathOperations';

/** Обработчики расчета состояния */
export const CALC_STATE_HANDLERS: TCalcStateHandlers = {
    root: [],
    elements: [calcElementWinProbability, calcElementDropProbability],
    combs: []
};

function calcElementWinProbability(nodes: TNodes): void {
    const node = nodes[1];
    if (!node) return;
    const {count, wins} = node.data;
    node.data.winProbability = calcPercentOrZero(wins, count);
}

function calcElementDropProbability(nodes: TNodes): void {
    const [chartNode, elementNode] = nodes;
    if (!chartNode || !elementNode) return;
    const {count: elementCount} = elementNode.data;
    const {count: chartCount} = chartNode.data;
    elementNode.data.dropProbability = calcPercentOrZero(elementCount, chartCount);
}

// function printElementName(nodes: TNodes): void {
//     console.log(nodes[1]?.data.key);
// }

// function printCombName(nodes: TNodes): void {
//     console.log(nodes[2]?.data.key);
// }