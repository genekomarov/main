import 'jest';
import BaseSource from '../src/BaseSource';
import BulkOperationsUnit from '../src/BulkOperationsUnit';

// const set1 = [];

describe('CheckEngine/CheckSource/BaseSource', () => {
    describe('Один источник', () => {
        beforeEach(() => {
            firstUnit = new BulkOperationsUnit();
            baseSource = new BaseSource<unknown>([firstUnit]);
        });
        let firstUnit: BulkOperationsUnit<unknown>;
        let baseSource: BaseSource<unknown>;
    
        it('test', () => {
            // firstUnit.addBulk(set1, true);
        });
    });
});