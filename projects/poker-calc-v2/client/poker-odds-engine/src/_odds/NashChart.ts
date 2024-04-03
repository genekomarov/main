import { INashChart, INashChartMap, INashElement, IComb, IGameResult, IToStringParams} from 'src/_odds/interface';
import { COMBS, TNashKey, SYMILAR, STRING_TYPE_MODE } from 'src/_odds/consts';
import { RUNKS, TRunk, RUNK } from 'src/deal';
import { toString } from 'src/_odds/NashChart/helpers/string';
import { toOdd, toKey } from 'src/_odds/NashChart/helpers/stringNashElementHandlers';

/** Номиналы карт по убыванию */
const REVERSED_RUNKS = [...RUNKS].reverse();

/** Обработчик преобразования элемента таблицы вероятностей к строке */
type TArrayHandler = (element: INashElement) => string;

interface INashChartParams {
    /** Ограничение вероятности */
    threshold?: number;
    playerCount?: number;
}

/** Таблица вероятностей */
export default class NashChart implements INashChart {

    /** Ограничение вероятности (по умолчанию 100 / playerCount) */
    private _threshold: number;

    constructor(params: INashChartParams) {
        const {threshold, playerCount} = params;
        if (threshold) {
            this._threshold = threshold;
        } else if (playerCount) {
            this._threshold = 100 / playerCount;
        } else {
            this._threshold = 100;
        }
    }

    private _chartMap: INashChartMap = genNashChartMap();

    up(gameResult: Partial<IGameResult>): void {
        Object.entries(gameResult).forEach((entrie) => {
            const [key, value] = entrie;
            const nashKey: TNashKey = key as TNashKey;
            const { count, wins } = value;
            this._chartMap.count += count;
            this._chartMap[nashKey].count += count;
            this._chartMap[nashKey].wins += wins;
        });
    }

    toString(params?: IToStringParams): string {
        const mode = params?.mode;
        const useThreshold = !!params?.useThreshold;
        switch (mode) {
        case STRING_TYPE_MODE.KEY:
            return toString(this._toArray(toKey, useThreshold), 3);
        case STRING_TYPE_MODE.ODD:
        default:
            return toString(this._toArray(toOdd, useThreshold), 2);
        }
    }

    /** Получить в виде массива */
    private _toArray(handler: TArrayHandler, useThreshold: boolean): string[][] {
        return REVERSED_RUNKS.map((runk_1) => {
            return REVERSED_RUNKS.map((runk_2) => {
                const key: TNashKey = getNashKeyByRunks(runk_1, runk_2);
                const element: INashElement = this._chartMap[key];
                const {count, wins} = element;
                if (useThreshold && (!count || wins / count * 100 < this._threshold)) {
                    return '.';
                }
                return handler(element);
            });
        });
    }
}

/** Создает пустую карту для таблицы вероятностей */
function genNashChartMap(): INashChartMap {
    const nashChartMap: INashChartMap = {} as INashChartMap;
    nashChartMap.count = 0;
    RUNKS.forEach((runk_1) => {
        RUNKS.forEach((runk_2) => {
            const key: TNashKey = getNashKeyByRunks(runk_1, runk_2);
            const nashElement: INashElement = {} as INashElement;
            nashElement.count = 0;
            nashElement.wins = 0;
            nashElement.key = key;
            COMBS.forEach((comb) => {
                const combElement: IComb = {} as IComb;
                combElement.count = 0;
                combElement.wins = 0;
                nashElement[comb] = combElement;
            });
            nashChartMap[key] = nashElement;
        });
    });
    return nashChartMap;
}

/**
 * Получить ключ для таблицы вероятности
 * @description
 * Формирует ключи с учетом того, что слева в таблице находятся одинаковые масти, а справа разные
 */
export function getNashKeyByRunks(runk_1: TRunk, runk_2: TRunk): TNashKey {
    return RUNK[runk_1] > RUNK[runk_2]
        ? `${runk_1}${runk_2}${SYMILAR[1]}`
        : `${runk_2}${runk_1}${SYMILAR[0]}`;
}