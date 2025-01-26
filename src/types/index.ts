export interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  role?: 'Admin' | 'User';
}

export interface Video {
  _id: string;
  title: string;
  slug: string;
  description: string;
  version: number;
  videoFile: {
    filename: string;
    size: number;
    mimetype: string;
  };
  thumbnailFile: {
    filename: string;
    size: number;
    mimetype: string;
  };
  videoUrl: string;
  thumbnailUrl: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface ErrorResponse {
  status: string;
  message: string;
  errors?: string[];
} 