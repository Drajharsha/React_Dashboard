import { connect } from 'react-redux';
import Survey from './survey';
import { newUser, userScore } from '../../actions/user_actions';
import { getSurvey, scoreSurvey, submitSurvey } from '../../actions/survey_actions';
import { login, userCheck, authenticate, loggingIn, logout } from '../../actions/session_actions';

const mSTP = state => {
    return {
        surveys: state.entities.surveys,
        dashboard: state.entities.dashboard,
        loggedIn: state.session.isAuthenticated,
        user: state.session.user,
        takenSurveyId: state.entities.surveys.takenSurveyId,
        score: state.entities.surveys.score,
        currentScore: state.entities.surveys.score,
        archivalScore: state.entities.user.score,
        loggingIn: state.session.isAuthenticating
    };
};

const mDTP = dispatch => {
    return {
        newUser: (data) => newUser(data, true),
        login: (user) => dispatch(login(user)),
        getSurvey: surveyName => dispatch(getSurvey(surveyName)),
        submitSurvey: survey => dispatch(submitSurvey(survey)),
        userCheck: email => userCheck(email),
        authenticate: (authData) => dispatch(authenticate(authData)),
        scoreSurvey: survey => dispatch(scoreSurvey(survey)),
        findScore: email => dispatch(userScore(email)),
        loggingInState: (boolean) => dispatch(loggingIn(boolean)),
        logout: () => dispatch(logout())
    };
};

export default connect(mSTP, mDTP)(Survey);
