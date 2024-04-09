import type {LEVELS, PHASES} from 'src/_nash/consts';

type TLevels = keyof typeof LEVELS

type TPhases = keyof typeof PHASES;

type TCalcHandler = () => void;

type TPhaseHandlers = Record<TPhases, TCalcHandler[]>;

/** Обработчики расчета состояния */
export type TCalcStateHandlers = Record<TLevels, TPhaseHandlers>;