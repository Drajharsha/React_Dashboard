import { connect } from 'react-redux';
import UserProfile from './user_profile';
import UserProfileNew from './user_profile_new';
import { authenticate, login, logout, loggingIn } from '../../actions/session_actions';


const mSTP = state => {
    return {
        user: state.session.user,
        isAuthenticated: state.session.isAuthenticated,
        isAuthenticating: state.session.isAuthenticating
    };
};

const mDTP = dispatch => {
    return {
        authenticate: (authData) => dispatch(authenticate(authData)),
        login: user => dispatch(login(user)),
        logout: () => dispatch(logout()),
        loggingIn: () => dispatch(loggingIn(true))
    };
};

export default connect(mSTP, mDTP)(UserProfileNew);
