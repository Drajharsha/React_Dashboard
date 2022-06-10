import { 
    SURVEY,
    MY_TEAM,
    COMPARATIVE_ANALYSIS, 
    RECCOMENDATIONS,
    SENTIMENT_ANALYSIS, 

    ACTIVATE_SURVEY,
    ACTIVATE_COMPARATIVE_ANALYSIS, 
    CLOSE_COMPARATIVE_ANALYSIS, 
    ACTIVATE_SENTIMENT_ANALYSIS, 
    CLOSE_SENTIMENT_ANALYSIS, 
    ACTIVATE_RECCOMENDATIONS, 
    CLOSE_RECCOMENDATIONS, 
    ACTIVATE_MY_TEAM,
} from '../actions/dashboard_actions';

const _nullDashboard = {
    dashboard: null
};

const dashboardReducer = (state = _nullDashboard, action) => {
    switch (action.type) {
        case ACTIVATE_COMPARATIVE_ANALYSIS:
            return Object.assign({}, state, {
                dashboard: COMPARATIVE_ANALYSIS
            })
        case CLOSE_COMPARATIVE_ANALYSIS:
            return _nullDashboard
        case ACTIVATE_SENTIMENT_ANALYSIS:
            return {
                dashboard: SENTIMENT_ANALYSIS
            };
        case CLOSE_SENTIMENT_ANALYSIS:
            return _nullDashboard
        case ACTIVATE_RECCOMENDATIONS:
            return {
                dashboard: RECCOMENDATIONS
            };
        case CLOSE_RECCOMENDATIONS:
            return _nullDashboard
        case ACTIVATE_MY_TEAM:
            return Object.assign({}, state, {
                dashboard: MY_TEAM
            })
        case ACTIVATE_SURVEY:
            return Object.assign({}, state, {
                dashboard: SURVEY
            })
        default:
            return state;
    }
};

export default dashboardReducer;
