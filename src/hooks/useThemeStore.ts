import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: document.documentElement.classList.contains('dark'),
      toggleTheme: () =>
        set((state) => {
          const newDarkMode = !state.isDarkMode;
          // Update DOM
          document.documentElement.classList.toggle('dark', newDarkMode);
          return { isDarkMode: newDarkMode };
        }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ isDarkMode: state.isDarkMode }),
    }
  )
);

// Initialize theme on app load
const initializeTheme = () => {
  const { isDarkMode } = useThemeStore.getState();
  document.documentElement.classList.toggle('dark', isDarkMode);
};

initializeTheme(); 