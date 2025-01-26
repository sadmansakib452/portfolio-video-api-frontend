import { create } from 'zustand';
import { Video, VideoStats } from '../types/video';

interface VideoState {
  videos: Video[];
  stats: VideoStats | null;
  isLoading: boolean;
  // Actions
  setVideos: (videos: Video[]) => void;
  setStats: (stats: VideoStats) => void;
  setLoading: (loading: boolean) => void;
  // Getters
  getVideos: () => Video[];
  getStats: () => VideoStats | null;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  stats: null,
  isLoading: false,
  // Actions
  setVideos: (videos) => set({ videos }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ isLoading: loading }),
  // Getters
  getVideos: () => get().videos,
  getStats: () => get().stats,
})); 