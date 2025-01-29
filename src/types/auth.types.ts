export interface AuthUser {
  _id: string;
  username: string;
  email: string;
  role: 'super_admin' | 'admin' | 'user';
  createdAt: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  data: {
    user: AuthUser;
    token: string;
  }
}

export interface RequestPasswordResetPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
}

export interface PasswordResetResponse {
  status: string;
  message: string;
}

export interface PasswordResetError {
  status: "error";
  message: string;
  code?: string;
} 