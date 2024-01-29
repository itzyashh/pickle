export const BASE_URL = 'http://localhost:3000';

export const getApiUrl = (endpoint) => BASE_URL + endpoint;

export const SIGNUP_API = getApiUrl('/user/signup');

export const LOGIN_API = getApiUrl('/user/login');