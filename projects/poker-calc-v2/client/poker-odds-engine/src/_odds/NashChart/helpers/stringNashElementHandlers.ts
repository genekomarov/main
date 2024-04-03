import { INashElement } from 'src/_odds/interface';

/** Привести к значению вероятности */
export function toOdd(element: INashElement): string {
    const {count, wins} = element;
    return count ? (wins / count * 100).toFixed(0) : 'x';
}