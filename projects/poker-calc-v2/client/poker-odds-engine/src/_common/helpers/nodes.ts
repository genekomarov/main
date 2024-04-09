import {INode, INodeWithSubNodes, INodeArray} from 'src/_common/interface/INodes';

/** Обработчик для узла */
type TNodeHandler = (deep: number, nodes: INodeArray) => void;

/** Обойти рекурсивно все подузлы */
export function passNodes(node: INode | INodeWithSubNodes, handler: TNodeHandler, deep: number = 0, upperNodes : INodeArray = []): void {
    const nodes: (INode | INodeWithSubNodes)[] = [...upperNodes, node];
    handler(deep, nodes);
    if (node.hasOwnProperty('subNodes')) {
        const nodeWithSubnodes = node as INodeWithSubNodes;
        Object.entries(nodeWithSubnodes.subNodes).forEach((entrie) => {
            passNodes(entrie[1], handler, deep + 1, nodes);
        });
    }
}