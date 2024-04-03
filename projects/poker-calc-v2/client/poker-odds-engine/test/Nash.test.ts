import {calcNash} from 'src/_odds/utils/nash';

describe('Nash', () => {
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 10_000
        });
        console.log(nashChart.toString());
    });
});