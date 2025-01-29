import { useForm } from 'react-hook-form';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import Logo from '../../assets/logo/logo.png';
import { toast } from 'react-hot-toast';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>(); // Use proper param extraction
  const navigate = useNavigate();
  const { resetPassword, isResettingPassword } = usePasswordReset();

  console.log('Token from params:', token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      console.log('No token found in params');
      toast.error('Invalid reset link');
      navigate('/auth/forgot-password');
      return;
    }

    try {
      console.log('Submitting reset password with token:', token);

      await resetPassword.mutateAsync({
        token,
        password: data.password,
      });
    } catch (error) {
      console.error('Reset submission error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark-2 px-4">
      <div className="w-full max-w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col items-center p-8 sm:p-12">
          <Link to="/" className="mb-8">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />
          </Link>

          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
            Set New Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                placeholder="Confirm your password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-danger">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <button
                type="submit"
                disabled={isResettingPassword}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
              >
                {isResettingPassword ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-black dark:text-white">
                Remember your password?{' '}
                <Link to="/login" className="text-primary hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
