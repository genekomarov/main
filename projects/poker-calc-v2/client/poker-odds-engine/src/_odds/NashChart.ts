import {
    INashChart,
    TNashChartMap,
    INashElement,
    TCombsMap,
    IWinCombResult,
    THand
} from 'src/_odds/interface';
import {COMBS, SYMILAR, TNashKey, TSymilar} from 'src/_odds/consts';
import {RUNKS, sortRunks} from 'src/deal';

export default class NashChart implements INashChart {
    count: number = 0;
    chart: TNashChartMap = genNashChartMap();
    
    up(winComb: IWinCombResult): void {
        const {hand, comb} = winComb;
        const nashKey: TNashKey = handToKey(hand);
        this.count ++;
        const nashElement: INashElement = this.chart[nashKey];
        nashElement.count ++;
        nashElement.combs[comb] ++;
    }

    getPercent(): void {
        
    }
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

function handToKey(hand: THand): TNashKey {
    const sym: TSymilar = hand[0].suit === hand[1].suit ? 'o' : 'p';
    const runks = sortRunks([hand[0].runk, hand[1].runk]);
    return `${runks[1]}${runks[0]}${sym}`;
}