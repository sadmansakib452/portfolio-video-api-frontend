interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between border-t border-stroke px-4 py-4 dark:border-strokedark sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-stroke px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-stroke px-4 py-2 text-sm font-medium text-black hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:text-white dark:hover:bg-meta-4"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-body">
            Page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
            {/* Pagination buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                  page === currentPage
                    ? 'z-10 bg-primary text-white focus-visible:outline-none'
                    : 'text-body hover:bg-gray-50 dark:hover:bg-meta-4'
                } ${page === 1 ? 'rounded-l-md' : ''} ${
                  page === totalPages ? 'rounded-r-md' : ''
                }`}
              >
                {page}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
