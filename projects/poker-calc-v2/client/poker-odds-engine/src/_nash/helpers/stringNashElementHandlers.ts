import {INashElementData, TNashChartMapNode} from 'src/_nash/interface/INashChartMap';

/** Привести к значению вероятности */
export function toWinProb(data: INashElementData): string {
    const {winProbability} = data;
    return winProbability ? winProbability.toFixed(0) : 'x';
}

/** Привести к значению вероятности */
export function toDropProb(data: INashElementData, rootNode: TNashChartMapNode): string {
    const {dropProbability} = data;
    const minDropProbability = rootNode.data.dropProbabilityMultiplier;
    return dropProbability ? (dropProbability / minDropProbability).toFixed(0) : 'x';
}

/** Привести к ключу */
export function toKey(data: INashElementData): string {
    return data.key;
}