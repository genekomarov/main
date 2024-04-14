import {TCombNode, TLevels, TPhases, TNashElementNode} from 'src/_nash/interface/INashChartMap';
import {TNashChartMapNode} from 'src/_nash/interface/INashChartMap';

/** Тип Последовательности вложенных узлов */
export type TNodes = [TNashChartMapNode, TNashElementNode, TCombNode] | [TNashChartMapNode, TNashElementNode] | [TNashChartMapNode] | [];

/** Обработчик расчета состояния */
type TCalcStateHandler = (nodes: TNodes) => void;

/** Массив обработчиков на фазе */
export type TPhaseHandlers = Record<TPhases, TCalcStateHandler[]>;

/** Массив обработчиков расчета состояния */
export type TCalcStateHandlers = Record<TLevels, TPhaseHandlers>;