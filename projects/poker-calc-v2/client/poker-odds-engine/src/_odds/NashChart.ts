import {
    INashChart,
    TNashChartMap,
    TCombsMap,
    INashElement,
    ICombElement
} from 'src/_odds/interface/INashChart';
import {IWinCombResult, THand} from 'src/_odds/interface/ICalcNash';
import {COMBS, SYMILAR, TNashKey, TSymilar, TComb} from 'src/_odds/consts';
import {RUNKS, sortRunks, RUNK, TRunk} from 'src/deal';

export default class NashChart implements INashChart {
    count: number = 0;
    chart: TNashChartMap = genNashChartMap();
    
    up(winComb: IWinCombResult): void {
        const {hand, comb} = winComb;
        const key: TNashKey = handToKey(hand);
        this.count ++;
        this.chart[key].count ++;
        if (comb) {
            this.chart[key].combs[comb].count ++;
        }
    }

    updatePercents(): void {
        for (const key in this.chart) {
            if (!this.chart.hasOwnProperty(key)) {
                continue;
            }
            const _key: TNashKey = key as TNashKey;
            const chartElement: INashElement = this.chart[_key];
            chartElement.percent = chartElement.count / this.count;
            for (const combKey in chartElement.combs) {
                if (!chartElement.combs.hasOwnProperty(key)) {
                    continue;
                }
                const _combKey: TComb = combKey as TComb;
                const combElement: ICombElement = chartElement.combs[_combKey];
                combElement.percent = combElement.count / this.count;
            }
        }
    }

    toString(printKey?: boolean): string {
        const reversedRunks = [...RUNKS].reverse();
        const rowArray: string[] = [];
        reversedRunks.forEach((row) => {
            const columnArray: string[] = [];
            reversedRunks.forEach((column) => {
                const key: TNashKey = getNashKey(row, column);
                if (printKey) {
                    // FIXME
                    const replacedKey = key.replace('10', 'T').replace('10', 'T');
                    columnArray.push(replacedKey);
                } else {
                    const value: number = this.chart[key].percent * 100;
                    let fixedValue = value.toFixed(0);
                    if (fixedValue === '100') {
                        fixedValue = '99';
                    }
                    const stringValue = `${new Array(2 - fixedValue.length).fill(' ').join('')}${fixedValue}`;
                    columnArray.push(stringValue);
                }
                
            });
            rowArray.push(columnArray.join(' '));
        });
        return rowArray.join('\n');
    }
}

function genNashChartMap(): TNashChartMap {
    const map: TNashChartMap = {} as TNashChartMap;
    RUNKS.forEach((runk_1) => {
        RUNKS.forEach((runk_2) => {
            const key: TNashKey = getNashKey(runk_1, runk_2);
            const combs: TCombsMap = {} as TCombsMap;
            COMBS.forEach((comb) => {
                combs[comb] = {
                    count: 0,
                    percent: 0
                };
            });
            map[key] = {
                count: 0,
                percent: 0,
                combs
            };
        });
    });
    return map;
}

function handToKey(hand: THand): TNashKey {
    const sym: TSymilar = hand[0].suit === hand[1].suit ? 'o' : 's';
    const runks = sortRunks([hand[0].runk, hand[1].runk]);
    return `${runks[1]}${runks[0]}${sym}`;
}

function getNashKey(runk_1: TRunk, runk_2: TRunk): TNashKey {
    return RUNK[runk_1] > RUNK[runk_2]
        ? `${runk_1}${runk_2}${SYMILAR[0]}`
        : `${runk_2}${runk_1}${SYMILAR[1]}`;
}