import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePasswordReset } from '../../hooks/usePasswordReset';
import Logo from '../../assets/logo/logo.png';

interface RequestResetForm {
  email: string;
}

const RequestResetPassword = () => {
  const { requestReset, isRequestingReset } = usePasswordReset();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestResetForm>();

  const onSubmit = async (data: RequestResetForm) => {
    await requestReset.mutateAsync(data.email);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark-2 px-4">
      <div className="w-full max-w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col items-center p-8 sm:p-12">
          <Link to="/" className="mb-8">
            <img src={Logo} alt="Logo" className="h-16 w-auto" />
          </Link>

          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
            Forgot Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-danger">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-5">
              <button
                type="submit"
                disabled={isRequestingReset}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
              >
                {isRequestingReset ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending Reset Instructions...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
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

export default RequestResetPassword; 