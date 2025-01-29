import { useForm } from 'react-hook-form';
import { AdminFormData } from '../../../types/admin.types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AdminFormData) => void;
}

const CreateAdminModal = ({
  isOpen,
  onClose,
  onSubmit,
}: CreateAdminModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError,
  } = useForm<AdminFormData>();

  const password = watch('password');

  const handleFormSubmit = async (data: AdminFormData) => {
    try {
      console.log('Form submit:', data);
      await onSubmit(data);
      console.log('Form submitted successfully');
      reset();
    } catch (error: any) {
      console.error('Form submit error:', {
        field: error.field,
        message: error.message,
      });

      if (error.field) {
        setError(error.field, {
          type: 'manual',
          message: error.message,
        });
        toast.error(error.message);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Create New Admin
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Username
            </label>
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
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
                required: 'Email is required',
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

          <div className="mb-4">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Password
            </label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
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

          <div className="mb-6">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              })}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-danger">
                {errors.confirmPassword.message}
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
              Create Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminModal;
