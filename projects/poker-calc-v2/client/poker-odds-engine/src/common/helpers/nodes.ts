import {INode, INodeWithSubNodes, TNodeArray} from 'src/common/interface/INodes';
import {PHASES} from 'src/_nash/consts';

/** Обработчик для узла */
type TNodeHandler<N extends TNodeArray> = (deep: number, nodes: N, phase: PHASES) => boolean;

/** Обойти рекурсивно все подузлы */
export function passNodes<N extends TNodeArray>(node: INode | INodeWithSubNodes, handler: TNodeHandler<N>, upperNodes: N, deep: number = 0): void {
    const nodes: N = [...upperNodes, node] as N;
    const stop = handler(deep, nodes, PHASES.before);
    if (stop) return;
    if (node.hasOwnProperty('subNodes')) {
        const nodeWithSubnodes = node as INodeWithSubNodes;
        Object.entries(nodeWithSubnodes.subNodes).forEach((entrie) => {
            passNodes(entrie[1], handler, nodes, deep + 1);
        });
    }
}