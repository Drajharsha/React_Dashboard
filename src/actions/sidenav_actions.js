export const SURVEY = "SURVEY";
export const DASHBOARD = "DASHBOARD";
export const HEATMAP = "HEATMAP";
export const MY_TEAM = "MY_TEAM";
export const MY_PROJECTS = "MY_PROJECTS";
export const ACTIVATE_SURVEY = "ACTIVATE_SURVEY";
export const ACTIVATE_DASHBOARD = "ACTIVATE_DASHBOARD";
export const ACTIVATE_SENTIMENT_ANALYSIS = "ACTIVATE_SENTIMENT_ANALYSIS";
export const ACTIVATE_MY_TEAM = "ACTIVATE_MY_TEAM";
export const ACTIVATE_MY_PROJECTS = "ACTIVATE_MY_PROJECTS";
export const COMPARATIVE_ANALYSIS = "COMPARATIVE_ANALYSIS";
export const DASHBOARD_SENTIMENT_ANALYSIS = "DASHBOARD_SENTIMENT_ANALYSIS";
export const RECCOMENDATIONS = "RECCOMENDATIONS";
export const ACTIVATE_COMPARATIVE_ANALYSIS = "ACTIVATE_COMPARATIVE_ANALYSIS";
export const ACTIVATE_DASHBOARD_SENTIMENT_ANALYSIS = "ACTIVATE_DASHBOARD_SENTIMENT_ANALYSIS";
export const ACTIVATE_RECCOMENDATIONS = "ACTIVATE_RECCOMENDATIONS";
export const CLOSE_DROPDOWN = "CLOSE_DROPDOWN";
export const CLOSE_SUB_DROPDOWN = "CLOSE_SUB_DROPDOWN";
export const NEW_PROJECT = "NEW_PROJECT"

export const activateSurvey = () => ({
    type: ACTIVATE_SURVEY
})

export const activateDashboard = () => ({
    type: ACTIVATE_DASHBOARD
})

export const activateMyTeam = () => ({
    type: ACTIVATE_MY_TEAM
})

export const activateMyProjects = () => ({
    type: ACTIVATE_MY_PROJECTS
})

export const activateComparativeAnalysis = () => ({
    type: ACTIVATE_COMPARATIVE_ANALYSIS
})

export const activateDashboardSentimentAnalysis = () => ({
    type: ACTIVATE_DASHBOARD_SENTIMENT_ANALYSIS
})

export const activateReccomendations = () => ({
    type: ACTIVATE_RECCOMENDATIONS
})

export const closeDropdown = () => ({
    type: CLOSE_DROPDOWN
})

export const closeSubDropdown = () => ({
    type: CLOSE_SUB_DROPDOWN
})

export const activateNewProject = () => ({
    type: NEW_PROJECT
})