import * as APIUtil from "../util/api/survey_api_util";
// import { saveScore } from '../util/api/user_api_util';

export const RECEIVE_SURVEY = "RECEIVE_SURVEY";
export const SURVEY_SUCCESS = "SURVEY_SUCCESS";
export const SURVEY_SCORE = "SURVEY_SCORE";

export const surveySuccess = (takenSurveyId) => ({
  type: SURVEY_SUCCESS,
  takenSurveyId
})

export const receiveSurvey = (survey) => ({
  type: RECEIVE_SURVEY,
  survey
});

export const setSurveyScore = score => ({
  type: SURVEY_SCORE,
  score
})

export const getSurvey = (surveyName) => dispatch => {
  APIUtil.getSurvey(surveyName)
    .then((survey) => {
      // console.log(survey.data)
      if (survey.data) {
        dispatch(receiveSurvey(survey))
        localStorage.setItem("survey", JSON.stringify(survey.data.questions || survey.data.survey));
      }
    })
    .catch((err) => console.log(err));
};

export const scoreSurvey = survey => async dispatch => {
  return await APIUtil.scoreSurvey(survey)
  .then(res => {
    // let score = Math.ceil(res.data)
    let score = res.data;
    dispatch(setSurveyScore(score))
    return score;
  })
  .catch(err => console.log(err))
}

export const submitSurvey = survey => dispatch => {
  APIUtil.submitSurvey(survey)
    .then(res => {
      // console.log(res)
      // dispatch(scoreSurvey(survey))
      dispatch(surveySuccess(res.data))
    })
    .catch(err => console.log(err))
}