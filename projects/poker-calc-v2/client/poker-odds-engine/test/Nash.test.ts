import {calcNash} from 'src/oddsUtils';
import {STRING_TYPE_MODE, INashChart} from 'src/nash';

describe('Nash', () => {
    it('calcNash', () => {
        const nashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 100_000,
            threshold: 20
        });
        nashChart.calc();

        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.KEY
        }));
        console.log(nashChart.toString({
            mode: STRING_TYPE_MODE.DROP_PROB
        }));

        print(nashChart);
        
        const dropNashChart = calcNash({
            tableCards: [],
            playerCount: 5,
            iterCount: 100_000,
            threshold: 20,
            referenceNash: nashChart
        });
        dropNashChart.calc();
        print(dropNashChart);
    });
});

function print(nashChart: INashChart): void {
    console.log(nashChart.toString({
        mode: STRING_TYPE_MODE.WIN_PROB
    }));
    console.log(nashChart.toString({
        mode: STRING_TYPE_MODE.WIN_PROB,
        useThreshold: true
    }));
    console.log(nashChart.getMeta());
}