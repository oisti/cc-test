
import axios from 'axios';

const token = localStorage.getItem('access_token');

const api = axios.create({
    baseURL: "/api/",
    timeout: 10000,
    headers: {'Authorization': `Bearer ${token}`}
});


//api.defaults.headers.common.Authorization = `Bearer ${token}`;

export default api;