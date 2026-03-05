import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.token) {
        config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
});

export const authAPI = {
    login: (data) => API.post('/auth/login', data),
    register: (data) => API.post('/auth/register', data),
};

export const carAPI = {
    getAll: (params) => API.get('/cars', { params }),
    getById: (id) => API.get(`/cars/${id}`),
};

export const bookingAPI = {
    create: (data) => API.post('/bookings', data),
    getMyBookings: () => API.get('/bookings/my'),
    cancel: (id) => API.put(`/bookings/${id}/cancel`),
};

export default API;
