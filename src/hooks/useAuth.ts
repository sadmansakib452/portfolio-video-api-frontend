import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/axios';
import { useAuthStore } from '../store/auth.store';

interface LoginCredentials {
  email: string;     // Changed from login to email
  password: string;
}

interface AuthError extends Error {
  code: string;
  status: number;
}

export function useAuth() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      console.log('Login attempt:', { email: credentials.email });
      
      // Using the correct endpoint without /api prefix
      const response = await apiClient.post('api/auth/login', {
        email: credentials.email,
        password: credentials.password
      });

      console.log('Login Response:', {
        status: response.data?.status,
        hasData: !!response.data?.data
      });

      if (response.data?.status === 'success' && response.data?.data) {
        const { user, token } = response.data.data;
        await setAuth(user, token);
        return true;
      }
      
      throw new Error('Invalid response format');
    } catch (error: AuthError) {
      console.error('Login error:', {
        status: error.status,
        message: error.message
      });

      switch (error.status) {
        case 401:
          throw new Error('Invalid credentials');
        case 404:
          throw new Error('Service not available');
        default:
          throw new Error(error.message || 'Login failed');
      }
    }
  };

  const logout = useCallback(() => {
    // Get theme data before clearing
    const themeData = localStorage.getItem('theme-storage');
    
    // Clear auth data
    useAuthStore.getState().clearAuth();
    
    // Clear storage but preserve theme
    localStorage.clear();
    if (themeData) {
      localStorage.setItem('theme-storage', themeData);
    }
    
    // Reset axios default headers
    delete apiClient.defaults.headers.common['Authorization'];
    
    // Navigate to login
    navigate('/');
  }, [navigate]);

  const isAuthenticated = useCallback(() => {
    const state = useAuthStore.getState();
    return !!(state.token && state.user);
  }, []);

  return { login, logout, isAuthenticated };
} 