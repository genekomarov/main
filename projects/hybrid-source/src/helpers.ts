import {IItem} from './interface';

/** Восстанавливает древовидную структуру результатов */
export function makeTreeSequence<DATA>(items: IItem<DATA>[], parent: string): IItem<DATA>[] {
    const sequence: IItem<DATA>[] = [];
    const selected = items.filter((item) => {
        return item.parent === parent;
    }).sort((itemA, itemB) => {
        const idA = itemA.id === null ? -1 : Number(itemA.id);
        const idB = itemB.id === null ? -1 : Number(itemB.id);
        const orderA = itemA.order as number;
        const orderB = itemB.order as number;
        if (orderA < orderB && idA < idB) {
            return -1;
        }
        if (orderA > orderB && idA > idB) {
            return 1;
        }
        return 0;
    });
    if (!selected.length) {
        return [];
    }
    selected.forEach((result) => {
        sequence.push(result);
        sequence.push(...makeTreeSequence<DATA>(items, result.id));
    });
    return sequence;
}
