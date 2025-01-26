import axios from 'axios';
import config from '../config';
import { useAuthStore } from '../hooks/useAuthStore';

const apiClient = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Preserve theme data
      const themeData = localStorage.getItem('theme-storage');
      
      // Clear all auth data
      useAuthStore.getState().clearAuth();
      localStorage.clear();
      
      // Restore theme data
      if (themeData) {
        localStorage.setItem('theme-storage', themeData);
      }
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/auth/')) {
        window.location.href = '/auth/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient; 