import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';
import Logo from '../../assets/logo/logo.png';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useUIStore } from '../../store/ui.store';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuth();

  const handleSidebarToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={handleSidebarToggle}
            aria-expanded={sidebarOpen}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-400'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
        </div>

        {/* Right Side Elements */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <DarkModeSwitcher />
          <div className="h-[45px] w-[1px] bg-stroke dark:bg-strokedark"></div>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
