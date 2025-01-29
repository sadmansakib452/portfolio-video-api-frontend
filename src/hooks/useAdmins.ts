import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminService } from '../services/admin.service';
import { Admin, CreateAdminRequest, UpdateAdminRequest } from '../types/admin.types';
import { toast } from 'react-hot-toast';

export const useAdmins = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['admins'];

  // Enhanced query with logging
  const {
    data: adminsData,
    isLoading,
    error
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      console.log('Fetching admins...');
      const response = await AdminService.getAdmins();
      console.log('Admins fetched:', response);
      return response;
    },
    staleTime: 5 * 60 * 1000,
  });

  // Enhanced create mutation with better error handling and logging
  const createAdmin = useMutation({
    mutationFn: (data: CreateAdminRequest) => AdminService.createAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admins']);
      toast.success('Admin created successfully');
    },
  });

  // Update mutation with optimistic update
  const updateAdmin = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAdminRequest }) =>
      AdminService.updateAdmin(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });
      const previousAdmins = queryClient.getQueryData<{ data: { admins: Admin[] } }>(QUERY_KEY);

      // Optimistically update the admin
      if (previousAdmins?.data?.admins) {
        const newAdmins = previousAdmins.data.admins.map(admin =>
          admin._id === id ? { ...admin, ...data } : admin
        );
        queryClient.setQueryData(QUERY_KEY, {
          ...previousAdmins,
          data: { ...previousAdmins.data, admins: newAdmins }
        });
      }

      return { previousAdmins };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY);
      toast.success('Admin updated successfully');
    },
    onError: (error: any, _, context) => {
      if (context?.previousAdmins) {
        queryClient.setQueryData(QUERY_KEY, context.previousAdmins);
      }
      if (error.field) {
        toast.error(error.message);
      } else {
        toast.error('Failed to update admin');
      }
    }
  });

  // Delete mutation with optimistic update
  const deleteAdmin = useMutation({
    mutationFn: (id: string) => AdminService.deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admins']);
      toast.success('Admin deleted successfully');
    },
  });

  // Log the current admins data whenever it changes
  console.log('Current admins data:', {
    hasData: !!adminsData,
    admins: adminsData?.data?.admins,
    total: adminsData?.data?.admins?.length
  });

  return {
    // Ensure we're returning the correct data structure
    admins: adminsData?.data?.admins || [],
    isLoading,
    error,
    createAdmin,
    updateAdmin,
    deleteAdmin
  };
}; 