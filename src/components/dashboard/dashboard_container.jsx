import { connect } from 'react-redux';
import Dashboard from './dashboard';
import { authenticate } from '../../actions/session_actions';
import { activateComparativeAnalysis, closeComparativeAnalysis, activateSentimentAnalysis, closeSentimentAnalysis, activateReccomendations, closeReccomendations } from '../../actions/dashboard_actions';
import { userScore } from '../../actions/user_actions';
import { activeComponent } from '../../actions/component_actions';

const mSTP = state => {
    return {
        user: state.session.user,
        sidenav: state.entities.sidenav,
        currentScore: state.entities.surveys.score,
        archivalScore: state.entities.user.score,
        activeComponent: state.entities.activeComponent.component
    };
};

const mDTP = dispatch => {
    return {
        authenticate: (authData) => dispatch(authenticate(authData)),
        activateComponent: component => dispatch(activeComponent(component)),
        activateComparativeAnalysis: () => dispatch(activateComparativeAnalysis()),
        closeComparativeAnalysis: () => dispatch(closeComparativeAnalysis()),
        activateSentimentAnalysis: () => dispatch(activateSentimentAnalysis()),
        closeSentimentAnalysis: () => dispatch(closeSentimentAnalysis()),
        activateReccomendations: () => dispatch(activateReccomendations()),
        closeReccomendations: () => dispatch(closeReccomendations()),
        findScore: email => dispatch(userScore(email)),
    };
};

export default connect(mSTP, mDTP)(Dashboard);
