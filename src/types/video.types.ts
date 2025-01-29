export interface Video {
  _id: string;
  title: string;
  category: string;
  status: 'active' | 'inactive';
  description?: string;
  videoUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoUploadResponse {
  status: string;
  data: {
    video: Video;
  }
}

export interface VideoListResponse {
  status: string;
  data: {
    videos: Video[];
    total: number;
    page: number;
    limit: number;
  }
}

export type UpdateType = 'metadata' | 'all' | 'video' | 'thumbnail';

export interface UpdateParams {
  id: string;
  data: FormData | Record<string, any>;
  type: UpdateType;
} 