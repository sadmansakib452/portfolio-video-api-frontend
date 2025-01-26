import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useAuth } from '../../hooks/useAuth';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import headerimage from '../../assets/backgroundimages/Headerbackground.jpeg';
import logoimage from '../../assets/logo/logo.png';

const Header = () => {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [barCount, setBarCount] = useState(150);

  // Update bar count based on screen width
  useEffect(() => {
    const updateBarCount = () => {
      if (window.innerWidth < 640) {
        setBarCount(50); // Mobile
      } else if (window.innerWidth < 1024) {
        setBarCount(100); // Tablet
      } else {
        setBarCount(120); // Desktop
      }
    };

    updateBarCount();
    window.addEventListener('resize', updateBarCount);
    return () => window.removeEventListener('resize', updateBarCount);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${headerimage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
      }}
      className="flex flex-col text-white relative h-[100vh] sm:h-[90vh] md:h-[80vh] lg:h-screen"
    >
      {/* Navigation Bar */}
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center py-4 lg:py-6 gap-4 sm:gap-0">
          {/* Logo */}
          <div className="w-[200px] sm:w-[250px] lg:w-[300px]">
            <Link to="/">
              <img className="w-full" src={logoimage} alt="Dream Radio Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            style={{ fontFamily: 'Gotham' }}
            className="hidden md:flex space-x-6 sm:space-x-8 lg:space-x-11 text-sm sm:text-xl"
          >
            <ScrollLink
              to="work"
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              WORK
            </ScrollLink>
            <ScrollLink
              to="about"
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              ABOUT
            </ScrollLink>
            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-100}
              duration={800}
              className="hover:text-yellow-400 transition-colors cursor-pointer"
            >
              CONTACT
            </ScrollLink>
            {user && (
              <Link
                to="/dashboard"
                className="hover:text-yellow-400 transition-colors"
              >
                DASHBOARD
              </Link>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={signOut}
                className="text-white hover:text-yellow-400 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="px-4 py-2 bg-yellow-400 text-black hover:bg-yellow-500 transition-colors rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </header>
      </div>

      {/* Hero Section */}
      <main
        style={{ fontFamily: 'Gotham' }}
        className="w-full max-w-[1400px] mx-auto sm:px-6 pt-[30%] sm:pt-[15%] lg:pt-[20%]"
      >
        <div
          style={{ fontFamily: 'Gotham' }}
          className="text-center lg:text-left"
        >
          <h1 className="lg:text-5xl md:text-4xl sm:text-3xl text-xl">
            Where words leave off,{' '}
            <span className="text-yellow-400">music</span> begins.
          </h1>
        </div>

        {/* Soundwave Animation */}
        <div className="mt-6 overflow-hidden w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] flex justify-center lg:justify-start">
          <div className="flex items-center gap-[1px] sm:gap-[4px]">
            {[...Array(barCount)].map((_, index) => (
              <div
                key={index}
                className="rounded-[2px] bg-purple-400"
                style={{
                  width: '3px',
                  height: `${
                    Math.random() * (window.innerWidth < 640 ? 15 : 20) + 8
                  }px`,
                  animation: 'wave 1.2s ease-in-out infinite',
                  animationDelay: `${
                    index * (window.innerWidth < 640 ? 100 : 50)
                  }ms`,
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full bg-black transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="w-[150px]">
            <img src={logoimage} alt="Dream Radio Logo" className="w-full" />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white hover:text-yellow-400"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-4">
          <ScrollLink
            to="work"
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
            className="block text-white hover:text-yellow-400 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            WORK
          </ScrollLink>
          <ScrollLink
            to="about"
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
            className="block text-white hover:text-yellow-400 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ABOUT
          </ScrollLink>
          <ScrollLink
            to="contact"
            spy={true}
            smooth={true}
            offset={-100}
            duration={800}
            className="block text-white hover:text-yellow-400 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CONTACT
          </ScrollLink>
          {user && (
            <Link
              to="/dashboard"
              className="block text-white hover:text-yellow-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              DASHBOARD
            </Link>
          )}
          {user ? (
            <button
              onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left text-white hover:text-yellow-400 transition-colors"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="block text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className="block px-4 py-2 bg-yellow-400 text-black hover:bg-yellow-500 transition-colors rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(2);
          }
        }
        @media (max-width: 639px) {
          .h-screen {
            height: 100vh;
            min-height: 600px;
          }
        }
        @media (min-width: 640px) {
          .soundwave-bar {
            width: 2px;
          }
        }
        @media (min-width: 1024px) {
          .soundwave-bar {
            width: 3px;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;
