import axios from "axios";
import store from "../redux/store";

const baseURL = "http://localhost:3000";

const token = store.getState()?.auth?.userData?.token;
console.log('token', token);

export default axios.create({
    baseURL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    });