"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTree = void 0;
function generateTree(parent, startId, node) {
    const items = [];
    if (Array.isArray(node)) {
        if (node.length === 2 && typeof node[0] === 'number' && Array.isArray(node[1])) {
            items.push({
                data: undefined,
                id: String(startId),
                parent: String(parent),
                order: node[0],
                isFolder: true
            });
            const id = startId === null ? 0 : startId + 1;
            items.push(...generateTree(startId, id, node[1]));
        }
        else {
            let id = startId;
            node.forEach((subNode) => {
                const newItems = generateTree(parent, id, subNode);
                items.push(...newItems);
                id += newItems.length;
            });
        }
    }
    else if (typeof node === 'number') {
        items.push({
            data: undefined,
            id: String(startId),
            parent: String(parent),
            order: node,
            isFolder: false
        });
    }
    return items;
}
exports.generateTree = generateTree;
