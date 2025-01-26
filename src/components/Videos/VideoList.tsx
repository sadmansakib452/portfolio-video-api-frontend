import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Video } from '../../types/video';
import VideoPreviewModal from './VideoPreviewModal';
import { formatDate } from '../../utils/format';
import { useState, useEffect } from 'react';
import { PlayIcon } from '@heroicons/react/24/outline';

interface VideoListProps {
  videos: Video[];
  onEdit: (video: Video) => void;
  onDelete: (videoId: string) => void;
}

const VideoList = ({ videos, onEdit, onDelete }: VideoListProps) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  const handleThumbnailClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPreviewOpen(true);
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Desktop View */}
        <div className="hidden md:block max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  #
                </th>
                <th className="min-w-[420px] py-4 px-4 font-medium text-black dark:text-white">
                  Title
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video, index) => (
                <tr key={video._id} className="group">
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
                        <div className="flex flex-col gap-1 text-sm">
                          <p className="text-meta-3">
                            Last updated: {formatDate(video.updatedAt) || 'N/A'}
                          </p>
                          <p className="text-meta-5">
                            Created: {formatDate(video.createdAt) || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary transition-colors duration-200"
                        onClick={() => onEdit(video)}
                      >
                        <PencilIcon className="h-6 w-6" />
                      </button>
                      <button
                        className="hover:text-danger transition-colors duration-200"
                        onClick={() => onDelete(video._id)}
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          {videos.map((video, index) => (
            <div
              key={video._id}
              className="border-b border-stroke dark:border-strokedark p-4 space-y-4"
            >
              <div className="flex items-start space-x-4">
                <div className="relative overflow-hidden rounded-lg flex-shrink-0">
                  <div
                    className="h-20 w-32 cursor-pointer"
                    onClick={() => handleThumbnailClick(video)}
                  >
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 hover:bg-opacity-10">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <PlayIcon className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <h5 className="font-medium text-black dark:text-white mb-1">
                    {video.title}
                  </h5>
                  <div className="text-sm space-y-1">
                    <p className="text-meta-3">
                      Last updated: {formatDate(video.updatedAt)}
                    </p>
                    <p className="text-meta-5">
                      Created: {formatDate(video.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  className="text-primary hover:text-opacity-80 transition-colors"
                  onClick={() => onEdit(video)}
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  className="text-danger hover:text-opacity-80 transition-colors"
                  onClick={() => onDelete(video._id)}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
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
    </>
  );
};

export default VideoList;
