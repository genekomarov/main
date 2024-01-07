import 'jest';
import BaseSource from '../src/BaseSource';
import BulkOperationsUnit from '../src/BulkOperationsUnit';

describe('CheckEngine/CheckSource/BaseSource', () => {
    beforeEach(() => {
        firstUnit = new BulkOperationsUnit();
        secondUnit = new BulkOperationsUnit();
        baseSource = new BaseSource<unknown>([firstUnit, secondUnit]);
    });
    let firstUnit: BulkOperationsUnit<unknown>;
    let secondUnit: BulkOperationsUnit<unknown>;
    let baseSource: BaseSource<unknown>;

    it('test', () => {
        return;
    });
});