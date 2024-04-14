import {TRunk} from 'src/deal';

/** Комбинации */
export const COMB = {
    'high card': 0,
    'one pair': 1,
    'two pair': 2,
    'three of a kind': 3,
    'straight': 4,
    'flush': 5,
    'full house': 6,
    'four of a kind': 7,
    'straight flush': 8,
    'royal flush': 9,
};

/** Тип комбинации */
export type TCombKey = keyof typeof COMB;
/** Все комбинации в виде массива */
export const COMBS = Object.keys(COMB) as TCombKey[];

/** Варианты одинаковы / разные масти в виде массива */
export const SYMILAR = ['o', 's'] as const;
/** Тип значения одинаковы / разные */
export type TSymilar = typeof SYMILAR[number];

/** Тип ключа для значения таблицы вероятности */
export type TNashKey = `${TRunk}${TRunk}${TSymilar}`;

/** Режим преобразования к строке */
export enum STRING_TYPE_MODE {KEY, WIN_PROB, DROP_PROB}

/** Уровни структуры */
export enum LEVELS {root, elements, combs}

/** Фазы выполнения расчета состояния */
export enum PHASES {before, after}