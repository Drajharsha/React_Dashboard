import { DASHBOARD, CLOSE_SUB_DROPDOWN, CLOSE_DROPDOWN, ACTIVATE_COMPARATIVE_ANALYSIS, ACTIVATE_DASHBOARD_SENTIMENT_ANALYSIS, ACTIVATE_RECCOMENDATIONS, COMPARATIVE_ANALYSIS, DASHBOARD_SENTIMENT_ANALYSIS, RECCOMENDATIONS, ACTIVATE_DASHBOARD, ACTIVATE_SURVEY, NEW_PROJECT } from "../actions/sidenav_actions";

const _nullSidenav = {
}

const sidenavReducer = (state=_nullSidenav, action) => {
    switch (action.type) {
    case ACTIVATE_SURVEY:
        return Object.assign({}, state, {
            dropDown: false,
            subDropDown: false
        });
    case ACTIVATE_DASHBOARD:
        return Object.assign({}, state, {
            dropDown: DASHBOARD,
            subDropDown: false
        });
    case CLOSE_DROPDOWN:
        return Object.assign({}, state, {
            dropDown: false,
            subDropDown: false
        });
    case CLOSE_SUB_DROPDOWN:
        return Object.assign({}, state, {
            // dropDown: state.dropDown,
            dropDown: state.dropDown,
            subDropDown: false
        });
    case ACTIVATE_COMPARATIVE_ANALYSIS:
        return Object.assign({}, state, {
            dropDown: state.dropDown,
            subDropDown: COMPARATIVE_ANALYSIS,
        });
    case ACTIVATE_DASHBOARD_SENTIMENT_ANALYSIS:
        return Object.assign({}, state, {
            dropDown: state.dropDown,
            subDropDown: DASHBOARD_SENTIMENT_ANALYSIS,
        });
    case ACTIVATE_RECCOMENDATIONS:
        return Object.assign({}, state, {
            dropDown: state.dropDown,
            subDropDown: RECCOMENDATIONS,
        });
    case NEW_PROJECT:
        return Object.assign({}, state, {
            dropDown: state.dropDown,
            subDropDown: NEW_PROJECT
        })
    default:
        return state;
    }
}

export default sidenavReducer;