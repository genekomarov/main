import {INashChart, INashChartMap, INashElement, IComb, IGameResult} from 'src/_odds/interface';
import {COMBS, TNashKey, SYMILAR} from 'src/_odds/consts';
import {RUNKS, TRunk, RUNK} from 'src/deal';
import {toString} from 'src/_odds/NashChart/helpers/string';
import {toOdd} from 'src/_odds/NashChart/helpers/stringNashElementHandlers';

/** Номиналы карт по убыванию */
const REVERSED_RUNKS = [...RUNKS].reverse();

/** Обработчик преобразования элемента таблицы вероятностей к строке */
type TArrayHandler = (element: INashElement) => string;

/** Таблица вероятностей */
export default class NashChart implements INashChart {
    
    private _chartMap: INashChartMap = genNashChartMap();
    
    up(gameResult: Partial<IGameResult>): void {
        Object.entries(gameResult).forEach((entrie) => {
            const [key, value] = entrie;
            const nashKey: TNashKey = key as TNashKey;
            const {count, wins} = value;
            this._chartMap.count += count;
            this._chartMap[nashKey].count += count;
            this._chartMap[nashKey].wins += wins;
        });
    }

    toString(): string {
        return toString(this._toArray(toOdd), false);
    }

    /** Получить в виде массива */
    private _toArray(handler: TArrayHandler): string[][] {
        return REVERSED_RUNKS.map((runk_1) => {
            return REVERSED_RUNKS.map((runk_2) => {
                const key: TNashKey = getNashKeyByRunks(runk_1, runk_2);
                const element: INashElement = this._chartMap[key];
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