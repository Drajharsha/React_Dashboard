import { connect } from 'react-redux';
import Sidenav from './sidenav';
import { login, logout, loggingIn } from '../../actions/session_actions'
import { activeComponent, openSidenav } from '../../actions/component_actions';
import { 
    activateDashboard, 
    activateMyTeam, 
    activateMyProjects, 
    activateComparativeAnalysis, 
    activateDashboardSentimentAnalysis, 
    activateReccomendations, 
    activateSurvey, 
    activateNewProject,
    closeDropdown,
    closeSubDropdown, 
} from '../../actions/sidenav_actions';

const mSTP = state => {
    return {
        user: state.session.user,
        isAuthenticated: state.session.isAuthenticated,
        isAuthenticating: state.session.isAuthenticating,
        // component: state.entities.components.activeComponent,
        dashboard: state.entities.dashboard.dashboard,
        sidenav: state.entities.sidenav,
        activeComponent: state.entities.activeComponent.component
    };
};

const mDTP = dispatch => {
    return {
        login: user => dispatch(login(user)),
        logout: () => dispatch(logout()),
        loggingIn: () => dispatch(loggingIn(true)),
        openSidenav: () => dispatch(openSidenav()),
        activateComponent: component => dispatch(activeComponent(component)),
        activateSurvey: () => dispatch(activateSurvey()),
        activateDashboard: () => dispatch(activateDashboard()),
        activateMyTeam: () => dispatch(activateMyTeam()),
        activateMyProjects: () => dispatch(activateMyProjects()),
        activateComparativeAnalysis: () => dispatch(activateComparativeAnalysis()),
        activateDashboardSentimentAnalysis: () => dispatch(activateDashboardSentimentAnalysis()),
        activateReccomendations: () => dispatch(activateReccomendations()),
        activateNewProject: () => dispatch(activateNewProject()),
        closeDropdown: () => dispatch(closeDropdown()),
        closeSubDropdown: () => dispatch(closeSubDropdown()),
    };
};

export default connect(mSTP, mDTP)(Sidenav);
