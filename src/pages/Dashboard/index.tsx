import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FilmIcon } from '@heroicons/react/24/outline';
import StatisticsCard from '../../components/Dashboard/StatisticsCard';
import apiClient from '../../lib/axios';
import { formatNumber } from '../../utils/format';
import { useVideoStore } from '../../store/video.store';
import { VideoStats } from '../../types/video';
import { useAuthStore } from '../../store/auth.store';
import Breadcrumb from '../../components/Breadcrumb';
import VideoStatsCard from '../../components/Dashboard/VideoStatsCard';

const Dashboard = () => {
  const { token } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const { stats, setStats, shouldRefetch } = useVideoStore();

  // Debug logs
  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Current token:', token);
    console.log('Stored stats:', stats);
  }, [token, stats]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['videoStats'],
    queryFn: async () => {
      const response = await apiClient.get('/api/public/videos', {
        params: { page: 1, limit: 1 },
      });
      const newStats = {
        totalVideos: parseInt(response.headers['x-total-count'] || '0'),
      };
      setStats(newStats);
      return newStats;
    },
    enabled: !!token && shouldRefetch(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // Refetch on window focus
    refetchOnWindowFocus: true,
    // Refetch every minute
    refetchInterval: 60000,
  });

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-160px)] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    console.error('Query error:', error);
  }

  // Use stored stats if available
  const displayStats = data || stats;

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      {/* Welcome Message First */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          👋 Welcome back, {user?.username}!
        </h2>
      </div>

      {/* Dashboard Title with Breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-black dark:text-white">
          Dashboard
        </h3>
        <div>
          <Breadcrumb pageName=" " />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="col-span-1">
          <VideoStatsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
