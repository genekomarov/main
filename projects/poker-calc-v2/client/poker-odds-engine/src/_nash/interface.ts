import {TNashKey, STRING_TYPE_MODE} from 'src/_nash/consts';
import {TCardName} from 'src/deal';

/** Интерфейс параметров метода toString */
export interface IToStringParams {
    mode?: STRING_TYPE_MODE;
    useThreshold?: boolean; 
}

/** Интерфейс Таблица веротяностей */
export interface INashChart {
    /** Применить результат игры */
    up(gameResult: Partial<IGameResult>): void;
    /** Вывести в форме строки */
    toString(params?: IToStringParams): string;
}

/** Интерфейс Счетчики в результате игры */
export interface ICounts {
        wins: number,
        count: number
}

/** Интерфейс Результат игры */
export type IGameResult = Record<TNashKey, ICounts>;

/** Интерфейс данных игрока */
export interface IPlayerCards {
    playerId: string;
    cards: TCardName[];
    isWin: boolean;
}