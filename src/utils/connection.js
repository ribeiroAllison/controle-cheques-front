import axios from 'axios';
import { getCookie } from './cookie';
import { baseURL } from './url';


function getUpdatedToken() {
    return getCookie('token');
}

const connection = axios.create({
    baseURL: baseURL,
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
