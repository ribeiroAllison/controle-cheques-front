import axios from 'axios';
import { baseURL } from './url';
import { getCookie } from './cookie';

const token = getCookie('token');

export const connection = axios.create({
    baseURL: baseURL,
    timeout: 3000,
    headers: { 'Authorization': `Bearer ${token}` }
});