import {Action} from 'redux';

/** Интерфейс экшена с добавленным полем payload */
export interface IPayloadAction<Payload, TAction extends string = string> extends Action<TAction> {
    payload: Payload;
}