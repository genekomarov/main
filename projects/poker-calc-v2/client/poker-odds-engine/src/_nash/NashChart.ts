import {INashChart, IGameResult, IMeta} from 'src/_nash/interface/INashChart';
import {TNashChartMapNode,INashElementData, TLevels, TPhases} from 'src/_nash/interface/INashChartMap';
import {TNashKey, LEVELS, PHASES} from 'src/_nash/consts';
import {genNashChartMap} from 'src/_nash/helpers/genNashChartMap';
import {passNodes} from 'src/common/helpers/nodes';
import {CALC_STATE_HANDLERS} from 'src/_nash/utils/calcStateHandlers';
import {TNodes} from 'src/_nash/interface/ICalcStateHandlers';
 
/** Таблица вероятностей */
export default class NashChart implements INashChart {

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

    calc(): void {
        passNodes<TNodes>(this._chartMap, this._calcStateRouter.bind(this), []);
    }

    getMeta(): IMeta {
        return {
            totalCount: this._chartMap.data.count
        };
    }

    getDataByNashKey(nashKey: TNashKey): INashElementData {
        return this._chartMap.subNodes[nashKey].data;
    }

    /** Маршрутизатор обработчиков расчета состояния */
    private _calcStateRouter(deep: number, nodes: TNodes, phase: PHASES): void {
        const level = LEVELS[deep] as TLevels;
        const phaseName = PHASES[phase] as TPhases;
        CALC_STATE_HANDLERS[level][phaseName].forEach((handler) => handler(nodes));
    }
}