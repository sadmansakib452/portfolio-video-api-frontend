import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FilmIcon } from '@heroicons/react/24/outline';
import StatisticsCard from '../../components/Dashboard/StatisticsCard';
import apiClient from '../../lib/axios';
import { formatNumber } from '../../utils/format';
import { useVideoStore } from '../../hooks/useVideoStore';
import { VideoStats } from '../../types/video';
import { useAuthStore } from '../../hooks/useAuthStore';
import Breadcrumb from '../../components/Breadcrumb';
import VideoStatsCard from '../../components/Dashboard/VideoStatsCard';

const Dashboard = () => {
  const { setStats, stats: storedStats } = useVideoStore();
  const { token } = useAuthStore();

  // Debug logs
  useEffect(() => {
    console.log('Dashboard mounted');
    console.log('Current token:', token);
    console.log('Stored stats:', storedStats);
  }, [token, storedStats]);

  // Debug query state
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<VideoStats>({
    queryKey: ['videoStats'],
    queryFn: async () => {
      try {
        console.log('Fetching stats...');
        const response = await apiClient.get('/api/public/videos', {
          params: { page: 1, limit: 1 },
        });
        console.log('API Response:', response);

        const totalVideos = parseInt(response.headers['x-total-count'] || '0');
        const stats = { totalVideos };
        setStats(stats);
        return stats;
      } catch (error) {
        console.error('Error fetching stats:', error);
        throw error; // Let error boundary handle it
      }
    },
    enabled: !!token,
  });

  if (error) {
    console.error('Query error:', error);
  }

  // Use stored stats if available
  const displayStats = stats || storedStats;

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-black dark:text-white">
          Dashboard
        </h2>
        <div className="ml-auto">
          <Breadcrumb pageName=" " />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="col-span-1">
          <VideoStatsCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
