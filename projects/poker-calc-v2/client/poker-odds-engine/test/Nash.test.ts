import {calcNash} from 'src/oddsUtils';

describe('Nash', () => {
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 1_000,
            threshold: 20
        });
        nashChart.calc();
        
        const dropNashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 1_000,
            threshold: 20,
            referenceNash: nashChart
        });
        dropNashChart.calc();
    });
});