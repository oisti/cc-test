
import axios from 'axios';

const api = axios.create({
    baseURL: "/api/",
    timeout: 10000,
});


api.interceptors.response.use(
    success =>{
        return success
    },
    error => {
        if (error.response.status === 401) {
            localStorage.removeItem('api_token');
            return Promise.reject(error.response);
        }
        return Promise.reject(error.response);
    }
)


export default api;