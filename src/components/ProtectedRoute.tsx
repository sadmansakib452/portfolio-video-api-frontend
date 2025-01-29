import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => {
    const auth = state.isAuthenticated();
    console.log('Auth check in ProtectedRoute:', {
      hasAuth: auth,
      path: location.pathname,
      token: state.token?.substring(0, 10) + '...',
    });
    return auth;
  });

  if (!isAuthenticated) {
    console.log('Redirecting - No auth found');
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Add both default and named exports
export default ProtectedRoute;
