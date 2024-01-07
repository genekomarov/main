import 'jest';
import StructureElement, {GetResult} from '../src/StructureElement';

const set1 = [
    {data: undefined, id: '0', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '1', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '2', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '3', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '4', parent: '0', order: 0, isFolder: false}
];

const set2 = [
    {data: undefined, id: '0', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '1', parent: '0', order: 0, isFolder: false},
    {data: undefined, id: '2', parent: '0', order: 2, isFolder: false},
    {data: undefined, id: '3', parent: '0', order: 2, isFolder: false},
    {data: undefined, id: '4', parent: '0', order: 2, isFolder: false}
];

const set3 = [
    {data: undefined, id: '100', parent: '0', order: 1, isFolder: false},
    {data: undefined, id: '101', parent: '0', order: 1, isFolder: false},
];

describe('CheckEngine/CheckSource/StructureElement', () => {
    beforeEach(() => {
        structureElement = new StructureElement<unknown>('0');
    });
    let structureElement: StructureElement<unknown>;
    it('Добавление элементов', () => {
        structureElement.add(set1, false);
        expect(structureElement.get(set1.length, 0)).toEqual(new GetResult(set1, '0', false, null));
    });
    it('Произвольное чтение', () => {
        structureElement.add(set1, false);
        expect(structureElement.get(2, 0)).toEqual(new GetResult([set1[0], set1[1]], '0', true, 0));
        expect(structureElement.get(2, 1)).toEqual(new GetResult([set1[2], set1[3]], '0', true, 0));
        expect(structureElement.get(2, 2)).toEqual(new GetResult([set1[4]], '0', false, null));
        expect(structureElement.get(2, 3)).toEqual(new GetResult([], '0', false, null));
    });
    it('Последовательное чтение', () => {
        structureElement.add(set1, false);
        expect(structureElement.getNext(2)).toEqual(new GetResult([set1[0], set1[1]], '0', true, 0));
        expect(structureElement.getNext(2)).toEqual(new GetResult([set1[2], set1[3]], '0', true, 0));
        expect(structureElement.getNext(2)).toEqual(new GetResult([set1[4]], '0', false, null));
        expect(structureElement.getNext(2)).toEqual(new GetResult([], '0', false, null));
    });
    it('Последовательное чтение c удалением', () => {
        structureElement.add(set1, false);
        expect(structureElement.getNext(2, true)).toEqual(new GetResult([set1[0], set1[1]], '0', true, 0));
        expect(structureElement.getNext(2, true)).toEqual(new GetResult([set1[2], set1[3]], '0', true, 0));
        expect(structureElement.getNext(2, true)).toEqual(new GetResult([set1[4]], '0', false, null));
        expect(structureElement.getNext(2, true)).toEqual(new GetResult([], '0', false, null));
        expect(structureElement.get(set1.length, 0)).toEqual(new GetResult([], '0', false, null));
    });

    it('Добавление элементов без пересортировки', () => {
        structureElement.add(set2, false);
        structureElement.add(set3, false);
        expect(structureElement.get(set2.length + set3.length, 0)).toEqual(new GetResult(set2.concat(set3), '0', false, null));
    });
    it('Добавление элементов c пересортировкой в начало', () => {
        structureElement.add(set2, false);
        structureElement.add(set3, true);
        expect(structureElement.get(set2.length + set3.length, 0)).toEqual(new GetResult([set2[0], set2[1], set3[0], set3[1], set2[2], set2[3], set2[4]], '0', false, null));
    });
    it('Добавление элементов c пересортировкой в середину', () => {
        structureElement.add(set2, false);
        structureElement.getNext(2);
        structureElement.getNext(2);
        structureElement.add(set3, true);
        expect(structureElement.get(set2.length + set3.length, 0)).toEqual(new GetResult([set2[0], set2[1], set2[2], set2[3], set3[0], set3[1], set2[4]], '0', false, null));
    });
});