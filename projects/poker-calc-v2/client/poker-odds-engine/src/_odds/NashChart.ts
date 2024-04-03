import {INashChart, INashChartMap, INashElement, IComb, IGameResult} from 'src/_odds/interface';
import {COMBS, TNashKey, SYMILAR} from 'src/_odds/consts';
import {RUNKS, TRunk, RUNK} from 'src/deal';
import {genString, genSpaceString, stringFromArray} from 'src/common';

const COLUMN_SEP_COUNT = 0;
const ROW_SEP_COUNT = 1;
const ANNOTATION_ELEMENT_LENGTH = 2;

const REVERSED_RUNKS = [...RUNKS].reverse();

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

    toArray(printKey: boolean): (string | number) [][] {
        return REVERSED_RUNKS.map((runk_1) => {
            return REVERSED_RUNKS.map((runk_2) => {
                const key: TNashKey = getNashKeyByRunks(runk_1, runk_2);
                if (printKey) {
                    return key;
                } else {
                    const {count, wins} = this._chartMap[key];
                    return count ? (wins / count * 100).toFixed(0) : 0;
                }
            });
        });
    }

    toString(printKey: boolean = false): string {
        const rows: string[] = [];
        rows.push(this._getAnnotationRow(printKey ? 3 : 2));
        const array = this.toArray(printKey);
        rows.push(...REVERSED_RUNKS.map((runk, i) => {
            const prefix = runk + genSpaceString(ROW_SEP_COUNT + 1);
            const data = array[i].map((element) => {
                if (printKey) {
                    return element as string;
                } else {
                    const stringElement = element.toString();
                    return genSpaceString(2 - stringElement.length) + stringElement;
                }
            });
            return prefix + stringFromArray(data, genSpaceString(ROW_SEP_COUNT));
        }));
        return stringFromArray(rows, '\n' + genString(COLUMN_SEP_COUNT, '\n'));
    }

    private _getAnnotationRow(elementLength: number): string {
        const prefix = genSpaceString(ANNOTATION_ELEMENT_LENGTH + ROW_SEP_COUNT);
        const runks = REVERSED_RUNKS.map((runk) => {
            const resizedRunk = genSpaceString(elementLength - runk.length) + runk;
            return resizedRunk;
        });
        const data = stringFromArray(runks, genSpaceString(ROW_SEP_COUNT));
        return prefix + data;
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