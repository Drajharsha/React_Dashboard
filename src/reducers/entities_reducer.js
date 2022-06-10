import { combineReducers } from 'redux';
import surveysReducer from './surveys_reducer';
import dashboardReducer from './dashboard_reducer';
import usersReducer from './users_reducer';
import sidenavReducer from './sidenav_reducer';
import componentReducer from './component_reducer';

const entitiesReducer = combineReducers({
    surveys: surveysReducer,
    dashboard: dashboardReducer,
    user: usersReducer,
    sidenav: sidenavReducer,
    activeComponent: componentReducer
})

export default entitiesReducer