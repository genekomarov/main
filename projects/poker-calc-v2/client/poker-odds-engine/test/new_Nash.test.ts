// import NashChart from 'src/_new_odds/NashChart';
import {calcNash} from 'src/_new_odds/utils/nash';

describe('Nash', () => {
    // it('toArary', () => {
    //     const nashChart = new NashChart();
    //     console.log(nashChart.toArray(true));
    // });

    // it('toString, printKey', () => {
    //     const nashChart = new NashChart();
    //     console.log(nashChart.toString(true));
    // });

    // it('toString', () => {
    //     const nashChart = new NashChart();
    //     console.log(nashChart.toString());
    // });

    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 10_000
        });
        console.log(nashChart.toString());
    });
});