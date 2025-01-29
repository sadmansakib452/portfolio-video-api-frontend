export interface Admin {
  _id: string;
  username: string;
  email: string;
  role: "admin";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminRequest {
  username?: string;
  email?: string;
  password?: string;
}

export interface UpdateAdminResponse {
  status: "success";
  data: {
    admin: Admin;
  };
}

export interface AdminError {
  status: "error";
  message: string;
  field?: "email" | "username" | "password";
}

export interface UpdateAdminError extends AdminError {
  errors?: {
    username?: string;
    email?: string;
    password?: string;
  };
}

export interface CreateAdminRequest {
  username: string;
  email: string;
  password: string;
}

export interface AdminFormData extends CreateAdminRequest {
  confirmPassword: string;
}

export interface CreateAdminError extends AdminError {
  field: "email" | "username";
} 