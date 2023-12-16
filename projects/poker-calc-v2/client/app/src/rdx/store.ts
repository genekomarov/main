import {createStore, combineReducers, Reducer} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import oddsTableReducer from 'rdx/oddsTable/reducer';
import {IState} from 'rdx/oddsTable/state';
import {IPayloadAction} from 'rdx/interface';

interface IAppState {
    oddsTable: IState;
}

type TRootReducer = Reducer<IAppState, IPayloadAction<unknown>>;

const rootReducer: TRootReducer = combineReducers({
    oddsTable: oddsTableReducer
}) as TRootReducer;

const store = createStore(rootReducer, composeWithDevTools());
export default store;