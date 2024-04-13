/** Интерфейс узла */
export interface INode<D = object> {
    data: D;
}

/** Интерфейс узла с подузлами */
export interface INodeWithSubNodes<K extends string | number | symbol = '', N extends INode | INodeWithSubNodes = INode, D = object> extends INode<D> {
    subNodes: Record<K, N>;
}

/** Массив узлов */
export type TNodeArray = (INode | INodeWithSubNodes)[];