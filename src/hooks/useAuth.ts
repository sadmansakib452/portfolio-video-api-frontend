import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../lib/axios';
import { useAuthStore } from './useAuthStore';

interface LoginCredentials {
  login: string;  // Can be username or email
  password: string;
}

export function useAuth() {
  const navigate = useNavigate();
  const { setAuth, clearAuth } = useAuthStore();

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      const { token, user } = response.data.data;
      setAuth(user, token);
      navigate('/dashboard');
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    }
  }, [setAuth, navigate]);

  const logout = useCallback(() => {
    // Get theme data before clearing
    const themeData = localStorage.getItem('theme-storage');
    
    // Clear auth data
    clearAuth();
    
    // Clear storage but preserve theme
    localStorage.clear();
    if (themeData) {
      localStorage.setItem('theme-storage', themeData);
    }
    
    // Reset axios default headers
    delete apiClient.defaults.headers.common['Authorization'];
    
    // Navigate to login
    navigate('/auth/signin');
  }, [navigate, clearAuth]);

  const isAuthenticated = useCallback(() => {
    const state = useAuthStore.getState();
    return !!(state.token && state.user);
  }, []);

  return { login, logout, isAuthenticated };
} 