import { Link } from 'react-router-dom';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import Logo from '../../images/logo/logo.svg';
import LogoDark from '../../images/logo/logo-dark.svg';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-boxdark border-b border-stroke dark:border-strokedark">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img className="hidden dark:block h-10" src={Logo} alt="Logo" />
              <img className="dark:hidden h-10" src={LogoDark} alt="Logo" />
            </div>

            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              <Link
                to="/auth/signin"
                className="px-6 py-2 rounded-lg border border-stroke dark:border-strokedark hover:bg-gray-100 dark:hover:bg-meta-4 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <VideoCameraIcon className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6">
              Your Video Platform
            </h1>
            <p className="text-lg text-meta-3 mb-8">
              Upload, manage, and share your videos with ease
            </p>
            <Link
              to="/auth/signup"
              className="inline-block px-8 py-3 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors text-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-100 dark:bg-meta-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Upload',
                description: 'Simple and fast video uploading process',
              },
              {
                title: 'Secure Storage',
                description: 'Your videos are stored safely and securely',
              },
              {
                title: 'Quick Management',
                description: 'Efficiently manage all your video content',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-boxdark rounded-lg shadow-default"
              >
                <h3 className="text-xl font-semibold text-black dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-meta-3">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
