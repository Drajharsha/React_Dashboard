  import axios from 'axios';
import { DEV_PROXY_BOOL, PROXY_URL } from '../../config';
import { axiosInstance } from '../util';

const axiosProxy = axiosInstance(DEV_PROXY_BOOL);

export const getSurvey = surveyName => {
  const route = `/api/survey/client/${surveyName}`;
  const clienttoken = localStorage.token || "";

  console.log("SENDING REQ TO: " + PROXY_URL + route)
  return axiosProxy.get(route, { headers: { clienttoken } })
}

export const submitSurvey = survey => {
  // return axios.post(`/api/pg/survey/new`, survey)
  const route = `/api/survey/client/new`;
  const clienttoken = localStorage.token || "";

  console.log("SENDING REQ TO: " + PROXY_URL + route)
  return axiosProxy.get(route, survey, { headers: { clienttoken } })
}

export const scoreSurvey = async survey => {
  const route = `/api/survey/scoring/score`;
  const clienttoken = localStorage.token || "";

  console.log("SENDING REQ TO: " + PROXY_URL + route)
  return axiosProxy.post(route, survey, { headers: { clienttoken } })
  // return axios.post(`/api/python/score`, survey)
}

export const getVisualsFor = async file => {
  return axios.get(`/api/python/run_python/${file}`);
}