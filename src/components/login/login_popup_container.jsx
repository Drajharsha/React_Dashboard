import { connect } from 'react-redux';
import { login, logout, loggingIn, requestPwReset, resettingPassword } from '../../actions/session_actions';
import LoginPopup from './login_popup';

const mSTP = state => {
    return {
        isLoggedIn: state.session.isAuthenticated,
        isLoggingIn: state.session.isAuthenticating,
        user: state.session.user,
        requestingPwReset: state.session.requestingPwReset,
        passwordReset: state.session.passwordReset
    };
};

const mDTP = dispatch => {
    return {
        login: user => dispatch(login(user)),
        logout: user => dispatch(logout()),
        loggingIn: (boolean) => dispatch(loggingIn(boolean)),
        resettingPassword: boolean => dispatch(resettingPassword(boolean)),
        requestPwReset: email => dispatch(requestPwReset(email))
    };
};

export default connect(mSTP, mDTP)(LoginPopup);
