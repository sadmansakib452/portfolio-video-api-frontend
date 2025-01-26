import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAuth } from '../../hooks/useAuth';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import headerimage from '../../assets/backgroundimages/Headerbackground.jpeg';
import logoimage from '../../assets/logo/logo.png';

const Header = () => {
  const { user } = useAuthContext();
  const { logout } = useAuth();
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

  // Handle sign out
  const handleSignOut = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

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
        <header className="flex items-center justify-between py-4 lg:py-6">
          {/* Part 1: Logo (Left) - Increased mobile size */}
          <div className="w-[150px] sm:w-[180px] lg:w-[250px]">
            <Link to="/">
              <img className="w-full" src={logoimage} alt="Dream Radio Logo" />
            </Link>
          </div>

          {/* Part 2: Navigation Links (Middle) */}
          <nav
            style={{ fontFamily: 'Gotham' }}
            className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-11 text-sm sm:text-xl"
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
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                DASHBOARD
              </Link>
            )}
          </nav>

          {/* Part 3: Auth Buttons (Right) */}
          <div
            style={{ fontFamily: 'Gotham' }}
            className="hidden md:flex items-center space-x-6 sm:space-x-8 lg:space-x-11 text-sm sm:text-xl"
          >
            {user ? (
              <button
                onClick={handleSignOut}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                type="button"
              >
                SIGN OUT
              </button>
            ) : (
              <>
                <Link
                  to="/auth/signin"
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  SIGN IN
                </Link>
                <Link
                  to="/auth/signup"
                  className="hover:text-yellow-400 transition-colors cursor-pointer"
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button - Updated position */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </header>
      </div>

      {/* Hero Section - Adjusted vertical position */}
      <main
        style={{ fontFamily: 'Gotham' }}
        className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col items-center lg:items-start pt-[25vh] sm:pt-[20vh] md:pt-[25vh] lg:pt-[30vh]"
      >
        <div
          style={{ fontFamily: 'Gotham' }}
          className="text-center lg:text-left w-full"
        >
          <h1 className="text-[40px] leading-tight sm:text-4xl md:text-5xl lg:text-5xl mb-8 sm:mb-10">
            Where words leave off,{' '}
            <span className="text-yellow-400">music</span> begins.
          </h1>
        </div>

        {/* Soundwave Animation - Follows text positioning */}
        <div className="w-full flex justify-center lg:justify-start">
          <div className="overflow-hidden w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]">
            <div className="flex items-center gap-[1px] sm:gap-[4px] justify-center lg:justify-start">
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
        </div>
      </main>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-full bg-black transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="w-[180px]">
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
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                DASHBOARD
              </Link>
              <button
                onClick={handleSignOut}
                className="block w-full text-left text-white hover:text-yellow-400 transition-colors"
                type="button"
              >
                SIGN OUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="block text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SIGN IN
              </Link>
              <Link
                to="/auth/signup"
                className="block text-white hover:text-yellow-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SIGN UP
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Animation Styles - Updated for better mobile responsiveness */}
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
