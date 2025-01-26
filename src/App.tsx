import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import DefaultLayout from './layout/DefaultLayout';
import AuthLayout from './layouts/AuthLayout';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard';
import UploadVideo from './pages/UploadVideo';
import ManageVideos from './pages/ManageVideos';
import { useThemeStore } from './hooks/useThemeStore';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home/Home.jsx';

const queryClient = new QueryClient();

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
              <Route path="/auth/signup" element={<SignUp />} />
            </Route>

            {/* Protected Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <ErrorBoundary>
                    <DefaultLayout />
                  </ErrorBoundary>
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={
                  <ErrorBoundary>
                    <Dashboard />
                  </ErrorBoundary>
                }
              />
              <Route path="upload" element={<UploadVideo />} />
              <Route path="manage" element={<ManageVideos />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" />
        </AuthProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
