// Add logging to endpoint construction
const RESET_PASSWORD = (token: string) => {
  if (!token) {
    console.error('No token provided to RESET_PASSWORD endpoint');
    return '/api/auth/reset-password';
  }
  const endpoint = `/api/auth/reset-password/${token}`;
  console.log('Constructing reset password endpoint:', endpoint);
  return endpoint;
};

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REQUEST_RESET: '/api/auth/reset-password/request',
      RESET_PASSWORD: (token: string) => {
        if (!token) return '/api/auth/reset-password';
        return `/api/auth/reset-password/${token}`;
      },
    },
    ADMIN: {
      CREATE: '/api/admins',
      LIST: '/api/admins',
      DELETE: (id: string) => `/api/admins/${id}`,
      UPDATE: (id: string) => `/api/admins/${id}`,
      PATCH: (id: string) => `/api/admins/${id}`,
    },
    VIDEOS: {
      UPLOAD: '/api/videos/upload',
      LIST: '/api/videos',
      DELETE: (id: string) => `/api/videos/${id}`,
      UPDATE: (id: string) => `/api/videos/${id}`,
      GET: (id: string) => `/api/videos/${id}`,
    }
  }
}; 