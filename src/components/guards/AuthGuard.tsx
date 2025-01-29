import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

interface AuthGuardProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const PUBLIC_PATHS = [
  '/auth/signin',
  '/login',
  '/auth/forgot-password',
  '/auth/reset-password',
];

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireSuperAdmin = false,
}) => {
  const { isAuthenticated, isSuperAdmin } = useAuthStore();
  const location = useLocation();

  // Allow access to public paths
  if (PUBLIC_PATHS.some(path => location.pathname.startsWith(path))) {
    return <>{children}</>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireSuperAdmin && !isSuperAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};
