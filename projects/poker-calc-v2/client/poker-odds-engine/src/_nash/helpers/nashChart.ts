import {TRunk, ICard, RUNK} from 'src/deal';
import {TNashKey, SYMILAR} from 'src/_nash/consts';

/** Получить ключ для таблицы вероятностей */
export function getNashKeyByCards(card_1: ICard, card_2: ICard): TNashKey {
    const runk_1 = card_1.runk;
    const suit_1 = card_1.suit;
    const runk_2 = card_2.runk;
    const suit_2 = card_2.suit;

    const sortedRunks = sortRunksUp([runk_1, runk_2]).reverse();
    return `${sortedRunks[0]}${sortedRunks[1]}${suit_1 === suit_2 ? SYMILAR[1] : SYMILAR[0]}`;
}

/** Выполнить сортировку номиналов по возрастанию */
export function sortRunksUp(runks: TRunk[]): TRunk[] {
    return runks.sort((runkA, runkB) => {
        const aPow = RUNK[runkA];
        const bPow = RUNK[runkB];
        if (aPow > bPow) {
            return 1;
        }
        if (aPow < bPow) {
            return -1;
        }
        return 0;
    });
}