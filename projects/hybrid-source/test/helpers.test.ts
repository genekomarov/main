import 'jest';
import {generateTree, TNode} from './helpers/tree';

const set1: TNode = [
    0, [
        [0, [0, 0, 1, 1]],
        [1, [
            [1, [1, 1, 2, 2]],
            [2, [2, 2, 3, 3]]
        ]],
        1,
        1
    ]
];

const set2: TNode = [
    0, [
        [0, [0, 0]],
        [0, [0, 0]]
    ]
];

describe('CheckEngine/CheckSource/helpers', () => {
    describe('tree', () => {
        it('Генерация дерева', () => {
            const tree = generateTree(null, null, set2);
        });
    });
});