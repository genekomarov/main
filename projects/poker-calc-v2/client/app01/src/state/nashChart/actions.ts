import {IPayloadAction} from 'state/interface';

export enum ACTIONS {
    UPDATE_CHART = 'UPDATE_CHART'
}

type TUpdateChartAction = IPayloadAction<any, ACTIONS.UPDATE_CHART>;

export type TAction = TUpdateChartAction;

export const updateChartAction = (payload: any): TUpdateChartAction => {
    return {type: ACTIONS.UPDATE_CHART, payload};
};
