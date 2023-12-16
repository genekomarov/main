import {Action} from 'redux';

export interface IPayloadAction<Payload, TAction extends string = string> extends Action<TAction> {
    payload: Payload;
}
