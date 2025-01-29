import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { api } from '../services/api';
import { toast } from 'react-hot-toast';
import { Video, VideoStats } from '../types/video.types';

interface VideoState {
  // Video List Management
  videos: Video[];
  totalVideos: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  
  // Loading States
  isLoading: boolean;
  uploadProgress: number;
  
  // Cache Management
  lastFetched: number | null;
  
  // Actions
  setVideos: (videos: Video[]) => void;
  addVideo: (video: Video) => void;
  updateVideo: (video: Video) => void;
  removeVideo: (id: string) => void;
  setUploadProgress: (progress: number) => void;
  
  // Stats
  stats: VideoStats | null;
  setStats: (stats: VideoStats) => void;
  
  // Cache Actions
  invalidateCache: () => void;
  shouldRefetch: () => boolean;
  
  // Pagination Actions
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalPages: (total: number) => void;

  // New selection state
  selectedVideos: string[];
  isAllSelected: boolean;

  // New selection actions
  selectVideo: (id: string) => void;
  deselectVideo: (id: string) => void;
  selectAllVideos: (videoIds: string[]) => void;
  clearSelection: () => void;
  bulkDeleteVideos: (ids: string[]) => Promise<void>;
}

export const useVideoStore = create<VideoState>()(
  devtools(
    (set, get) => ({
      // Initial State
      videos: [],
      totalVideos: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,
      isLoading: false,
      uploadProgress: 0,
      lastFetched: null,
      stats: null,

      // New selection state
      selectedVideos: [],
      isAllSelected: false,

      // Actions
      setVideos: (videos) => set({ videos }),

      addVideo: (video: Video) => 
        set((state) => {
          // Ensure video has all required fields
          if (!video || !video._id || !video.thumbnailUrl) {
            console.error('Invalid video data:', video);
            return state;
          }

          return {
            videos: [video, ...state.videos],
            totalVideos: state.totalVideos + 1,
            stats: state.stats 
              ? { ...state.stats, totalVideos: (state.stats.totalVideos || 0) + 1 }
              : null
          };
        }),

      updateVideo: (updatedVideo) =>
        set((state) => ({
          videos: state.videos.map((video) =>
            video._id === updatedVideo._id ? updatedVideo : video
          ),
        })),

      removeVideo: (id) => 
        set((state) => ({
          videos: state.videos.filter((video) => video._id !== id),
          totalVideos: state.totalVideos - 1,
          stats: state.stats 
            ? { ...state.stats, totalVideos: (state.stats.totalVideos || 0) - 1 }
            : null
        })),

      setUploadProgress: (progress) => 
        set({ uploadProgress: progress }),

      setStats: (stats) => 
        set({ stats }),

      invalidateCache: () => 
        set({ lastFetched: null }),

      shouldRefetch: () => {
        const lastFetch = get().lastFetched;
        if (!lastFetch) return true;
        // Refetch if last fetch was more than 5 minutes ago
        return Date.now() - lastFetch > 5 * 60 * 1000;
      },

      // Pagination Actions
      setPage: (page) => set({ currentPage: page }),
      setPageSize: (size) => set({ pageSize: size }),
      setTotalPages: (total) => set({ totalPages: Math.ceil(total / get().pageSize) }),

      // New selection actions
      selectVideo: (id) => 
        set((state) => ({
          selectedVideos: [...state.selectedVideos, id],
          isAllSelected: state.selectedVideos.length + 1 === state.videos.length
        })),

      deselectVideo: (id) =>
        set((state) => ({
          selectedVideos: state.selectedVideos.filter(videoId => videoId !== id),
          isAllSelected: false
        })),

      selectAllVideos: (videoIds) =>
        set({
          selectedVideos: videoIds,
          isAllSelected: true
        }),

      clearSelection: () =>
        set({
          selectedVideos: [],
          isAllSelected: false
        }),

      bulkDeleteVideos: async (ids) => {
        try {
          await api.post('/api/videos/bulk-delete', { ids });
          set((state) => ({
            videos: state.videos.filter(video => !ids.includes(video._id)),
            selectedVideos: [],
            isAllSelected: false
          }));
          toast.success('Videos deleted successfully');
        } catch (error) {
          toast.error('Failed to delete videos');
          throw error;
        }
      }
    }),
    {
      name: 'video-store'
    }
  )
); 