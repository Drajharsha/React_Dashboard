import axios from 'axios';

export const getOrgSurvey = () => {
    return axios.get(`/api/mongo/organizations/test`)
}

export const getMyTeamMembers = website => {
    return axios.post(`/api/pg/organizations/members`, {"website": website})
}

export const submitHelpRequest = helpRequest => {
    return axios.post(`/api/pg/help_requests/new`, helpRequest)
}