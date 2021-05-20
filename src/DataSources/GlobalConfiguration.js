import axios from 'axios';

const GlobalConfiguration = () => {
    axios.defaults.baseURL = 'https://backend-dot-issuetracker99.ew.r.appspot.com/api';
    UpdateJWTInAxios();
};

const UpdateJWTInAxios = () => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + GetJWTToken();
};

export const StoreJWTToken = (Token) => {
    localStorage.setItem('authToken', Token);
    UpdateJWTInAxios();
};

export const GetJWTToken = () => {
    return localStorage.getItem('authToken');
};

export const RESPONSE_STATUS = {
    OK: 200,
    CREATED: 201,
    EMPTY: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

export default GlobalConfiguration;
