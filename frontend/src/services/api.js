import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// Attach accessToken to every request
API.interceptors.request.use((config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo?.accessToken) {
        config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
    }
    return config;
});

export const authAPI = {
    login: (data) => API.post('/auth/login', data),
    register: (data) => API.post('/auth/register', data),
    googleLogin: (data) => API.post('/auth/google-login', data),
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

export const userAPI = {
    getProfile: () => API.get('/users/profile'),
    updateProfile: (data) => API.put('/users/profile', data),
};

export default API;
