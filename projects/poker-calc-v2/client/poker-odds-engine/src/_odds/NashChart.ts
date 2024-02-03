import {INashChart, TNashChartMap, INashElement, TCombsMap} from 'src/_odds/interface';
import {COMBS, SYMILAR} from 'src/_odds/consts';
import {RUNKS, sortRunks} from 'src/deal';

export default class NashChart implements INashChart {
    count: number = 0;
    chart: TNashChartMap = genNashChartMap();
}

class NashElement implements INashElement {
    count: number = 0;
    combs: TCombsMap = genCombsMap();
}

function genNashChartMap(): TNashChartMap {
    const map = {} as TNashChartMap;
    RUNKS.forEach((runk_1) => {
        RUNKS.forEach((runk_2) => {
            SYMILAR.forEach((sym) => {
                const runks = sortRunks([runk_1, runk_2]);
                map[`${runks[1]}${runks[0]}${sym}`] = new NashElement();
            });
        });
    });
    return map;
}

function genCombsMap(): TCombsMap {
    const map = {} as TCombsMap;
    COMBS.forEach((comb) => {
        map[comb] = 0;
    });
    return map;
}