import {TCardName, ICard} from 'src/deal';
import {TComb} from 'src/_odds/consts';
import {IDeal} from 'src/deal';

/** Тип колбека для получения выйгрышной комбинации по текущей ситуации (случайно) */
export type TGetWinComb = (deal: IDeal, desk: IDeal, playersCount: number) => IWinCombResult;

/** Интерфейс базовых опций для механизма расчета таблицы вероятностей */
export interface IBaseCalcNashOpts {
    tableCards: TCardName[];
    iterCount: number;
    playersCount: number;
}

/** Интерфейс опции для механизма расчета таблицы веротятностей */
export interface ICalcNashOpts extends IBaseCalcNashOpts {
    getWinCombCallback: TGetWinComb;
}

/** Рука игрока */
export type THand = ICard[];

/** Результат расчета выигрыша */
export interface IWinCombResult {
    hand: THand;
    comb: TComb | null;
}