import { lazy } from 'react';
import { AuthGuard } from '../components/guards/AuthGuard';
import DefaultLayout from '../layout/DefaultLayout';
import { Navigate } from 'react-router-dom';

const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const RequestResetPassword = lazy(() => import('../pages/Authentication/RequestResetPassword'));
const ResetPassword = lazy(() => import('../pages/Authentication/ResetPassword'));
const Unauthorized = lazy(() => import('../pages/Authentication/Unauthorized'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UploadVideo = lazy(() => import('../pages/UploadVideo'));
const ManageVideos = lazy(() => import('../pages/ManageVideos'));

const routes = [
  {
    path: '/login',
    element: <SignIn />,
  },
  {
    path: '/forgot-password',
    element: <RequestResetPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/dashboard',
        element: (
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        ),
      },
      {
        path: '/upload-video',
        element: (
          <AuthGuard>
            <UploadVideo />
          </AuthGuard>
        ),
      },
      {
        path: '/manage-videos',
        element: (
          <AuthGuard>
            <ManageVideos />
          </AuthGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
];

export default routes;
