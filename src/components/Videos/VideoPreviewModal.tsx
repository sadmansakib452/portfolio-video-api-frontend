import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Video } from '../../types/video';

interface VideoPreviewModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPreviewModal = ({
  video,
  isOpen,
  onClose,
}: VideoPreviewModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-[100]">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all duration-300"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-4xl rounded-lg bg-black overflow-hidden shadow-2xl transform transition-all duration-300">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <video
              src={video.videoUrl}
              controls
              autoPlay
              className="w-full aspect-video"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h3 className="text-white font-medium">{video.title}</h3>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VideoPreviewModal;
