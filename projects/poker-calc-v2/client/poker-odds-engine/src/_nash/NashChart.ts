import {INashChart, IGameResult, IMeta} from 'src/_nash/interface/INashChart';
import {TNashChartMapNode,INashElementData} from 'src/_nash/interface/INashChartMap';
import {TNashKey} from 'src/_nash/consts';
import {genNashChartMap} from 'src/_nash/helpers/genNashChartMap';
 
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

    getMeta(): IMeta {
        return {
            totalCount: this._chartMap.data.count
        };
    }

    getDataByNashKey(nashKey: TNashKey): INashElementData {
        return this._chartMap.subNodes[nashKey].data;
    }
}