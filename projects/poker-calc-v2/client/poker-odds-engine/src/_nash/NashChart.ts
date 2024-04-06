import {INashChart, IGameResult, IToStringParams} from 'src/_nash/interface';
import {TNashChartMapNode,INashElementData} from 'src/_nash/interface/INashChartMap';
import {TNashKey, STRING_TYPE_MODE} from 'src/_nash/consts';
import {REVERSED_RUNKS} from 'src/deal';
import {toString} from 'src/_nash/helpers/string';
import {toOdd, toKey} from 'src/_nash/helpers/stringNashElementHandlers';
import {genNashChartMap} from 'src/_nash/helpers/genNashChartMap';
import {getNashKeyByRunks} from 'src/_nash/helpers/nashChart';

/** Обработчик преобразования элемента таблицы вероятностей к строке */
type TArrayHandler = (data: INashElementData) => string;

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

    private _chartMap: TNashChartMapNode = genNashChartMap();

    up(gameResult: Partial<IGameResult>): void {
        Object.entries(gameResult).forEach((entrie) => {
            const [key, value] = entrie;
            const nashKey: TNashKey = key as TNashKey;
            const { count, wins } = value;
            this._chartMap.data.count += count;
            this._chartMap.subNodes[nashKey].data.count += count;
            this._chartMap.subNodes[nashKey].data.wins += wins;
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
                const data: INashElementData = this._chartMap.subNodes[key].data;
                const {count, wins} = data;
                if (useThreshold && (!count || wins / count * 100 < this._threshold)) {
                    return '.';
                }
                return handler(data);
            });
        });
    }
}