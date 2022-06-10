import axios from 'axios';

export const sendMsg = (data) => {
    return axios.post(`/api/sms/send`, data, { timeout: 60000})
};

export const waitForResponse = (identifier) => {
    return axios.post(`/api/sms/receive`, identifier)
};