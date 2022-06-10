import axios from 'axios';
import { DEV_PROXY_BOOL, PROXY_URL } from '../../config';
import { axiosInstance } from '../util';

const axiosProxy = axiosInstance(DEV_PROXY_BOOL);

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const login = (userData) => {
    // return axios.post('/api/pg/user/login', userData);
    const route = `/api/survey/user/login`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, userData, { headers: { clienttoken } })
};

export const userCheck = async email => {
    // return axios.get(`/api/pg/user/check/${email}`)
    const route = `/api/survey/user/check/${email}`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.get(route, { headers: { clienttoken } })
}

export const authenticate = (authData) => {
    // return axios.post('/api/pg/user/authenticate', authData)
    const route = `/api/survey/user/authenticate`;
    const clienttoken = localStorage.token || "";

    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, authData, { headers: { clienttoken } })
}

export const requestPwReset = email => {
    const route = `/api/survey/user/send-reset-pw-email`
    console.log("SENDING REQ TO: " + PROXY_URL + route)
    return axiosProxy.post(route, {email})
}

export const verifyResetToken = obj => {
    const route = `/api/survey/user/check-reset-token`
    console.log("SENDING REQ TO: " + PROXY_URL + route)
    console.log(obj)
    return axiosProxy.post(route, obj)
}

export const resetPassword = obj => {
    const route = `/api/survey/user/change-password`
    console.log("SENDING REQ TO: " + PROXY_URL + route)
    console.log(obj)
    return axiosProxy.post(route, obj)

}