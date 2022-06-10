import { connect } from 'react-redux';
import { requestPwReset, resetPassword, resettingPassword, verifyResetToken } from '../../actions/session_actions';
import ResetPassword from './reset_password';

const mSTP = state => {
    return {
        awaitingResetToken: state.session.awaitingResetToken,
        awaitingNewPassword: state.session.awaitingNewPassword
    };
};

const mDTP = dispatch => {
    return {
        requestPwReset: email => dispatch(requestPwReset(email)),
        resettingPassword: boolean => dispatch(resettingPassword(boolean)),
        verifyResetToken: obj => dispatch(verifyResetToken(obj)),
        resetPassword: obj => dispatch(resetPassword(obj))
    };
};

export default connect(mSTP, mDTP)(ResetPassword);
