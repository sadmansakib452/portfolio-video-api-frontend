import { XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-sm border border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="mb-6 text-gray-500 dark:text-gray-400">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="rounded border border-stroke py-2 px-6 text-black hover:shadow-1 dark:border-strokedark dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-danger py-2 px-6 text-white hover:bg-opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
