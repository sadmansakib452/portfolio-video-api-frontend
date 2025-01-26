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
}

const EditVideoModal = ({
  video,
  isOpen,
  onClose,
  onUpdate,
}: EditVideoModalProps) => {
  const [updateProgress, setUpdateProgress] = useState(0);

  const handleUpdate = async (formData: FormData) => {
    try {
      console.log('🎬 Starting video update in modal...');
      await onUpdate(video._id, formData);

      // Only show success and close if we reach here
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
      // Don't close modal on error
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-lg transition-all duration-300"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Dialog.Panel className="w-full max-w-3xl rounded-lg bg-white dark:bg-boxdark transform transition-all duration-300 shadow-2xl mx-auto overflow-hidden">
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-stroke dark:border-strokedark">
            <Dialog.Title className="text-xl font-semibold text-black dark:text-white">
              Edit Video
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-danger transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {video && (
            <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6 md:p-8">
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditVideoModal;
