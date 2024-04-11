import {
    TCombNode, TNashElementNode, TNashChartMapNode,
    INashChartMapData, IBaseNashElementData,
    IBaseCombData, TNashChartMapSubNodes, TNashElementSubNodes
} from 'src/_nash/interface/INashChartMap';
import {COMBS, TNashKey} from 'src/_nash/consts';
import {RUNKS} from 'src/deal';
import {getNashKeyByRunks} from 'src/_nash/helpers/nashChart';

/** Создает пустую карту для таблицы вероятностей */
export function genNashChartMap(): TNashChartMapNode {
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
const emptyNashElementData: IBaseNashElementData = {
    count: 0,
    wins: 0,
    winProbability: 0,
    dropProbability: 0
};
const emptyCombData: IBaseCombData = {count: 0, wins: 0};