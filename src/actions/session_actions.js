import * as APIUtil from '../util/api/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVING_USER_LOGIN = "RECEIVING_USER_LOGIN";
export const RESETTING_PASSWORD = "RESETTING_PASSWORD";
export const AWAITING_RESET_TOKEN = "AWAITING_RESET_TOKEN";
export const AWAITING_NEW_PASSWORD = "AWAITING_NEW_PASSWORD";
export const PASSWORD_RESET_SUCCESS = "PASSWORD_RESET_SUCCESS";

// We'll dispatch this when our user signs in
export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

// This will be used to redirect the user to the login page upon signup
export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

// We dispatch this one to show authentication errors on the frontend
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const loggingIn = (boolean) => ({
    type: RECEIVING_USER_LOGIN,
    boolean
})

export const resettingPassword = (boolean) => ({
    type: RESETTING_PASSWORD,
    boolean
})

export const awaitingResetToken = (boolean) => ({
    type: AWAITING_RESET_TOKEN,
    boolean
})

export const awaitingNewPassword = (boolean) => ({
    type: AWAITING_NEW_PASSWORD,
    boolean
})

export const passwordReset = (boolean) => ({
    type: PASSWORD_RESET_SUCCESS,
    boolean
})

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = user => dispatch => {
    return APIUtil.login(user)
    .then(res => {
            console.log(user)
            const token = res.data.user.session_token;
            localStorage.setItem('authentication', JSON.stringify({
                authToken: token,
                email: user.email || false,
                phone: user.phone || false,
            }));
            APIUtil.setAuthToken(token);
            dispatch(receiveCurrentUser(res.data.user))
            return true
        })
    .catch(err => {
        console.log(err);
        return false
    })
}

export const authenticate = authData => dispatch => {
    APIUtil.authenticate(authData)
    .then(res => {
        const token = res.data.user.session_token;
        let newAuth = JSON.parse(localStorage.authentication);
        newAuth["authToken"] = token;
        localStorage.setItem('authentication', JSON.stringify(newAuth))
        APIUtil.setAuthToken(token);
        dispatch(receiveCurrentUser(res.data.user))
        return true
    })
    .catch(err => {
            console.log(err);
            return false
        })
}

export const userCheck = email => {
    return APIUtil.userCheck(email)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export const logout = () => dispatch => {
    localStorage.removeItem('authentication')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

export const requestPwReset = email => dispatch => {
    APIUtil.requestPwReset(email)
        .then(() => dispatch(awaitingResetToken(true)))
        .catch(err => console.log(err))
}

export const verifyResetToken = obj => dispatch => {
    APIUtil.verifyResetToken(obj)
        .then(() => dispatch(awaitingNewPassword(true)))
        .catch(err => console.log(err))
}

export const resetPassword = obj => dispatch => {
    APIUtil.resetPassword(obj)
        .then(() => dispatch(passwordReset(true)))
        .catch(err => console.log(err))
}