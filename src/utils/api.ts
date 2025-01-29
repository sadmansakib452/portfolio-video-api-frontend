import { AdminError } from '../types/admin.types';

export const handleApiError = (error: any) => {
  console.error('API Error:', {
    status: error.response?.status,
    data: error.response?.data,
    message: error.message
  });

  const errorData = error.response?.data as AdminError;
  
  if (error.response?.status === 409) {
    throw {
      ...error,
      field: errorData.field,
      message: errorData.message
    };
  }

  if (error.response?.status === 400 && errorData.field) {
    throw {
      ...error,
      field: errorData.field,
      message: errorData.message
    };
  }

  throw error;
}; 