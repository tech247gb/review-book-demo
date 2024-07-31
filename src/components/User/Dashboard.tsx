import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  name: string;
  email: string;
}

const fadeIn = {
  animation: 'fadeIn 0.3s ease-out'
};

const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem('token');
    // Redirect to login page or home page
    navigate('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-auto inline-block text-left" ref={dropdownRef}>
      <style>{keyframes}</style>
      <div>
        <button
          type="button"
          className="flex items-center text-white hover:text-gray-200 focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full border-2 border-white shadow-md"
            src="/path-to-profile-icon.png"
            alt="User profile"
          />
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          style={{ ...fadeIn, zIndex: 9999 }} // Use a very high z-index value
        >
          <div className="py-2 px-4 border-b border-gray-200">
            <p className="text-lg font-semibold text-gray-800">{name}</p>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => handleNavigation('/user/manage-profile')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Manage Profile
            </button>
            <button
              onClick={() => handleNavigation('/user/review-book')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Review a Book
            </button>
            <button
              onClick={() => handleNavigation('/user/manage-reviews')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Manage Reviews
            </button>
            <button
              onClick={() => handleNavigation('/user/view-reviews')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              View Reviews
            </button>
            <div className="border-t border-gray-200"></div>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
