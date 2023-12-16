import {Reducer} from 'redux';
import defaultState, {IState} from 'rdx/oddsTable/state';
import {TAction} from 'rdx/oddsTable/actions';

const reducer: Reducer<IState, TAction> = (state = defaultState, action) => {
    switch (action.type) {
        case 'TEST1':
            return {...state, some: state.some + action.payload};
        default:
            return state;
    }
};

export default reducer;