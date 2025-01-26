import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import Logo from '../../assets/logo/logo.png';
import apiClient from '../../lib/axios';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignUpForm) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post('/api/auth/register', {
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.data.status === 'success') {
        toast.success('Account created successfully!');
        navigate('/auth/signin');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark-2 px-4">
      <div className="w-full max-w-[500px] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col items-center p-8 sm:p-12">
          <Link to="/" className="mb-8">
            <img
              src={Logo}
              alt="Logo"
              className="h-16 w-auto" // Adjust size as needed
            />
          </Link>

          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register('username', {
                  required: 'Username is required',
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
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

            <div className="mb-5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-black dark:text-white">
                Already have an account?{' '}
                <Link
                  to="/auth/signin"
                  className="text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
