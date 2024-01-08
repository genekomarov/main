"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const tree_1 = require("./helpers/tree");
const set1 = [
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
const set2 = [
    0, [
        [0, [0, 0]],
        [0, [0, 0]]
    ]
];
describe('CheckEngine/CheckSource/helpers', () => {
    describe('tree', () => {
        it('Генерация дерева', () => {
            const tree = (0, tree_1.generateTree)(null, null, set2);
        });
    });
});
