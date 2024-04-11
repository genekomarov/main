import {calcNash} from 'src/oddsUtils';
import {STRING_TYPE_MODE} from 'src/nash';
// import {NashChart} from 'src/nash';

describe('Nash', () => {
    // it('passNodes', () => {
    //     const chart = new NashChart({});
    //     chart.calc();
    // });
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 10_000,
            threshold: 20
        });
        nashChart.calc();
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.KEY
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.DROP_PROB
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.WIN_PROB
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.WIN_PROB,
            useThreshold: true
        }));
        // console.log(nashChart.toString());
    });
});