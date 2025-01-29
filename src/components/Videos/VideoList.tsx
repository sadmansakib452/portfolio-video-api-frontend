import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Video } from '../../types/video';
import VideoPreviewModal from './VideoPreviewModal';
import { formatDate } from '../../utils/format';
import { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/outline';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';

interface VideoListProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
  selectedVideos: string[];
  onSelect: (id: string) => void;
  onSelectAll: () => void;
  onBulkDelete: () => void;
}

const VideoList = ({ videos, onEdit, onDelete, selectedVideos, onSelect, onSelectAll, onBulkDelete }: VideoListProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Add logging to check video data
  useEffect(() => {
    console.log(
      '📺 Videos data:',
      videos.map((v) => ({
        id: v._id,
        title: v.title,
        createdAt: v.createdAt,
        updatedAt: v.updatedAt,
      })),
    );
  }, [videos]);

  // Add this debug effect
  useEffect(() => {
    console.log(
      'VideoList received videos:',
      videos.map((v) => ({
        id: v._id,
        title: v.title,
        dates: {
          created: v.createdAt,
          updated: v.updatedAt,
        },
      })),
    );
  }, [videos]);

  const handleThumbnailClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPreviewOpen(true);
  };

  // Add safety check
  const safeVideos =
    videos?.filter((video) => video && video._id && video.thumbnailUrl) || [];

  const handleDeleteClick = (videoId: string) => {
    setVideoToDelete(videoId);
    setIsBulkDelete(false);
    setDeleteModalOpen(true);
  };

  const handleBulkDeleteClick = () => {
    setIsBulkDelete(true);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (isBulkDelete) {
        await onBulkDelete();
      } else if (videoToDelete) {
        await onDelete(videoToDelete);
      }
    } finally {
      setIsDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="rounded-sm border-0 lg:border lg:border-stroke bg-transparent lg:bg-white px-4 pt-6 pb-2.5 shadow-none lg:shadow-default dark:lg:border-strokedark dark:lg:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-row justify-between items-center mb-6">
          <h4 className="text-xl font-semibold text-black dark:text-white">
            Videos
          </h4>
          <div className="flex items-center gap-2">
            {selectedVideos.length > 0 && (
              <button
                onClick={handleBulkDeleteClick}
                className="flex items-center gap-1.5 rounded-md bg-danger/90 hover:bg-danger py-1.5 px-3 text-sm font-medium text-white transition-all duration-200"
              >
                <TrashIcon className="w-4 h-4" />
                <span className="sr-only">Delete Selected</span>
              </button>
            )}
            <button
              onClick={onSelectAll}
              className="flex items-center gap-1.5 rounded-md bg-primary/90 hover:bg-primary py-1.5 px-3 text-sm font-medium text-white transition-all duration-200"
            >
              {selectedVideos.length === videos.length ? 'Deselect All' : 'Select All'}
            </button>
          </div>
        </div>
        
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 gap-6">
            {safeVideos.map((video) => (
              <div 
                key={video._id}
                className="relative rounded-lg overflow-hidden bg-white dark:bg-meta-4 transition-all duration-200"
              >
                <div 
                  className="relative aspect-video w-full cursor-pointer"
                  onClick={() => handleThumbnailClick(video)}
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <PlayIcon className="h-16 w-16 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="text-lg font-semibold text-black dark:text-white mb-3">
                    {video.title}
                  </h5>
                  
                  <div className="space-y-1.5 mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated: {formatDate(video.updatedAt)}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created: {formatDate(video.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-stroke dark:border-strokedark">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onEdit(video)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-md transition-colors duration-200"
                      >
                        <PencilIcon className="h-5 w-5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteClick(video._id)}
                        className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-danger hover:bg-danger/10 rounded-md transition-colors duration-200"
                      >
                        <TrashIcon className="h-5 w-5" />
                        <span>Delete</span>
                      </button>
                    </div>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-primary rounded border-stroke dark:border-strokedark cursor-pointer transition-all duration-200"
                      checked={selectedVideos.includes(video._id)}
                      onChange={() => onSelect(video._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white">
                    #
                  </th>
                  <th className="min-w-[420px] py-4 px-4 font-medium text-black dark:text-white">
                    Title
                  </th>
                  <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {safeVideos.map((video, index) => (
                  <tr 
                    key={video._id} 
                    className="group hover:bg-gray-1 dark:hover:bg-meta-4 transition-all duration-200"
                  >
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 xl:pl-11 dark:border-strokedark">
                      <p className="text-black dark:text-white">{index + 1}</p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center">
                        <div className="relative overflow-hidden rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105">
                          <div
                            className="h-20 w-32 cursor-pointer"
                            onClick={() => handleThumbnailClick(video)}
                          >
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <PlayIcon className="h-8 w-8 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col">
                          <h5 className="font-medium text-black dark:text-white">
                            {video.title}
                          </h5>
                          <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                            <span>Updated: {formatDate(video.updatedAt)}</span>
                            <span>Created: {formatDate(video.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center justify-end space-x-3.5">
                        <button
                          onClick={() => onEdit(video)}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(video._id)}
                          className="hover:text-danger transition-colors duration-200"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-primary rounded border-stroke dark:border-strokedark cursor-pointer transition-all duration-200"
                          checked={selectedVideos.includes(video._id)}
                          onChange={() => onSelect(video._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedVideo && (
        <VideoPreviewModal
          video={selectedVideo}
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedVideo(null);
          }}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title={isBulkDelete ? "Delete Selected Videos" : "Delete Video"}
        message={isBulkDelete 
          ? "Are you sure you want to delete the selected videos? This action cannot be undone."
          : "Are you sure you want to delete this video? This action cannot be undone."
        }
        itemCount={isBulkDelete ? selectedVideos.length : undefined}
        isLoading={isDeleting}
      />
    </>
  );
};

export default VideoList;
