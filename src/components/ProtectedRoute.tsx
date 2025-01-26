import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, user } = useAuthStore();
  const location = useLocation();

  // Debug logs
  useEffect(() => {
    console.log('ProtectedRoute check:', {
      token,
      user,
      path: location.pathname,
    });
  }, [token, user, location]);

  if (!token || !user) {
    console.log('Redirecting to login - no auth');
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
