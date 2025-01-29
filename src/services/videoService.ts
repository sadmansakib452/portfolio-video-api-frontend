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

  async getVideos(page = 1, limit = 10) {
    try {
      const response = await apiClient.get('/api/videos', {
        params: { page, limit }
      });

      if (response.data?.status === 'success' && response.data?.data) {
        return {
          videos: response.data.data.videos,
          total: response.data.data.total
        };
      }

      return {
        videos: [],
        total: 0
      };
    } catch (error) {
      console.error('Failed to fetch videos:', error);
      throw error;
    }
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

  async updateVideo(id: string, data: FormData | Record<string, any>, type: UpdateType): Promise<Video> {
    try {
      let response;
      
      switch(type) {
        case 'metadata':
          response = await apiClient.patch(`/api/videos/${id}`, data);
          break;
        
        case 'all':
          response = await apiClient.put(`/api/videos/${id}/update-all`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          break;
          
        case 'video':
        case 'thumbnail':
          response = await apiClient.put(`/api/videos/${id}/${type}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          break;
      }

      return response?.data?.data?.video;
    } catch (error) {
      throw this.handleError(error);
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