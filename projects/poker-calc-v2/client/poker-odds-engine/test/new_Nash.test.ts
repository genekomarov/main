import NashChart from 'src/_new_odds/NashChart';

describe('Nash', () => {
    it('toArary', () => {
        const nashChart = new NashChart();
        console.log(nashChart.toArray(true));
    });

    it('toString, printKey', () => {
        const nashChart = new NashChart();
        console.log(nashChart.toString(true));
    });

    it('toString', () => {
        const nashChart = new NashChart();
        console.log(nashChart.toString());
    });
});