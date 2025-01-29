import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser } from '../types/auth.types';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
  isSuperAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        console.log('Setting auth state:', { hasUser: !!user, hasToken: !!token });
        set({ user, token });
      },
      clearAuth: () => {
        console.log('Clearing auth state');
        set({ user: null, token: null });
      },
      isAuthenticated: () => {
        const state = get();
        const hasAuth = !!(state.token && state.user);
        console.log('Checking auth state:', { hasAuth });
        return hasAuth;
      },
      isSuperAdmin: () => {
        const state = get();
        return state.user?.role === 'super_admin';
      },
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          console.log('Getting from storage:', { name, value: str });
          return str ? JSON.parse(str) : null;
        },
        setItem: (name, value) => {
          console.log('Setting to storage:', { name, value });
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
); 