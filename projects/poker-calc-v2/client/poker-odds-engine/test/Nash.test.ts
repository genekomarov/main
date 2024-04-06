import {calcNash} from 'src/oddsUtils';
import {STRING_TYPE_MODE} from 'src/nash';

describe('Nash', () => {
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 10_000,
            threshold: 20
        });
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.KEY
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.ODD
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.ODD,
            useThreshold: true
        }));
        // console.log(nashChart.toString());
    });
});