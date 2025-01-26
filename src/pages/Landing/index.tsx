import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  VideoCameraIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../../assets/logo/logo.png';

const Landing = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    try {
     
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-boxdark">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-boxdark/90 backdrop-blur-sm'
            : 'bg-transparent'
        } border-b border-stroke dark:border-strokedark`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Using single logo for both modes */}
            <div className="flex-shrink-0">
              <img src={Logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="#work"
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              >
                WORK
              </Link>
              <Link
                to="#about"
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              >
                ABOUT
              </Link>
              <Link
                to="#contact"
                className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              >
                CONTACT
              </Link>
              {user && (
                <Link
                  to="/dashboard"
                  className="text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                >
                  DASHBOARD
                </Link>
              )}
            </div>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-6 py-2 rounded-lg border border-stroke dark:border-strokedark hover:bg-gray-100 dark:hover:bg-meta-4 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-meta-4 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Bars3Icon className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`fixed inset-y-0 right-0 w-full bg-white dark:bg-boxdark transform ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-stroke dark:border-strokedark">
            <div className="flex-shrink-0">
              <img src={Logo} alt="Logo" className="h-8 w-auto" />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-meta-4 transition-colors"
            >
              <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="px-4 py-6 space-y-4">
            <Link
              to="#work"
              className="block text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              WORK
            </Link>
            <Link
              to="#about"
              className="block text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              to="#contact"
              className="block text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              CONTACT
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className="block text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DASHBOARD
              </Link>
            )}
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full text-left text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="block text-black dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="block px-4 py-2 rounded-lg bg-primary text-white hover:bg-opacity-90 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
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
