import {TRunk, RUNK} from 'src/deal';

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