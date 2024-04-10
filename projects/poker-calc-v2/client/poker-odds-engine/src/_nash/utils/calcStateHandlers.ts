import {TCalcStateHandlers, TNodes} from 'src/_nash/interface/ICalcStateHandlers';

/** Обработчики расчета состояния */
export const CALC_STATE_HANDLERS: TCalcStateHandlers = {
    root: [],
    elements: [printElementName],
    combs: [printCombName]
};

function printElementName(nodes: TNodes): void {
    console.log(nodes[1]?.data.key);
}

function printCombName(nodes: TNodes): void {
    console.log(nodes[2]?.data.key);
}