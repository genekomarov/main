import {TCalcStateHandlers, TNodes} from 'src/_nash/interface/ICalcStateHandlers';
import {calcPercentOrValue} from 'src/common/helpers/mathOperations';

/** Обработчики расчета состояния */
export const CALC_STATE_HANDLERS: TCalcStateHandlers = {
    root: {
        before: [calcMinDropProbability],
        after: []
    },
    elements: {
        before: [calcElementWinProbability, calcElementDropProbability],
        after: []
    },
    combs: {
        before: [],
        after: []
    }
};

function calcMinDropProbability(nodes: TNodes): void {
    const node = nodes[0];
    if (!node) return;
    const chartCount = node.data.count;
    const minElementCount = Object.entries(node.subNodes).reduce((acc, entrie) => {
        const elementCount = entrie[1].data.count;
        return elementCount < acc ? elementCount : acc;
    }, chartCount);
    node.data.dropProbabilityMultiplier = calcPercentOrValue(minElementCount, chartCount, 1);
}

function calcElementWinProbability(nodes: TNodes): void {
    const node = nodes[1];
    if (!node) return;
    const {count, wins} = node.data;
    node.data.winProbability = calcPercentOrValue(wins, count, 0);
}

function calcElementDropProbability(nodes: TNodes): void {
    const [chartNode, elementNode] = nodes;
    if (!chartNode || !elementNode) return;
    const {count: elementCount} = elementNode.data;
    const {count: chartCount} = chartNode.data;
    elementNode.data.dropProbability = calcPercentOrValue(elementCount, chartCount, 0);
}

// function printElementName(nodes: TNodes): void {
//     console.log(nodes[1]?.data.key);
// }

// function printCombName(nodes: TNodes): void {
//     console.log(nodes[2]?.data.key);
// }