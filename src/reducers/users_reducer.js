import { SET_SCORE, SET_ANALYSIS_SCORE } from '../actions/user_actions';

const _nullUser = {
    score: null,
};

const usersReducer = (state = _nullUser, action) => {
    console.log(action);
    switch (action.type) {
        case SET_SCORE:
            // debugger
            return {...state, 
                score: action.score,
            }

        case SET_ANALYSIS_SCORE:
            return {...state, score: action.score}

        default:
            return state;
    }
};

export default usersReducer;
