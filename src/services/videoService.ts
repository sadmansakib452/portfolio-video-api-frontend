import apiClient from '../lib/axios';
import { Video, VideoStats } from '../types/video';
import { getToken } from '../utils/auth';

export const VideoService = {
  async getStats(): Promise<VideoStats> {
    const response = await apiClient.get('/api/public/videos', {
      params: {
        page: 1,
        limit: 1,
      },
    });
    
    const totalVideos = parseInt(response.headers['x-total-count'] || '0');
    return { totalVideos };
  },

  async getVideos(page = 1, limit = 10): Promise<{ videos: Video[]; total: number }> {
    const response = await apiClient.get('/api/public/videos', {
      params: {
        page,
        limit,
      },
    });
    
    return {
      videos: response.data.data.videos,
      total: parseInt(response.headers['x-total-count'] || '0'),
    };
  },

  async checkTitle(title: string): Promise<{ available: boolean }> {
    const response = await apiClient.post('/api/videos/check-title', { title });
    return response.data.data;
  },

  async uploadVideo(
    data: {
      title: string;
      description: string;
      video: FileList;
      thumbnail: FileList;
    },
    onProgress?: (progress: number) => void
  ): Promise<Video> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('video', data.video[0]);
    formData.append('thumbnail', data.thumbnail[0]);

    const response = await apiClient.post('/api/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded * 100) / progressEvent.total;
          onProgress(progress);
        }
      },
    });

    return response.data.data.video;
  },

  async updateVideo(
    videoId: string,
    formData: FormData,
    onProgress?: (progress: number) => void
  ): Promise<Video> {
    try {
      console.log('🚀 Starting video update process...');

      // Create new FormData with correct order
      const orderedFormData = new FormData();
      const fields = ['title', 'description', 'video', 'thumbnail'];
      let hasChanges = false;

      // Log and maintain order of fields
      console.log('📦 Form data contents:');
      fields.forEach(field => {
        const value = formData.get(field);
        if (value) {
          if (value instanceof File || (typeof value === 'string' && value.trim())) {
            orderedFormData.append(field, value);
            hasChanges = true;
            console.log(`- ${field}: ${value instanceof File ? value.name : value}`);
          }
        }
      });

      if (!hasChanges) {
        console.log('❌ No changes detected in form data');
        throw new Error('NO_CHANGES');
      }

      console.log('🔄 Sending update request...');
      const response = await apiClient.put(
        `/api/videos/${videoId}/update-all`,
        orderedFormData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (onProgress && progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`📤 Upload progress: ${progress}%`);
              onProgress(progress);
            }
          },
        }
      );

      console.log('✅ Update successful:', response.data);
      return response.data.data.video;
    } catch (error: any) {
      console.error('❌ Update error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      if (error.message === 'NO_CHANGES') throw error;
      if (error.response?.status === 401) throw new Error('Please login to update videos');
      if (error.response?.status === 404) throw new Error('Video not found');
      if (error.response?.data?.message) throw new Error(error.response.data.message);
      
      throw new Error('Failed to update video');
    }
  },

  async deleteVideo(videoId: string): Promise<void> {
    try {
      await apiClient.delete(`/api/videos/${videoId}`);
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Video not found');
      }
      throw new Error('Failed to delete video');
    }
  },
}; 