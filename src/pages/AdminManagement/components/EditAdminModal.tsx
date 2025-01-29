import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Admin, UpdateAdminRequest } from '../../../types/admin.types';

interface EditAdminModalProps {
  isOpen: boolean;
  admin: Admin | null;
  onClose: () => void;
  onSubmit: (id: string, data: UpdateAdminRequest) => Promise<void>;
}

const EditAdminModal = ({
  isOpen,
  admin,
  onClose,
  onSubmit,
}: EditAdminModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<UpdateAdminRequest>({
    defaultValues: {
      username: admin?.username || '',
      email: admin?.email || '',
      password: '',
    },
  });

  const handleFormSubmit = async (data: UpdateAdminRequest) => {
    try {
      if (!admin?._id) return;

      // Remove empty fields
      const updateData: UpdateAdminRequest = {};
      if (data.username) updateData.username = data.username;
      if (data.email) updateData.email = data.email;
      if (data.password) updateData.password = data.password;

      await onSubmit(admin._id, updateData);
      reset();
      onClose();
    } catch (error: any) {
      if (error.field) {
        setError(error.field as keyof UpdateAdminRequest, {
          type: 'manual',
          message: error.message,
        });
      }
    }
  };

  if (!isOpen || !admin) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-black dark:text-white">
              Edit Admin
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          {admin && (
            <div className="mt-4 border-t border-stroke pt-4 dark:border-strokedark">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-white">
                  {admin.username}
                </span>
                <span className="text-xs text-gray-500">
                  {admin.email}
                </span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              {...register('username', {
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    'Username can only contain letters, numbers and underscore',
                },
              })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-danger">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Email
            </label>
            <input
              type="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              New Password (optional)
            </label>
            <input
              type="password"
              {...register('password', {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-danger">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-stroke py-2 px-6 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-primary py-2 px-6 text-white hover:bg-opacity-90"
            >
              Update Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAdminModal;
