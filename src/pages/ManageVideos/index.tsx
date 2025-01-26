import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumb';
import VideoList from '../../components/Videos/VideoList';
import EditVideoModal from '../../components/Videos/EditVideoModal';
import { VideoService } from '../../services/videoService';
import { Video } from '../../types/video';

const ManageVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch videos
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: () => VideoService.getVideos(),
  });

  // Update video mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      videoId,
      formData,
    }: {
      videoId: string;
      formData: FormData;
    }) => {
      console.log('🔄 Starting update mutation for video:', videoId);
      return VideoService.updateVideo(videoId, formData);
    },
    onSuccess: () => {
      console.log('✅ Update mutation successful');
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    },
    onError: (error: Error) => {
      console.error('❌ Update mutation error:', error);
    },
  });

  // Delete video mutation
  const deleteMutation = useMutation({
    mutationFn: VideoService.deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleEdit = (video: Video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (videoId: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteMutation.mutate(videoId);
    }
  };

  const handleUpdate = async (videoId: string, formData: FormData) => {
    updateMutation.mutate({ videoId, formData });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-danger">
            Error Loading Videos
          </h2>
          <p className="text-black dark:text-white">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Manage Videos" />

      {/* Video List */}
      <VideoList
        videos={videos?.videos || []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Edit Modal */}
      <EditVideoModal
        video={selectedVideo}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedVideo(null);
        }}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default ManageVideos;
