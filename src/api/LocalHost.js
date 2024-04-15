import axios from "axios";
import store from "../redux/store";
import { resetUserData } from "../redux/reducers/auth";

const baseURL = "http://localhost:3000";

const token =  store.getState()?.auth?.userData?.token
console.log('token', token);

const LocalHost = axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    });

    LocalHost.interceptors.request.use(
        config => {
            const token = store.getState()?.auth?.userData?.token
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    );

    LocalHost.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error?.response?.status === 403) {
                console.log('unauthorized, logging out ...')
                console.log('error', error.response)
                store.dispatch(resetUserData())
            }
            return Promise.reject(error);
        }
    );


    export default LocalHost;