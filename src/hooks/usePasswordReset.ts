import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { API_CONFIG } from '../config/api';
import { api } from '../services/api';
import { 
  RequestPasswordResetPayload, 
  ResetPasswordPayload, 
  PasswordResetResponse 
} from '../types/auth.types';

interface ResetPasswordParams {
  token: string;
  password: string;
}

export const usePasswordReset = () => {
  const navigate = useNavigate();

  const requestReset = useMutation({
    mutationFn: async (email: string) => {
      // Show loading toast immediately
      const loadingToast = toast.loading('Sending reset instructions to your email...');
      
      try {
        const response = await api.post(
          API_CONFIG.ENDPOINTS.AUTH.REQUEST_RESET,
          { email }
        );
        // Dismiss loading toast on success
        toast.dismiss(loadingToast);
        return response.data;
      } catch (error) {
        // Dismiss loading toast on error
        toast.dismiss(loadingToast);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(
        'If an account exists with this email, you will receive password reset instructions.'
      );
      setTimeout(() => {
        navigate('/auth/signin');
      }, 2000);
    },
    onError: (error: any) => {
      console.error('Password reset request error:', error);
      toast.error('Unable to process your request. Please try again later.');
    }
  });

  const resetPassword = useMutation({
    mutationFn: async ({ token, password }: ResetPasswordParams) => {
      if (!token) {
        throw new Error('Reset token is required');
      }

      console.log('Making reset request with token:', token);
      const endpoint = API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD(token);
      console.log('Using endpoint:', endpoint);

      const response = await api.post(endpoint, { password });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Password reset successful! Please sign in with your new password.');
      navigate('/auth/signin');
    },
    onError: (error: any) => {
      console.error('Password reset error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      if (error.response?.status === 400) {
        toast.error('Invalid or expired reset link. Please request a new one.');
      } else {
        const message = error.response?.data?.message || 'Failed to reset password';
        toast.error(message);
      }
    }
  });

  return {
    requestReset,
    resetPassword,
    isRequestingReset: requestReset.isLoading,
    isResettingPassword: resetPassword.isLoading
  };
}; 