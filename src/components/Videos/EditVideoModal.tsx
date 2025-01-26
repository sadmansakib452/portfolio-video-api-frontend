import { Dialog } from '@headlessui/react';
import { Video } from '../../types/video';
import VideoForm from './VideoForm';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface EditVideoModalProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (videoId: string, formData: FormData) => Promise<void>;
  className?: string;
}

const EditVideoModal = ({
  video,
  isOpen,
  onClose,
  onUpdate,
  className,
}: EditVideoModalProps) => {
  if (!isOpen) return null;

  const [updateProgress, setUpdateProgress] = useState(0);

  const handleUpdate = async (formData: FormData) => {
    try {
      console.log('🎬 Starting video update in modal...');
      await onUpdate(video._id, formData);
      console.log('✅ Update successful in modal');
      toast.success('Video updated successfully');
      onClose();
    } catch (error) {
      console.error('❌ Modal update error:', error);
      if (error instanceof Error) {
        if (error.message === 'NO_CHANGES') {
          toast.error('No changes detected');
          return;
        }
        if (error.message.includes('login')) {
          toast.error('Please login to update videos');
          return;
        }
        if (!error.message.toLowerCase().includes('title')) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-[90%] md:max-w-[80%] lg:max-w-[60%] bg-white dark:bg-boxdark rounded-sm shadow-2xl transition-transform duration-300 ${className}`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-stroke dark:border-strokedark">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Edit Video
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {video && (
            <div className="p-4 md:p-6">
              <VideoForm
                initialData={video}
                onSubmit={handleUpdate}
                onCancel={onClose}
                isEdit
                isManagePage
                onProgress={setUpdateProgress}
              />

              {/* Upload Progress */}
              {updateProgress > 0 && updateProgress < 100 && (
                <div className="fixed bottom-4 right-4 z-[110] bg-white dark:bg-boxdark p-4 rounded-lg shadow-2xl">
                  <div className="text-sm mb-2 font-medium">
                    Uploading... {updateProgress}%
                  </div>
                  <div className="w-64 h-2 bg-stroke dark:bg-strokedark rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${updateProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditVideoModal;
