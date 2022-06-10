import { getVisualsFor } from "../util/api/survey_api_util";

export const COMPARATIVE_ANALYSIS = "COMPARATIVE_ANALYSIS";
export const SENTIMENT_ANALYSIS = "SENTIMENT_ANALYSIS";
export const RECCOMENDATIONS = "RECCOMENDATIONS";
export const MY_TEAM = "MY_TEAM";
export const SURVEY = "SURVEY";

export const ACTIVATE_COMPARATIVE_ANALYSIS = "ACTIVATE_COMPARATIVE_ANALYSIS";
export const CLOSE_COMPARATIVE_ANALYSIS = "CLOSE_COMPARATIVE_ANALYSIS";
export const ACTIVATE_SENTIMENT_ANALYSIS = "ACTIVATE_SENTIMENT_ANALYSIS";
export const CLOSE_SENTIMENT_ANALYSIS = "CLOSE_SENTIMENT_ANALYSIS";
export const ACTIVATE_RECCOMENDATIONS = "ACTIVATE_RECCOMENDATIONS";
export const CLOSE_RECCOMENDATIONS = "CLOSE_RECCOMENDATIONS";
export const ACTIVATE_MY_TEAM = "ACTIVATE_MY_TEAM";
export const ACTIVATE_SURVEY = "ACTIVATE_SURVEY";

export const activateComparativeAnalysis = () => ({
    type: ACTIVATE_COMPARATIVE_ANALYSIS
})

export const closeComparativeAnalysis = () => ({
    type: CLOSE_COMPARATIVE_ANALYSIS
})

export const activateSentimentAnalysis = () => ({
    type: ACTIVATE_SENTIMENT_ANALYSIS
})

export const closeSentimentAnalysis = () => ({
    type: CLOSE_SENTIMENT_ANALYSIS
})

export const activateReccomendations = () => ({
    type: ACTIVATE_RECCOMENDATIONS
})

export const closeReccomendations = () => ({
    type: CLOSE_RECCOMENDATIONS
})

export const activateMyTeam = () => ({
    type: ACTIVATE_MY_TEAM
})

export const activateSurvey = () => ({
    type: ACTIVATE_SURVEY
})

export const getVisuals = async file => {
    return new Promise ((res, rej) => {
        getVisualsFor(file)
            .then(data => {
                res(data)
            })
            .catch(err => rej(err))
    })
}