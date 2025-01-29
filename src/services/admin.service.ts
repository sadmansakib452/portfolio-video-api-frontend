import apiClient from '../lib/axios';
import { 
  Admin, 
  CreateAdminRequest, 
  UpdateAdminRequest,
  AdminError, 
  CreateAdminError,
  UpdateAdminError 
} from '../types/admin.types';
import { API_CONFIG } from '../config/api';
import { handleApiError } from '../utils/api';

interface AdminListResponse {
  status: "success";
  data: {
    admins: Admin[];
    total: number;
    pagination: {
      page: number;
      limit: number;
      pages: number;
    };
  };
}

interface CreateAdminResponse {
  status: "success";
  data: {
    admin: Admin;
  };
}

interface DeleteAdminResponse {
  status: "success";
  message: string;
}

export const AdminService = {
  getAdmins: async () => {
    try {
      console.log('GetAdmins: Making request');
      const response = await apiClient.get<AdminListResponse>('/api/admins');
      console.log('GetAdmins Response:', {
        status: response.status,
        data: response.data,
        adminCount: response.data?.data?.admins?.length
      });
      return response.data;
    } catch (error: any) {
      console.error('GetAdmins Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  createAdmin: async (adminData: CreateAdminRequest) => {
    try {
      console.log('CreateAdmin: Making request with data:', adminData);
      const response = await apiClient.post<CreateAdminResponse>('/api/admins', adminData);
      console.log('CreateAdmin Response:', {
        status: response.status,
        data: response.data
      });
      return response.data;
    } catch (error: any) {
      console.error('CreateAdmin Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      const errorData = error.response?.data as CreateAdminError;
      
      if (error.response?.status === 409) {
        console.log('Duplicate field error:', errorData);
        throw {
          field: errorData.field,
          message: errorData.message
        };
      }
      throw error;
    }
  },

  deleteAdmin: async (adminId: string) => {
    try {
      console.log('DeleteAdmin Request:', { adminId });
      const response = await apiClient.delete<DeleteAdminResponse>(`/api/admins/${adminId}`);
      console.log('DeleteAdmin Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('DeleteAdmin Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  updateAdmin: async (adminId: string, data: UpdateAdminRequest) => {
    try {
      const response = await apiClient.put<UpdateAdminResponse>(
        API_CONFIG.ENDPOINTS.ADMIN.UPDATE(adminId),
        data
      );
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  },

  partialUpdateAdmin: async (adminId: string, data: Partial<UpdateAdminRequest>) => {
    try {
      const response = await apiClient.patch<UpdateAdminResponse>(
        API_CONFIG.ENDPOINTS.ADMIN.PATCH(adminId),
        data
      );
      return response.data;
    } catch (error: any) {
      handleApiError(error);
      throw error;
    }
  }
}; 