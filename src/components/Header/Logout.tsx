import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

const Logout = () => {
  const navigate = useNavigate();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
    >
      <svg
        className="fill-current"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.53437 10.7594 6.29062 11.6531 6.29062H15.5375C16.4313 6.29062 17.1875 5.53437 17.1875 4.64062V2.26874C17.1875 1.37499 16.4313 0.618744 15.5375 0.618744Z"
          fill=""
        />
        <path
          d="M15.5375 7.94062H11.6531C10.7594 7.94062 10.0031 8.69687 10.0031 9.59062V11.9625C10.0031 12.8562 10.7594 13.6125 11.6531 13.6125H15.5375C16.4313 13.6125 17.1875 12.8562 17.1875 11.9625V9.59062C17.1875 8.69687 16.4313 7.94062 15.5375 7.94062Z"
          fill=""
        />
        <path
          d="M15.5375 15.2625H11.6531C10.7594 15.2625 10.0031 16.0187 10.0031 16.9125V19.2844C10.0031 20.1781 10.7594 20.9344 11.6531 20.9344H15.5375C16.4313 20.9344 17.1875 20.1781 17.1875 19.2844V16.9125C17.1875 16.0187 16.4313 15.2625 15.5375 15.2625Z"
          fill=""
        />
      </svg>
      Logout
    </button>
  );
};

export default Logout;
