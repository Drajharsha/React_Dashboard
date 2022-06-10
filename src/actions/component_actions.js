// import ReactGA from 'react-ga';
export const OPEN_SIDENAV = "OPEN_SIDENAV";
export const CLOSE_SIDENAV = "CLOSE_SIDENAV";
export const ACTIVATE_NEW_COMPONENT = "ACTIVATE_NEW_COMPONENT";
export const LANDING = "LANDING";
export const SURVEY = "SURVEY";
export const DASHBOARD = "DASHBOARD";
export const HEATMAP = "HEATMAP";
export const LEADERBOARD = "LEADERBOARD";
export const SCATTER = "SCATTER";
export const COMPARE = "COMPARE";
export const STATS = "STATS";
export const REPORTS = "REPORTS";
export const SHARE = "SHARE";
export const QR_CODE = "QR_CODE";
export const DOWNLOAD = "DOWNLOAD";
export const FEEDBACK = "FEEDBACK";

export const openSidenav = () => ({
    type: OPEN_SIDENAV
})

export const activeComponent = component => {
    // let activeComponent = "";
    // switch (component) {
    //     case "":
    //         activeComponent = LANDING;
    //         break
    //     case "survey":
    //         activeComponent = SURVEY;
    //         break
    //     case "dashboard":
    //         activeComponent = DASHBOARD;
    //         break
    //     case "sentiment":
    //         activeComponent = SENTIMENT_ANALYSIS;
    //         break
    //     case "team":
    //         activeComponent = MY_TEAM;
    //         break
    //     case "projects":
    //         activeComponent = MY_PROJECTS;
    //         break
    //     default:
    //         activeComponent = LANDING;
    // }
    // ReactGA.event({
    //     category: "DASHBOARD",
    //     action: `OPEN_${component}`,
    //     label: "UCI"
    // })
    return {
        type: ACTIVATE_NEW_COMPONENT,
        component
    }
}