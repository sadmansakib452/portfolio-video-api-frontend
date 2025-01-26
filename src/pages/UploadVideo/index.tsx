import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Breadcrumb from '../../components/Breadcrumb';
import { VideoService } from '../../services/videoService';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface UploadForm {
  title: string;
  description: string;
  video: FileList;
  thumbnail: FileList;
}

const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const UploadVideo = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<UploadForm>();

  // Preview states
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  // Watch for file changes
  const videoFile = watch('video');
  const thumbnailFile = watch('thumbnail');

  // Validate files when they change
  useEffect(() => {
    if (videoFile?.[0]) {
      // Validate video file
      if (!ALLOWED_VIDEO_TYPES.includes(videoFile[0].type)) {
        setError('video', {
          type: 'manual',
          message: 'Invalid video format. Allowed types: MP4, WebM, OGG',
        });
      } else if (videoFile[0].size > MAX_VIDEO_SIZE) {
        setError('video', {
          type: 'manual',
          message: 'Video size must be less than 2GB',
        });
      } else {
        clearErrors('video');
        const url = URL.createObjectURL(videoFile[0]);
        setVideoPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [videoFile, setError, clearErrors]);

  useEffect(() => {
    if (thumbnailFile?.[0]) {
      // Validate thumbnail file
      if (!ALLOWED_IMAGE_TYPES.includes(thumbnailFile[0].type)) {
        setError('thumbnail', {
          type: 'manual',
          message: 'Invalid image format. Allowed types: JPEG, PNG, WebP',
        });
      } else if (thumbnailFile[0].size > MAX_THUMBNAIL_SIZE) {
        setError('thumbnail', {
          type: 'manual',
          message: 'Thumbnail size must be less than 10MB',
        });
      } else {
        clearErrors('thumbnail');
        const url = URL.createObjectURL(thumbnailFile[0]);
        setThumbnailPreview(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [thumbnailFile, setError, clearErrors]);

  // Title availability check
  const titleValue = watch('title');
  const { data: titleCheck } = useQuery({
    queryKey: ['checkTitle', titleValue],
    queryFn: () => VideoService.checkTitle(titleValue),
    enabled: !!titleValue?.length,
    staleTime: 500,
  });

  const onSubmit = async (data: UploadForm) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      await VideoService.uploadVideo(data, (progress) => {
        setUploadProgress(Math.round(progress));
      });

      toast.success('Video uploaded successfully!');
      navigate('/dashboard/manage');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Function to remove video
  const removeVideo = () => {
    setVideoPreview('');
    // Reset the file input
    const videoInput = document.querySelector(
      'input[name="video"]',
    ) as HTMLInputElement;
    if (videoInput) {
      videoInput.value = '';
    }
    clearErrors('video');
  };

  // Function to remove thumbnail
  const removeThumbnail = () => {
    setThumbnailPreview('');
    // Reset the file input
    const thumbnailInput = document.querySelector(
      'input[name="thumbnail"]',
    ) as HTMLInputElement;
    if (thumbnailInput) {
      thumbnailInput.value = '';
    }
    clearErrors('thumbnail');
  };

  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <Breadcrumb pageName="Upload Video" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="p-6.5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Input */}
            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Video Title
              </label>
              <input
                type="text"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter video title"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.title && (
                <span className="text-sm text-danger">
                  {errors.title.message}
                </span>
              )}
              {titleCheck?.available === false && (
                <span className="text-sm text-danger">
                  Title already exists
                </span>
              )}
            </div>

            {/* Description Input */}
            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder="Enter video description"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            {/* Video Upload */}
            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Video File
              </label>
              {!videoPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="video/mp4,video/webm,video/ogg"
                    {...register('video', {
                      required: 'Video file is required',
                    })}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {errors.video && (
                    <span className="mt-1 text-sm text-danger">
                      {errors.video.message}
                    </span>
                  )}
                </div>
              ) : (
                <div className="relative rounded-lg border-2 border-dashed border-stroke p-4 dark:border-strokedark">
                  <div className="flex items-start justify-between">
                    <div className="w-full max-w-[600px] mx-auto">
                      {/* Video Preview Container */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                        <video
                          src={videoPreview}
                          controls
                          className="h-full w-full object-contain"
                        />
                      </div>
                      {/* File Info */}
                      <div className="mt-2 text-sm text-meta-1">
                        {videoFile?.[0]?.name}
                        <span className="ml-2 text-black dark:text-white">
                          ({(videoFile?.[0]?.size / (1024 * 1024)).toFixed(2)}{' '}
                          MB)
                        </span>
                      </div>
                    </div>
                    {/* Remove Button - Now positioned at top right */}
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="ml-4 flex-shrink-0 rounded-full bg-danger p-2 text-white hover:bg-opacity-90 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Thumbnail
              </label>
              {!thumbnailPreview ? (
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    {...register('thumbnail', {
                      required: 'Thumbnail is required',
                    })}
                    className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  />
                  {errors.thumbnail && (
                    <span className="mt-1 text-sm text-danger">
                      {errors.thumbnail.message}
                    </span>
                  )}
                </div>
              ) : (
                <div className="relative rounded-lg border-2 border-dashed border-stroke p-4 dark:border-strokedark">
                  <div className="flex items-start justify-between">
                    <div className="w-full max-w-[600px] mx-auto">
                      {/* Thumbnail Preview Container */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      {/* File Info */}
                      <div className="mt-2 text-sm text-meta-1">
                        {thumbnailFile?.[0]?.name}
                        <span className="ml-2 text-black dark:text-white">
                          (
                          {(thumbnailFile?.[0]?.size / (1024 * 1024)).toFixed(
                            2,
                          )}{' '}
                          MB)
                        </span>
                      </div>
                    </div>
                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="ml-4 flex-shrink-0 rounded-full bg-danger p-2 text-white hover:bg-opacity-90 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="w-full">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-stroke dark:bg-strokedark">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading || !!errors.video || !!errors.thumbnail}
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-50"
            >
              {isUploading ? `Uploading... ${uploadProgress}%` : 'Upload Video'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadVideo;
