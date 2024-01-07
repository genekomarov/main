/** Элемент, с которым работает структура */
export interface IItem<DATA> {
    data: DATA;
    id: string;
    parent: string;
    order: number;
    isFolder: boolean;
}

/** Функция, которая может абстрактные данные привести к IItem интерфейсу */
export type TItemCreator<DATA> = (data: DATA) => IItem<DATA>;

/** Cтруктура с разбивкой по родителям */
export interface IByParentStructure<T> {
    [parent: string]: T;
}