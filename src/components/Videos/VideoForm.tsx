import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Video } from '../../types/video';
import { toast } from 'react-hot-toast';

interface VideoFormProps {
  initialData?: Video;
  onSubmit: (formData: FormData) => Promise<void>;
  onCancel?: () => void;
  isEdit?: boolean;
  isManagePage?: boolean;
  onProgress?: (progress: number) => void;
}

interface FormInputs {
  title: string;
  description: string;
  video: FileList;
  thumbnail: FileList;
}

const MAX_VIDEO_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
const MAX_THUMBNAIL_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const VideoForm = ({
  initialData,
  onSubmit,
  onCancel,
  isEdit,
  isManagePage,
  onProgress,
}: VideoFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string>(
    initialData?.videoUrl || '',
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    initialData?.thumbnailUrl || '',
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
    },
  });

  const videoFile = watch('video');
  const thumbnailFile = watch('thumbnail');
  const title = watch('title');
  const description = watch('description');

  // File validation effects
  useEffect(() => {
    if (videoFile?.[0]) {
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

  // Check if form has any changes
  const hasChanges = () => {
    const titleChanged = title !== initialData?.title;
    const descriptionChanged = description !== initialData?.description;
    const hasNewVideo = !!videoFile?.[0];
    const hasNewThumbnail = !!thumbnailFile?.[0];

    return titleChanged || descriptionChanged || hasNewVideo || hasNewThumbnail;
  };

  const handleFormSubmit = async (data: FormInputs) => {
    try {
      console.log('📝 Form submission started with data:', {
        title: data.title,
        description: data.description,
        hasVideo: !!videoFile?.[0],
        hasThumbnail: !!thumbnailFile?.[0],
      });

      setIsSubmitting(true);
      const formData = new FormData();

      // Add fields in correct order
      formData.append('title', data.title.trim());
      formData.append('description', data.description.trim());
      console.log('✅ Added text fields to form data');

      if (videoFile?.[0]) {
        formData.append('video', videoFile[0]);
        console.log('✅ Added video file:', videoFile[0].name);
      }
      if (thumbnailFile?.[0]) {
        formData.append('thumbnail', thumbnailFile[0]);
        console.log('✅ Added thumbnail file:', thumbnailFile[0].name);
      }

      console.log('🚀 Submitting form data...');
      await onSubmit(formData);
      console.log('✅ Form submission successful');
    } catch (error) {
      console.error('❌ Form submission error:', error);
      if (error instanceof Error) {
        // Handle specific field errors from backend
        if (error.message.toLowerCase().includes('title')) {
          console.log('⚠️ Title validation error');
          setError('title', { message: error.message });
        } else {
          toast.error(error.message);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeVideo = () => {
    setVideoPreview('');
    // Don't set error if in edit mode
    if (!isEdit) {
      setError('video', {
        type: 'manual',
        message: 'Video is required',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Form fields */}
      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Title
        </label>
        <input
          type="text"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters',
            },
          })}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
        {errors.title && (
          <span className="mt-1 text-sm text-danger">
            {errors.title.message}
          </span>
        )}
      </div>

      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Description
        </label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>

      {/* Video Upload/Preview */}
      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Video File {!isEdit && <span className="text-danger">*</span>}
        </label>
        {!videoPreview ? (
          <div className="relative">
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              {...register('video', { required: !isEdit })}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>
        ) : (
          <div className="relative rounded-lg border-2 border-dashed border-stroke p-4 dark:border-strokedark">
            <div className="flex items-center justify-between">
              <div
                className={`w-full mx-auto ${
                  isManagePage ? 'max-w-md' : 'max-w-2xl'
                }`}
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <video
                    src={videoPreview}
                    controls
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
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
        {errors.video && (
          <span className="mt-1 text-sm text-danger">
            {errors.video.message}
          </span>
        )}
      </div>

      {/* Thumbnail Upload/Preview */}
      <div>
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          Thumbnail File {!isEdit && <span className="text-danger">*</span>}
        </label>
        {!thumbnailPreview ? (
          <div className="relative">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              {...register('thumbnail', { required: !isEdit })}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div>
        ) : (
          <div className="relative rounded-lg border-2 border-dashed border-stroke p-4 dark:border-strokedark">
            <div className="flex items-center justify-between">
              <div className="w-full max-w-[600px] mx-auto">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setThumbnailPreview('')}
                className="ml-4 flex-shrink-0 rounded-full bg-danger p-2 text-white hover:bg-opacity-90 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
        {errors.thumbnail && (
          <span className="mt-1 text-sm text-danger">
            {errors.thumbnail.message}
          </span>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={
            isSubmitting ||
            (!isEdit && (!!errors.video || !!errors.thumbnail)) ||
            (isEdit && !hasChanges())
          }
          className="rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90 disabled:bg-opacity-50"
        >
          {isSubmitting
            ? 'Saving...'
            : isEdit
            ? 'Save Changes'
            : 'Upload Video'}
        </button>
      </div>
    </form>
  );
};

export default VideoForm;
