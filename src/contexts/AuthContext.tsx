import { createContext, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useAuthStore } from '../hooks/useAuthStore';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    token,
    user: storeUser,
    setAuth,
    clearAuth,
    setLoading,
  } = useAuthStore();

  // Verify token on mount and after token changes
  useEffect(() => {
    const verifyAuth = async () => {
      if (!token) {
        clearAuth();
        setLoading(false);
        return;
      }

      try {
        // Since there's no /me endpoint, we'll just verify the token exists
        // and use the stored user data
        if (storeUser) {
          setAuth(storeUser, token);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error('Auth verification error:', error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [token, clearAuth, setAuth, setLoading, storeUser]);

  return (
    <AuthContext.Provider
      value={{ user: storeUser, setUser: setAuth, isLoading: false }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
