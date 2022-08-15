import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../util/route_util';
import DashboardContainer from './dashboard/dashboard_container';
import LoginPopupContainer from './login/login_popup_container';
import SurveyContainer from './survey/survey_container';
import { IntercomProvider } from 'react-use-intercom';
import Dashboard from './dashboard_new/Dashboard';


const App = () => {
    console.log("getting called");
    return (
        <IntercomProvider appId="wfrwqepf">
            <Switch>
                <Route exact path="/"><SurveyContainer /></Route>
                <Route exact path="/login" props={{test: "test"}}><LoginPopupContainer /></Route>
                {/* <Route exact path="/dashboard"><DashboardContainer /></Route> */}
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
        </IntercomProvider>
    )
}

export default App;