import {Reducer} from 'redux';
import defaultState, {IState} from 'state/nashChart/defaultState';
import {TAction, ACTIONS} from 'state/nashChart/actions';

const reducer: Reducer<IState, TAction> = (state = defaultState, action) => {
    switch(action.type) {
        case ACTIONS.UPDATE_CHART:
            return {...state};
        default:
            return {...state};
    }
};

export default reducer;