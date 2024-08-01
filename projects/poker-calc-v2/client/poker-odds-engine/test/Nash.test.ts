import {calcNash} from 'src/oddsUtils';

describe('Nash', () => {
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 1_000,
        });
        
        const dropNashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 1_000,
            prevNash: nashChart
        });

        console.log(dropNashChart);
    });
});