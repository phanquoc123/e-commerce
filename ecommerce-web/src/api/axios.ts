import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.error('Unauthorized, redirect to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
