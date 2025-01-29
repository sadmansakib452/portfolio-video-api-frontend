import axios from 'axios';
import config from '../config';
import { useAuthStore } from '../store/auth.store';

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
    
    console.log('Request with token:', {
      url: config.url,
      hasToken: !!token,
      token: token?.substring(0, 10) + '...' // Log part of token for debugging
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response Success:', {
      url: response.config.url,
      status: response.status,
      hasData: !!response.data
    });
    return response;
  },
  async (error) => {
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });

    if (error.response?.status === 401) {
      // Don't clear auth for login attempts
      if (error.config.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }

      console.log('Unauthorized access, clearing auth...');
      
      // Clear auth data and redirect
      useAuthStore.getState().clearAuth();
      
      if (!window.location.pathname.includes('/auth/')) {
        window.location.href = '/auth/signin';
      }
    }

    // Could add token refresh logic here

    return Promise.reject(error);
  }
);

export default apiClient; 