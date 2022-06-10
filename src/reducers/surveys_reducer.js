import { RECEIVE_SURVEY, SURVEY_SUCCESS, SURVEY_SCORE } from '../actions/survey_actions';

const _nullSurvey = {
    survey: null,
    helpRequest: null,
    takenSurveyId: null,
    score: null
};

const surveysReducer = (state = _nullSurvey, action) => {
    switch (action.type) {
        case RECEIVE_SURVEY:
            return Object.assign({}, state, {
                survey: action.survey.data
            })
        case SURVEY_SUCCESS:
            return Object.assign({}, state, {
                takenSurveyId: action.takenSurveyId
            })
        case SURVEY_SCORE:
            return Object.assign({}, state, {
                score: action.score 
            })
        default:
            return state;
    }
};

export default surveysReducer;
