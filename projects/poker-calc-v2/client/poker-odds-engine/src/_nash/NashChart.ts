import {INashChart, IGameResult, IToStringParams, IMeta} from 'src/_nash/interface/INashChart';
import {TNashChartMapNode,INashElementData, TLevels, TPhases} from 'src/_nash/interface/INashChartMap';
import {TNashKey, STRING_TYPE_MODE, LEVELS, PHASES} from 'src/_nash/consts';
import {REVERSED_RUNKS} from 'src/deal';
import {toString} from 'src/_nash/helpers/string';
import {toWinProb, toDropProb, toKey} from 'src/_nash/helpers/stringNashElementHandlers';
import {genNashChartMap} from 'src/_nash/helpers/genNashChartMap';
import {getNashKeyByRunks} from 'src/_nash/helpers/nashChart';
import {TArrayHandler, INashChartParams} from 'src/_nash/interface/INashChart';
import {passNodes} from 'src/common/helpers/nodes';
import {CALC_STATE_HANDLERS} from 'src/_nash/utils/calcStateHandlers';
import {TNodes} from 'src/_nash/interface/ICalcStateHandlers';
import Timer from 'src/common/Timer';
 
/** Таблица вероятностей */
export default class NashChart implements INashChart {

    /** Ограничение вероятности (по умолчанию 100 / playerCount) */
    private readonly _threshold: number;

    /** Таймер */
    private _timer: Timer | null = null;

    /** Время игры */
    private _playTime: number | null = null;
    /** Время расчета состояния */
    private _calcTime: number | null = null;

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
        if (!this._timer) this._timer = new Timer();
        Object.entries(gameResult).forEach((entrie) => {
            const [key, value] = entrie;
            const nashKey: TNashKey = key as TNashKey;
            const { count, wins } = value;
            this._chartMap.data.count += count;
            this._chartMap.subNodes[nashKey].data.count += count;
            this._chartMap.subNodes[nashKey].data.wins += wins;
        });
    }

    calc(): void {
        this._playTime = this._timer?.stop() ?? null;
        this._timer = new Timer();
        passNodes<TNodes>(this._chartMap, this._calcStateRouter.bind(this), []);
        this._calcTime = this._timer.stop();
        this._timer = null;
    }

    getMeta(): IMeta {
        return {
            totalCount: this._chartMap.data.count,
            treshHold: this._threshold,
            playTime: this._playTime,
            calcTime: this._calcTime
        };
    }

    /** Маршрутизатор обработчиков расчета состояния */
    private _calcStateRouter(deep: number, nodes: TNodes, phase: PHASES): boolean {
        const level = LEVELS[deep] as TLevels;
        const phaseName = PHASES[phase] as TPhases;
        CALC_STATE_HANDLERS[level][phaseName].forEach((handler) => handler(nodes));
        return false;
    }

    toString(params?: IToStringParams): string {
        const mode = params?.mode;
        const useThreshold = !!params?.useThreshold;
        switch (mode) {
        case STRING_TYPE_MODE.KEY:
            return toString(this._toArray(toKey, useThreshold), 3);
        case STRING_TYPE_MODE.DROP_PROB:
            return toString(this._toArray(toDropProb, useThreshold), 2);
        case STRING_TYPE_MODE.WIN_PROB:
        default:
            return toString(this._toArray(toWinProb, useThreshold), 2);
        }
    }

    /** Получить в виде массива */
    private _toArray(handler: TArrayHandler, useThreshold: boolean): string[][] {
        return REVERSED_RUNKS.map((runk_1) => {
            return REVERSED_RUNKS.map((runk_2) => {
                const key: TNashKey = getNashKeyByRunks(runk_1, runk_2);
                const data: INashElementData = this._chartMap.subNodes[key].data;
                const {winProbability} = data;
                if (useThreshold && (winProbability < this._threshold)) {
                    return '.';
                }
                return handler(data, this._chartMap);
            });
        });
    }
}