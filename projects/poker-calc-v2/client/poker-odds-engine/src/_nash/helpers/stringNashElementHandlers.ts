import { INashElementData } from 'src/_nash/interface/INashChartMap';

/** Привести к значению вероятности */
export function toOdd(data: INashElementData): string {
    const {count, wins} = data;
    return count ? (wins / count * 100).toFixed(0) : 'x';
}

/** Привести к ключу */
export function toKey(data: INashElementData): string {
    return data.key;
}