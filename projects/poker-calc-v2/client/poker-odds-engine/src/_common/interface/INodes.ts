/** Интерфейс узла */
export interface INode<D> {
    data: D;
}

/** Интерфейс узла с подузлами */
export interface INodeWithSubNodes<D, N> extends INode<D> {
    subNodes: N;
}