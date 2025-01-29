import { Admin } from '../../../types/admin.types';
import {
  TrashIcon,
  UserCircleIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface AdminListProps {
  admins: Admin[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onEdit: (admin: Admin) => void;
}

const AdminList = ({ admins, isLoading, onDelete, onEdit }: AdminListProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <UserCircleIcon className="h-16 w-16 text-gray-400" />
        <p className="mt-4 text-gray-500 dark:text-gray-400">No admins found</p>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b border-[#eee] bg-gray-2 dark:border-strokedark dark:bg-meta-4">
              <th className="py-4 px-4 text-left min-w-[250px]">
                <span className="font-medium text-black dark:text-white">
                  Username
                </span>
              </th>
              <th className="py-4 px-4 text-left min-w-[250px]">
                <span className="font-medium text-black dark:text-white">
                  Email
                </span>
              </th>
              <th className="py-4 px-4 text-left min-w-[150px]">
                <span className="font-medium text-black dark:text-white">
                  Created
                </span>
              </th>
              <th className="py-4 px-4 text-right w-[100px]">
                <span className="font-medium text-black dark:text-white">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin._id}
                className="border-b border-[#eee] dark:border-strokedark hover:bg-gray-1 dark:hover:bg-meta-4 transition-colors duration-200"
              >
                <td className="py-5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-2 dark:bg-meta-4 flex items-center justify-center">
                      <UserCircleIcon className="h-6 w-6 text-black dark:text-white" />
                    </div>
                    <p className="text-black dark:text-white font-medium">
                      {admin.username}
                    </p>
                  </div>
                </td>
                <td className="py-5 px-4">
                  <p className="text-black dark:text-white">{admin.email}</p>
                </td>
                <td className="py-5 px-4">
                  <p className="text-black dark:text-white">
                    {format(new Date(admin.createdAt), 'MMM dd, yyyy')}
                  </p>
                </td>
                <td className="py-5 px-4">
                  <div className="flex items-center justify-end space-x-3.5">
                    <button
                      onClick={() => onEdit(admin)}
                      className="hover:text-primary hover:bg-primary/30 p-2 rounded-full transition-colors duration-200"
                      title="Edit admin"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(admin._id)}
                      className="hover:text-danger hover:bg-danger/30 p-2 rounded-full transition-colors duration-200"
                      title="Delete admin"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
