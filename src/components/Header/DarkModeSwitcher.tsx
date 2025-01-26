import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '../../hooks/useThemeStore';

const DarkModeSwitcher = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button
      className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 hover:bg-gray-200 dark:bg-meta-4 dark:hover:bg-meta-3"
      onClick={toggleTheme}
    >
      {isDarkMode ? (
        <SunIcon className="h-5 w-5 text-primary" />
      ) : (
        <MoonIcon className="h-5 w-5 text-primary" />
      )}
    </button>
  );
};

export default DarkModeSwitcher;
