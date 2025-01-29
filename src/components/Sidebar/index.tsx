import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo/logo.png';
import {
  HomeIcon,
  VideoCameraIcon,
  FilmIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useUIStore } from '../../store/ui.store';
import { useAuthStore } from '../../store/auth.store';

const Sidebar = () => {
  const { sidebarOpen, closeSidebar, toggleSidebar } = useUIStore();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useAuthStore();
  const isSuperAdmin = user?.role === 'super_admin';

  const trigger = useRef<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebarRef.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebarRef.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      closeSidebar();
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, closeSidebar]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      closeSidebar();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, closeSidebar]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, closeSidebar]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
    },
    {
      name: 'Upload Video',
      href: '/dashboard/upload',
      icon: VideoCameraIcon,
    },
    {
      name: 'Manage Videos',
      href: '/dashboard/manage',
      icon: FilmIcon,
    },
  ];

  // Function to check if a route is active
  const isActiveRoute = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(path);
  };

  return (
    <aside
      ref={sidebarRef}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink
          to="/dashboard"
          className="flex items-center justify-center flex-grow"
        >
          <img
            src={Logo}
            alt="Logo"
            className="w-[180px] lg:w-[200px] mx-auto"
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={closeSidebar}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.21248 17.625 9.36248 17.4375C9.69998 17.1 9.69998 16.575 9.36248 16.2375L2.98748 9.75H19C19.45 9.75 19.825 9.375 19.825 8.925C19.825 8.475 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* Sidebar Header */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* Sidebar Menu */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="mb-6 flex flex-col gap-1.5">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          isActiveRoute(item.href) &&
                          'bg-graydark dark:bg-meta-4'
                        }`
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
              {isSuperAdmin && (
                <li>
                  <NavLink
                    to="/dashboard/admins"
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        isActive ? 'bg-graydark dark:bg-meta-4' : ''
                      }`
                    }
                  >
                    <UserGroupIcon className="h-6 w-6" />
                    Admin Management
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
