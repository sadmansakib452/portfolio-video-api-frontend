import { api } from './api';
import { API_CONFIG } from '../config/api';
import { AuthResponse, LoginCredentials } from '../types/auth.types';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response.data;
    } catch (error: any) {
      // Add better error handling
      if (error.response?.status === 404) {
        throw new Error('Login endpoint not found. Please check API configuration.');
      }
      throw error;
    }
  }
}; 