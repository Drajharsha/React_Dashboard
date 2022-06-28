// import { 
//     SURVEY,
//     MY_TEAM,
//     COMPARATIVE_ANALYSIS, 
//     RECCOMENDATIONS,
//     SENTIMENT_ANALYSIS, 
//     ACTIVATE_SURVEY,
//     ACTIVATE_COMPARATIVE_ANALYSIS, 
//     CLOSE_COMPARATIVE_ANALYSIS, 
//     ACTIVATE_SENTIMENT_ANALYSIS, 
//     CLOSE_SENTIMENT_ANALYSIS, 
//     ACTIVATE_RECCOMENDATIONS, 
//     CLOSE_RECCOMENDATIONS, 
//     ACTIVATE_MY_TEAM,
// } from '../actions/dashboard_actions';

import { ACTIVATE_NEW_COMPONENT } from '../actions/component_actions';

const _nullComponent = {
    component: null
};

const componentReducer = (state = _nullComponent, action) => {
    switch (action.type) {
        case ACTIVATE_NEW_COMPONENT:
            return Object.assign({}, state, {
                component: action.component
            })
        default:
            return state
    }
};

export default componentReducer;
