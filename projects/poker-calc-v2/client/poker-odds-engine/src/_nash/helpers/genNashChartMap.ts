import {
    INashChartMapNode,
    TNashSubNodes,
    INashChartMapData,
    TNashElementSubnodes,
    ICombNode,
    IBaseNashNodeData,
    INashElementNode
} from 'src/_nash/interface/INashChartMap';
import {COMBS, TNashKey} from 'src/_nash/consts';
import {RUNKS} from 'src/deal';
import {getNashKeyByRunks} from 'src/_nash/helpers/nashChart';

/** Создает пустую карту для таблицы вероятностей */
export function genNashChartMap(): INashChartMapNode {
    const nashElementNodes: TNashSubNodes = {} as TNashSubNodes;
    RUNKS.forEach((runk_1) => {
        RUNKS.forEach((runk_2) => {
            const combNodes: TNashElementSubnodes = {} as TNashElementSubnodes;
            COMBS.forEach((combKey) => {
                const combNode: ICombNode = {
                    data: {...emptyCombData, key: combKey}
                };
                combNodes[combKey] = combNode;
            });
            const nashKey: TNashKey = getNashKeyByRunks(runk_1, runk_2);
            const nashElementNode: INashElementNode = {
                data: {...emptyNashElementData, key: nashKey},
                subnodes: combNodes
            };
            nashElementNodes[nashKey] = nashElementNode;
        });
    });
    const nashChartMapNode: INashChartMapNode = {
        data: {...emptyNashChartMapData},
        subnodes: nashElementNodes
    };
    return nashChartMapNode;
}

const emptyNashChartMapData: INashChartMapData = {
    count: 0
};
const emptyNashElementData: IBaseNashNodeData = {count: 0, wins: 0};
const emptyCombData: IBaseNashNodeData = {count: 0, wins: 0};