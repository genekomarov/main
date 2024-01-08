import {IItem} from '../../src/interface'

type TLeaf = number;
type TFolderContentElement = TFolder | TLeaf;
type TFolderContent = TFolderContentElement[];
type TFolder = [number, TFolderContent];
export type TNode = TFolder | TFolderContent | TFolderContentElement;

export function generateTree(node: TNode, startId: number, parent: number | null): IItem<undefined>[] {
    const items: IItem<undefined>[] = [];
    const nodeType = getNodeType(node);
    let typedNode: TNode;
    let id: number;
    switch (nodeType) {
        case NODE_TYPE.LEAF:
            typedNode = node as TLeaf;
            items.push({
                data: undefined,
                id: String(startId),
                parent: String(parent),
                order: typedNode,
                isFolder: false
            });
            break;
        case NODE_TYPE.FOLDER:
            typedNode = node as TFolder;
            items.push({
                data: undefined,
                id: String(startId),
                parent: String(parent),
                order: typedNode[0],
                isFolder: true
            });
            id = startId === null ? 0 : startId + 1
            items.push(...generateTree(typedNode[1], id, startId));
            break;
        case NODE_TYPE.FOLDER_CONTENT:
            typedNode = node as TFolderContent;
            id = startId;
            typedNode.forEach((subNode) => {
                const newItems = generateTree(subNode, id, parent);
                items.push(...newItems);
                id += newItems.length;
            });
            break;
        default:
            break;
    }
    return items;
}

enum NODE_TYPE {
    'LEAF',
    'FOLDER',
    'FOLDER_CONTENT'
}

function getNodeType(node: TNode): NODE_TYPE {
    if (typeof node === 'number') {
        return NODE_TYPE.LEAF;
    }
    if (node.length === 2 && typeof node[0] === 'number' && Array.isArray(node[1])) {
        return NODE_TYPE.FOLDER;
    }
    return NODE_TYPE.FOLDER_CONTENT;
}