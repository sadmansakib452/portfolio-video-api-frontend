import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:py-20">
      <div className="mx-auto max-w-[410px]">
        <img
          src="/images/unauthorized.svg"
          alt="unauthorized"
          className="mb-7.5 h-40 w-full"
        />
        <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
          Access Denied
        </h2>
        <p className="font-medium text-body">
          You don't have permission to access this page
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-7.5 inline-flex items-center gap-2 rounded-lg border border-stroke bg-gray px-6 py-2 font-medium text-black hover:border-primary hover:bg-primary hover:text-white dark:border-strokedark dark:text-white"
        >
          <span>
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 9.02752V10.0275C17.5 13.8275 14.32 16.9775 10.5 16.9775C6.68 16.9775 3.5 13.8275 3.5 10.0275C3.5 6.22752 6.68 3.02752 10.5 3.02752"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 6.02752L9.5 3.02752L12.5 0.0275192"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
