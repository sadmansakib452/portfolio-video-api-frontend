import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useAuth } from '../../hooks/useAuth';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import headerimage from '../../assets/backgroundimages/Headerbackground.jpeg';
import logoimage from '../../assets/logo/logo.png';

const Header = () => {
  // State to store number of bars based on screen width
  const [barCount, setBarCount] = useState(150);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuthStore();
  const { logout } = useAuth();

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

    // Initial setup
    updateBarCount();

    // Add resize listener
    window.addEventListener('resize', updateBarCount);

    // Cleanup
    return () => window.removeEventListener('resize', updateBarCount);
  }, []);

  // Add toggle function
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Enhanced smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Alternative scrolling method for better browser support
      // element.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'start'
      // });
    }
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
        <header className="flex justify-between items-center py-4 lg:py-6">
          {/* Left: Logo */}
          <div className="w-[200px] sm:w-[250px] lg:w-[300px]">
            <img className="w-full" src={logoimage} alt="Dream Radio Logo" />
          </div>

          {/* Center: Navigation */}
          <nav
            style={{ fontFamily: 'Gotham' }}
            className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6 sm:space-x-8 lg:space-x-11 text-sm sm:text-xl"
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
          </nav>

          {/* Right: Dropdown Icon */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 hover:text-yellow-400 transition-colors rounded-full"
              aria-label="Menu"
            >
              <ChevronDownIcon
                className={`h-6 w-6 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-black/90 backdrop-blur-sm">
                <div className="py-1" role="menu">
                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-white hover:text-yellow-400 transition-colors"
                        role="menuitem"
                        onClick={toggleDropdown}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          toggleDropdown();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-white hover:text-yellow-400 transition-colors"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth/signin"
                      className="block px-4 py-2 text-sm text-white hover:text-yellow-400 transition-colors"
                      role="menuitem"
                      onClick={toggleDropdown}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
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
          <style>{`
            html {
              scroll-behavior: smooth;
              scroll-padding-top: 80px; /* Adjust based on your header height */
            }

            @media screen and (prefers-reduced-motion: reduce) {
              html {
                scroll-behavior: auto;
              }
            }

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
      </main>
    </div>
  );
};

export default Header;
