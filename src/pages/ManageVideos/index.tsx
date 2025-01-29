import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import Breadcrumb from '../../components/Breadcrumb';
import VideoList from '../../components/Videos/VideoList';
import EditVideoModal from '../../components/Videos/EditVideoModal';
import { VideoService } from '../../services/videoService';
import { Video } from '../../types/video';
import {
  XMarkIcon,
  VideoCameraIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useVideoStore } from '../../store/video.store';
import apiClient from '../../lib/axios';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { UpdateParams } from '../../types/video.types';

const StatBox = ({ title, value }: { title: string; value: number }) => (
  <div className="flex flex-1 min-w-[80px] flex-col items-center justify-center rounded-xl p-3 bg-white dark:bg-boxdark border border-stroke dark:border-strokedark hover:shadow-md transition-all duration-300">
    <h4 className="text-2xl md:text-3xl font-bold text-black dark:text-white">
      {value}
    </h4>
    <span className="text-xs md:text-sm font-medium text-body">{title}</span>
  </div>
);

const ManageVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    videos,
    setVideos,
    removeVideo,
    currentPage,
    pageSize,
    totalPages,
    setPage,
    updateVideo: updateVideoInStore,
    selectedVideos,
    selectVideo,
    deselectVideo,
    selectAllVideos,
    clearSelection,
    bulkDeleteVideos,
  } = useVideoStore();

  // Optimistic update for delete
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      removeVideo(id); // Optimistic update
      try {
        await apiClient.delete(`/api/videos/${id}`);
      } catch (error) {
        // If error occurs, revert the optimistic update
        queryClient.invalidateQueries(['videos']);
        throw error;
      }
    },
    onError: (error: Error) => {
      toast.error('Failed to delete video');
      console.error('Delete error:', error);
    },
  });

  // Optimistic update for edit
  const updateMutation = useMutation({
    mutationFn: async ({ id, data, type }: UpdateParams) => {
      const videoToUpdate = videos.find((v) => v._id === id);
      if (!videoToUpdate) return;

      try {
        let response;

        switch (type) {
          case 'metadata':
            response = await apiClient.patch(`/api/videos/${id}`, data);
            break;

          case 'all':
            response = await apiClient.put(
              `/api/videos/${id}/update-all`,
              data,
              {
                headers: { 'Content-Type': 'multipart/form-data' },
              },
            );
            break;

          case 'video':
          case 'thumbnail':
            response = await apiClient.put(`/api/videos/${id}/${type}`, data, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
            break;
        }

        return response?.data;
      } catch (error) {
        // If error occurs, revert the optimistic update
        queryClient.invalidateQueries(['videos']);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success('Video updated successfully');
      queryClient.invalidateQueries(['videos']); // Refresh the videos list
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update video');
      console.error('Update error:', error);
    },
  });

  // Fetch videos with automatic updates
  const { data, isLoading, error } = useQuery({
    queryKey: ['videos', currentPage],
    queryFn: async () => {
      try {
        // Use VideoService instead of direct apiClient call
        const response = await VideoService.getVideos(currentPage, pageSize);

        if (response && Array.isArray(response.videos)) {
          setVideos(response.videos, response.total);
          return response;
        }

        return {
          videos: [],
          total: 0,
        };
      } catch (error) {
        console.error('Error fetching videos:', error);
        throw error;
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false, // Disable auto refetch
    refetchInterval: false, // Disable polling
  });

  // Effect to handle sidebar and header visibility
  useEffect(() => {
    const sidebar = document.querySelector('aside');
    const header = document.querySelector('header');

    if (isEditModalOpen) {
      // Hide sidebar on desktop only
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        sidebar?.classList.add('lg:hidden');
      }
      // Hide header on all devices
      header?.classList.add('hidden');
    } else {
      // Restore sidebar visibility
      sidebar?.classList.remove('lg:hidden');
      // Restore header visibility
      header?.classList.remove('hidden');
    }

    // Cleanup
    return () => {
      sidebar?.classList.remove('lg:hidden');
      header?.classList.remove('hidden');
    };
  }, [isEditModalOpen]);

  const handleEdit = (video: Video) => {
    setSelectedVideo(video);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      removeVideo(id); // Optimistic update
      await apiClient.delete(`/api/videos/${id}`);
    } catch (error) {
      console.error('Error deleting video:', error);
      // Revert optimistic update by refetching
      queryClient.invalidateQueries(['videos']);
    }
  };

  const handleUpdate = async (videoId: string, formData: FormData) => {
    // Check if we're updating files or just metadata
    const hasVideo = formData.has('video');
    const hasThumbnail = formData.has('thumbnail');

    if (hasVideo || hasThumbnail) {
      // If we have either new video or thumbnail, use the update-all endpoint
      updateMutation.mutate({
        id: videoId,
        data: formData,
        type: 'all',
      });
    } else {
      // If we're just updating metadata, use the metadata endpoint
      const metadataUpdate = {
        title: formData.get('title'),
        description: formData.get('description'),
      };

      updateMutation.mutate({
        id: videoId,
        data: metadataUpdate,
        type: 'metadata',
      });
    }
  };

  // Function to handle modal close
  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedVideo(null);
  };

  // Add Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-sm border border-stroke bg-white py-16 px-4 dark:border-strokedark dark:bg-boxdark">
      <VideoCameraIcon className="h-16 w-16 text-meta-2 dark:text-meta-4" />
      <h3 className="mt-4 text-xl font-medium text-black dark:text-white">
        No Videos Yet
      </h3>
      <p className="mt-2 text-center text-sm text-body">
        Get started by uploading your first video. Your uploaded videos will
        appear here.
      </p>
      <Link
        to="/dashboard/upload"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
      >
        <VideoCameraIcon className="h-5 w-5" />
        Upload Video
      </Link>
    </div>
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const handleSelectVideo = (videoId: string) => {
    if (selectedVideos.includes(videoId)) {
      deselectVideo(videoId);
    } else {
      selectVideo(videoId);
    }
  };

  const handleSelectAll = () => {
    if (selectedVideos.length === videos.length) {
      clearSelection();
    } else {
      selectAllVideos(videos.map((video) => video._id));
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedVideos.length) return;

    try {
      await bulkDeleteVideos(selectedVideos);
      queryClient.invalidateQueries(['videos']);
      toast.success('Selected videos deleted successfully');
    } catch (error) {
      console.error('Bulk delete error:', error);
      toast.error('Failed to delete selected videos');
    }
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

      {!videos || videos.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Improved Stats Display */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-4">
              <StatBox title="Total Videos" value={videos.length} />
              <StatBox title="Current Page" value={currentPage} />
            </div>
          </div>

          {/* Updated VideoList with mobile optimizations */}
          <VideoList
            videos={videos || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedVideos={selectedVideos}
            onSelect={handleSelectVideo}
            onSelectAll={handleSelectAll}
            onBulkDelete={handleBulkDelete}
          />

          {/* Pagination */}
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}

      {/* Edit Video Modal */}
      <EditVideoModal
        video={selectedVideo}
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        onUpdate={handleUpdate}
        className="z-[9999]"
      />
    </div>
  );
};

export default ManageVideos;
