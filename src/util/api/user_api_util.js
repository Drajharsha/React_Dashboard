import { DEV_PROXY_BOOL, PROXY_URL } from '../../config';
import { axiosInstance } from '../util';

const axiosProxy = axiosInstance(DEV_PROXY_BOOL);

export const newUser = (user, fromSurvey) => {
    const route = `/api/survey/user/new${fromSurvey && "-from-survey"}`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, user, { headers: { clienttoken }});
};

export const login = async (data) => {
    const route = `/api/survey/user/login`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, data, { headers: { clienttoken }});
}

export const findScore = user => {
    const route = `/api/survey/user/fetch-score`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.get(route, { params: { email: user.email, headers: { clienttoken }}});
}

export const saveScore = (user, score) => {
    const route = `/api/survey/user/update-score`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, {user, score}, { headers: { clienttoken }})
}