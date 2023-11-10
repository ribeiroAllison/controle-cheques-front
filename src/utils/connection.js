import axios from 'axios';
import { baseURL } from './url';
import { getCookie } from './cookie';


function getUpdatedToken() {
    return getCookie('token');
}

const connection = axios.create({
    baseURL: baseURL,
    timeout: 10000,
    headers: {
        'Authorization': `Bearer ${getUpdatedToken()}`
    }
});

connection.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${getUpdatedToken()}`;
    return config;
}, error => {
    return Promise.reject(error);
});

export { connection };