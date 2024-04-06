import {INashChart, IGameResult, IToStringParams} from 'src/_nash/interface';
import {
    TCombNode, TNashElementNode, TNashChartMapNode,
    INashElementData, INashChartMapData, IBaseNashElementData,
    IBaseCombData, TNashChartMapSubNodes, TNashElementSubNodes
} from 'src/_nash/interface/INashChartMap';
import { COMBS, TNashKey, SYMILAR, STRING_TYPE_MODE} from 'src/_nash/consts';
import { RUNKS, TRunk, RUNK } from 'src/deal';
import { toString } from 'src/_nash/helpers/string';
import { toOdd, toKey } from 'src/_nash/helpers/stringNashElementHandlers';

/** Номиналы карт по убыванию */
const REVERSED_RUNKS = [...RUNKS].reverse();

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

/** Создает пустую карту для таблицы вероятностей */
function genNashChartMap(): TNashChartMapNode {
    const nashElementNodes: TNashChartMapSubNodes = {} as TNashChartMapSubNodes;
    RUNKS.forEach((runk_1) => {
        RUNKS.forEach((runk_2) => {
            const combNodes: TNashElementSubNodes = {} as TNashElementSubNodes;
            COMBS.forEach((combKey) => {
                const combNode: TCombNode = {
                    data: {...emptyCombData, key: combKey}
                };
                combNodes[combKey] = combNode;
            });
            const nashKey: TNashKey = getNashKeyByRunks(runk_1, runk_2);
            const nashElementNode: TNashElementNode = {
                data: {...emptyNashElementData, key: nashKey},
                subNodes: combNodes
            };
            nashElementNodes[nashKey] = nashElementNode;
        });
    });
    const nashChartMapNode: TNashChartMapNode = {
        data: {...emptyNashChartMapData},
        subNodes: nashElementNodes
    };
    return nashChartMapNode;
}

const emptyNashChartMapData: INashChartMapData = {count: 0};
const emptyNashElementData: IBaseNashElementData = {count: 0, wins: 0};
const emptyCombData: IBaseCombData = {count: 0, wins: 0};

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