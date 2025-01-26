import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { useAuthStore } from '../../hooks/useAuthStore';
import Logo from '../../assets/logo/logo.png';

interface SignInForm {
  login: string;
  password: string;
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from);
    }
  }, [isAuthenticated, navigate, location]);

  const onSubmit = async (data: SignInForm) => {
    try {
      setIsLoading(true);
      await login(data);
      toast.success('Successfully logged in!');

      // Navigate to the attempted page or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
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
            Sign In to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email/Username
              </label>
              <input
                type="text"
                placeholder="Enter your email or username"
                {...register('login', {
                  required: 'This field is required',
                })}
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.login && (
                <p className="mt-1 text-xs text-danger">
                  {errors.login.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'This field is required',
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
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-black dark:text-white">
                Don't have an account?{' '}
                <Link
                  to="/auth/signup"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
