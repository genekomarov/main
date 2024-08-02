import {TRunk} from 'src/deal';

/** Комбинации */
export const COMB = {
    'High Card': 0,
    'One Pair': 1,
    'Two Pair': 2,
    'Three of a Kind': 3,
    'Straight': 4,
    'Flush': 5,
    'Full House': 6,
    'Four of a Kind': 7,
    'Straight Flush': 8,
    'Royal Flush': 9,
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