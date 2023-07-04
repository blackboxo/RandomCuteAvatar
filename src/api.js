import axios from 'axios';

const service = axios.create({
    baseURL: 'http://82.157.33.108:8000/',
    timeout: 10000
});

service.interceptors.request.use(
    config => {
        return config;
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    }
);

export default service;