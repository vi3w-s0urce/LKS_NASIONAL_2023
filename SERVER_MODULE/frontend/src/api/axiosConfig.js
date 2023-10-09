import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const axiosBase = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

export const axiosAuth = (token) => axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        'Authorization' : token,
        'Content-type': 'application/json'
    }
});