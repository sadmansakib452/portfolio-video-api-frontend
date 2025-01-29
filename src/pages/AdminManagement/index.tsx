import { useState } from 'react';
import { useAdmins } from '../../hooks/useAdmins';
import { Admin, AdminFormData, UpdateAdminRequest } from '../../types/admin.types';
import { toast } from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumb';
import AdminList from './components/AdminList';
import CreateAdminModal from './components/CreateAdminModal';
import EditAdminModal from './components/EditAdminModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';
import { UserCircleIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

const AdminManagement = () => {
  // State Management
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    adminId: string | null;
  }>({ isOpen: false, adminId: null });

  // Hooks
  const { admins, isLoading, createAdmin, deleteAdmin, updateAdmin } = useAdmins();

  // Create Admin Handler
  const handleCreateAdmin = async (data: AdminFormData) => {
    try {
      await createAdmin.mutateAsync({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      setIsCreateModalOpen(false);
    } catch (error: any) {
      console.error('Create admin error:', error);
      if (error.field) {
        toast.error(error.message);
        throw error;
      }
      toast.error(error.response?.data?.message || 'Failed to create admin');
    }
  };

  // Edit Admin Handler
  const handleEditClick = (admin: Admin) => {
    setSelectedAdmin(admin);
  };

  const handleUpdateAdmin = async (id: string, data: UpdateAdminRequest) => {
    try {
      await updateAdmin.mutateAsync({ id, data });
      setSelectedAdmin(null);
    } catch (error: any) {
      console.error('Update admin error:', error);
      throw error;
    }
  };

  // Delete Admin Handlers
  const handleDeleteClick = (adminId: string) => {
    setDeleteConfirmation({ isOpen: true, adminId });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmation.adminId) return;

    try {
      await deleteAdmin.mutateAsync(deleteConfirmation.adminId);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete admin');
    } finally {
      setDeleteConfirmation({ isOpen: false, adminId: null });
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Admin Management" />

      <div className="flex flex-col gap-6">
        {/* Header Section - Refined Layout */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-black dark:text-white mb-1">
              Admins List
            </h2>
            <p className="text-sm text-body">
              Manage your admin users
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary py-2 px-3 text-center font-medium text-white hover:bg-opacity-90 transition-colors duration-200 mt-4 sm:mt-0 w-fit ml-auto sm:ml-0"
          >
            <PlusIcon className="w-5 h-5" />
            <span className="text-sm">Add New Admin</span>
          </button>
        </div>

        {/* Admin List Section */}
        <div className="rounded-sm lg:border lg:border-stroke lg:bg-white px-4 pt-6 pb-2.5 lg:shadow-default dark:lg:border-strokedark dark:lg:bg-boxdark sm:px-6 xl:pb-1">
          {/* Mobile View */}
          <div className="block lg:hidden">
            <div className="space-y-3">
              {admins.map((admin) => (
                <div 
                  key={admin._id}
                  className="rounded-lg border border-stroke/30 dark:border-strokedark/30 p-4 hover:shadow-sm transition-all duration-200 bg-white/30 dark:bg-meta-4/30"
                >
                  <div className="flex items-center gap-3">
                    <UserCircleIcon className="w-10 h-10 text-primary/80" />
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-black dark:text-white">
                        {admin.username}
                      </h3>
                      <p className="text-sm text-body">{admin.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditClick(admin)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors duration-200"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(admin._id)}
                        className="p-2 text-danger hover:bg-danger/10 rounded-full transition-colors duration-200"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Username
                  </th>
                  <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
                    Email
                  </th>
                  <th className="py-4 px-4 font-medium text-black dark:text-white text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin._id}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center gap-3">
                        <UserCircleIcon className="w-8 h-8 text-primary" />
                        <span className="text-black dark:text-white">
                          {admin.username}
                        </span>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <span className="text-black dark:text-white">
                        {admin.email}
                      </span>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center justify-end space-x-3.5">
                        <button
                          onClick={() => handleEditClick(admin)}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(admin._id)}
                          className="hover:text-danger transition-colors duration-200"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateAdminModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateAdmin}
      />

      <EditAdminModal
        isOpen={!!selectedAdmin}
        admin={selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        onSubmit={handleUpdateAdmin}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, adminId: null })}
        onConfirm={handleDeleteConfirm}
        title="Delete Admin"
        message="Are you sure you want to delete this admin? This action cannot be undone."
      />
    </div>
  );
};

export default AdminManagement;
