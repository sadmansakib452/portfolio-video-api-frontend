import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import DefaultLayout from './layout/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/Authentication/SignIn';
import RequestResetPassword from './pages/Authentication/RequestResetPassword';
import ResetPassword from './pages/Authentication/ResetPassword';
import Dashboard from './pages/Dashboard';
import UploadVideo from './pages/UploadVideo';
import ManageVideos from './pages/ManageVideos';
import { useThemeStore } from './hooks/useThemeStore';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home/Home.jsx';
import AdminManagement from './pages/AdminManagement';

const queryClient = new QueryClient();

// Create a separate component for the redirect
const ResetPasswordRedirect = () => {
  const { token } = useParams();
  return <Navigate to={`/auth/reset-password/${token}`} replace />;
};

function App() {
  const { isDarkMode } = useThemeStore();

  // Sync theme with document on mount and theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/auth/signin" element={<SignIn />} />
              <Route
                path="/auth/forgot-password"
                element={<RequestResetPassword />}
              />
              <Route
                path="/auth/reset-password/:token"
                element={<ResetPassword />}
              />
            </Route>

            {/* Protected Routes */}
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="upload" element={<UploadVideo />} />
              <Route path="manage" element={<ManageVideos />} />
              <Route path="admins" element={<AdminManagement />} />
            </Route>

            {/* Redirect /login to /auth/signin */}
            <Route
              path="/login"
              element={<Navigate to="/auth/signin" replace />}
            />

            {/* Redirects for backward compatibility */}
            <Route
              path="/forgot-password"
              element={<Navigate to="/auth/forgot-password" replace />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordRedirect />}
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
