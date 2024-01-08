import {IItem} from '../../src/interface'

type TLeaf = number;
type TFolderContentElement = TFolder | TLeaf;
type TFolderContent = TFolderContentElement[];
type TFolder = [number, TFolderContent];
export type TNode = TFolder | TFolderContent | TFolderContentElement;

export function generateTree(parent: number | null, startId: number | null, node: TNode): IItem<undefined>[] {
    const items: IItem<undefined>[] = [];
    if (Array.isArray(node)) {
        if (node.length === 2 && typeof node[0] === 'number' && Array.isArray(node[1])) {
            items.push({
                data: undefined,
                id: String(startId),
                parent: String(parent),
                order: node[0],
                isFolder: true
            });
            const id = startId === null ? 0 : startId + 1
            items.push(...generateTree(startId, id, node[1]));
        } else {
            let id = startId ?? 0;
            node.forEach((subNode) => {
                const newItems = generateTree(parent, id, subNode);
                items.push(...newItems);
                id += newItems.length;
            });
        }
    } else if (typeof node === 'number') {
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