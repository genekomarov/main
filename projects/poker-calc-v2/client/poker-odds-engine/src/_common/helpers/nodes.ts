import {INode, INodeWithSubNodes, TNodeArray} from 'src/_common/interface/INodes';

/** Обработчик для узла */
type TNodeHandler = (deep: number, nodes: TNodeArray) => boolean;

/** Обойти рекурсивно все подузлы */
export function passNodes(node: INode | INodeWithSubNodes, handler: TNodeHandler, deep: number = 0, upperNodes : TNodeArray = []): void {
    const nodes: (INode | INodeWithSubNodes)[] = [...upperNodes, node];
    const stop = handler(deep, nodes);
    if (stop) return;
    if (node.hasOwnProperty('subNodes')) {
        const nodeWithSubnodes = node as INodeWithSubNodes;
        Object.entries(nodeWithSubnodes.subNodes).forEach((entrie) => {
            passNodes(entrie[1], handler, deep + 1, nodes);
        });
    }
}