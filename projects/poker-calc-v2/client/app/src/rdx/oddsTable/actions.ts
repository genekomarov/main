import {IPayloadAction} from 'rdx/interface';

enum ACTIONS {
    TEST1 = 'TEST1',
    TEST2 = 'TEST2'
}

type TTestAction1 = IPayloadAction<number, ACTIONS.TEST1>;
type TTestAction2 = IPayloadAction<number, ACTIONS.TEST2>;

export type TAction = TTestAction1 | TTestAction2;

export const test1Action = (payload: number): TTestAction1 => {
    return {type: ACTIONS.TEST1, payload};
};

export const test2Action = (payload: number): TTestAction2 => {
    return {type: ACTIONS.TEST2, payload};
};
