import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { logout } = useAuth();
  const { user } = useAuthContext();

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2"
        to="#"
      >
        <div className="flex flex-col items-end">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.name || user?.username || 'Guest'}
          </span>
          <span className="block text-xs font-medium text-gray-600 dark:text-gray-400">
            {user?.role || 'User'}
          </span>
        </div>
        <ChevronDownIcon
          className={`h-4 w-4 text-current transition-transform duration-200 ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
        />
      </Link>

      <div
        ref={dropdown}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base border-b border-stroke dark:border-strokedark"
        >
          <HomeIcon className="h-5 w-5" />
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
