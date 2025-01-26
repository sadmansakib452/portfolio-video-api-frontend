import { useQuery } from '@tanstack/react-query';
import { VideoService } from '../../services/videoService';
import { VideoCameraIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '../../utils/format';

const VideoStatsCard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['videoCount'],
    queryFn: async () => {
      console.log('🔄 Fetching videos for count...');
      try {
        const { videos } = await VideoService.getVideos();
        const count = Array.isArray(videos) ? videos.length : 0;
        console.log('✅ Videos counted:', count);
        return count;
      } catch (error) {
        console.error('❌ Error fetching videos:', error);
        throw error;
      }
    },
    staleTime: 30000,
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Icon Container */}
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <VideoCameraIcon className="h-6 w-6 text-primary dark:text-white" />
          </div>

          {/* Stats */}
          <div>
            <h4 className="text-2xl font-bold text-black dark:text-white">
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse bg-stroke dark:bg-strokedark rounded" />
              ) : error ? (
                <span className="text-danger">Error</span>
              ) : (
                formatNumber(data || 0)
              )}
            </h4>
            <span className="text-sm font-medium text-meta-3">
              Total Videos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStatsCard;
