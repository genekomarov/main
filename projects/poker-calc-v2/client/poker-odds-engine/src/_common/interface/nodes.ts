/** Интерфейс узла */
export interface INode<D> {
    data: D;
}

/** Интерфейс узла с подузлами */
export interface INodeWithSubNodes<D, K extends string | number | symbol, N> extends INode<D> {
    subNodes: Record<K, N>
}