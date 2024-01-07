"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTreeSequence = void 0;
/** Восстанавливает древовидную структуру результатов */
function makeTreeSequence(items, parent) {
    const sequence = [];
    const selected = items.filter((item) => {
        return item.parent === parent;
    }).sort((itemA, itemB) => {
        const idA = itemA.id === null ? -1 : Number(itemA.id);
        const idB = itemB.id === null ? -1 : Number(itemB.id);
        const orderA = itemA.order;
        const orderB = itemB.order;
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
        sequence.push(...makeTreeSequence(items, result.id));
    });
    return sequence;
}
exports.makeTreeSequence = makeTreeSequence;
