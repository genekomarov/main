import {createStore, combineReducers, Reducer} from 'redux';
import oddsTableReducer from 'rdx/oddsTable/reducer';
import {IState} from 'rdx/oddsTable/state';
import {IPayloadAction} from 'rdx/interface';

export interface IAppState {
    oddsTable: IState;
}

type TRootReducer = Reducer<IAppState, IPayloadAction<unknown>>;

const rootReducer: TRootReducer = combineReducers({
    oddsTable: oddsTableReducer
}) as TRootReducer;

// @ts-ignore 2339
const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ as (() => void) || undefined;

// @ts-ignore
const store = createStore(rootReducer, reduxDevtoolsExtension?.());

export default store;