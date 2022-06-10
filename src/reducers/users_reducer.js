import { SET_SCORE } from '../actions/user_actions';

const _nullUser = {
    score: null,
};

const usersReducer = (state = _nullUser, action) => {
    switch (action.type) {
        case SET_SCORE:
            // debugger
            return Object.assign({}, state, {
                score: action.score
            })
        default:
            return state;
    }
};

export default usersReducer;
