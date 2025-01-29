import { api } from './api';
import { Video } from '../types/video.types';

export const videoService = {
  // ... existing methods

  bulkDelete: async (ids: string[]) => {
    const response = await api.post<{
      status: string;
      data: {
        deletedCount: number;
        successfulDeletes: string[];
      };
    }>('/api/videos/bulk-delete', { ids });
    return response.data;
  }
}; 