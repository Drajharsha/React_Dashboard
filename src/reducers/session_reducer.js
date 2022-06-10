import {
    RECEIVE_CURRENT_USER,
    RECEIVE_USER_LOGOUT,
    RECEIVE_USER_SIGN_IN,
    RECEIVING_USER_LOGIN,
    RESETTING_PASSWORD,
    AWAITING_RESET_TOKEN,
    AWAITING_NEW_PASSWORD,
    PASSWORD_RESET_SUCCESS
} from '../actions/session_actions';

const initialState = {
    isAuthenticated: false,
    user: false,
    isAuthenticating: false
};

const  sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !!action.currentUser,
                user: action.currentUser
            };
        case RECEIVE_USER_LOGOUT:
            return {
                isAuthenticated: false,
                user: undefined
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                isSignedIn: true
            }
        case RECEIVING_USER_LOGIN:
            return {
                ...state,
                isAuthenticating: action.boolean
            }
        case RESETTING_PASSWORD:
            return {
                ...state,
                requestingPwReset: action.boolean
            }
        case AWAITING_RESET_TOKEN:
            return {
                ...state,
                awaitingResetToken: action.boolean
            }
        case AWAITING_NEW_PASSWORD:
            return {
                ...state,
                awaitingNewPassword: action.boolean
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                passwordReset: action.boolean
            }
        default:
            return state;
    }
}

export default sessionReducer;
