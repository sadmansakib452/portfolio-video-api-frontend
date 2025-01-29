import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Video } from '../../types/video';

interface VideoPreviewModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
}

const VideoPreviewModal = ({ video, isOpen, onClose }: VideoPreviewModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/95" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden bg-black rounded-lg shadow-xl transition-all">
                <div className="relative">
                  {/* Title Bar - Improved for all screen sizes */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
                    <Dialog.Title
                      as="h3"
                      className="text-sm sm:text-base md:text-lg font-medium text-white line-clamp-2 sm:line-clamp-1 mr-8 max-w-[80%]"
                    >
                      {video.title}
                    </Dialog.Title>
                    <button
                      onClick={onClose}
                      className="rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </button>
                  </div>

                  {/* Video Player */}
                  <div className="relative aspect-video w-full bg-black">
                    <video
                      src={video.videoUrl}
                      className="h-full w-full"
                      controls
                      autoPlay
                      controlsList="nodownload"
                      playsInline
                      poster={video.thumbnailUrl}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default VideoPreviewModal;
