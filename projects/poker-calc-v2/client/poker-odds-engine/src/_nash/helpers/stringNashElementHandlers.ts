import { INashElementData } from 'src/_nash/interface/INashChartMap';

/** Привести к значению вероятности */
export function toOdd(data: INashElementData): string {
    const {winProbability} = data;
    return winProbability ? winProbability.toFixed(0) : 'x';
}

/** Привести к ключу */
export function toKey(data: INashElementData): string {
    return data.key;
}