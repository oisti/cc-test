
import axios from 'axios';

const token = localStorage.getItem('api_token');

const api = axios.create({
    baseURL: "/api/",
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+ token}
});


api.interceptors.response.use(
    success =>{
        return success
    },
    error => {
        if (error.response.status === 401) {
            return Promise.reject(error.response);
        }
        return Promise.reject(error.response);
    }
)


//api.defaults.headers.common.Authorization = `Bearer ${token}`;

export default api;