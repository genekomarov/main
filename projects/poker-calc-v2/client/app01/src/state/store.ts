import {createStore, Reducer, combineReducers} from 'redux';
import { IPayloadAction } from './interface';
import {IState as INashChartState} from 'state/nashChart/defaultState';
import nashChartReducer from 'state/nashChart/reducer';

export interface IAppState {
    nashChart: INashChartState
}

type TRootReducer = Reducer<IAppState, IPayloadAction<unknown>>;

const rootReducer: TRootReducer = combineReducers({
    nashChart: nashChartReducer
}) as TRootReducer;

// @ts-ignore 2339
const reduxDevtoolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ as (() => void) || undefined;


// @ts-ignore
const store = createStore(rootReducer, reduxDevtoolsExtension?.());

export default store;