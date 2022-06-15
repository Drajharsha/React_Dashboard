import { SET_SCORE } from '../actions/user_actions';

const _nullUser = {
    score: null,
    isLoaed: false,
};

const usersReducer = (state = _nullUser, action) => {
    switch (action.type) {
        case SET_SCORE:
            // debugger
            return {...state, 
                score: action.score,
                isLoaed: true,
            }
        
        case 'UPDATE_SCORE':
            return {...state, isLoaed: false}

        default:
            return state;
    }
};

export default usersReducer;
