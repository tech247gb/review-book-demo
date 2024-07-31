import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../context/AuthContext';
import Modal from '../Modal/LogoutModal';

interface ProfileDropdownProps {
  name: string;
  email: string;
  isAuthenticated: boolean;
}

const fadeIn: React.CSSProperties = {
  animation: 'fadeIn 0.3s ease-out'
};

const slideIn: React.CSSProperties = {
  animation: 'slideIn 0.3s ease-out'
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
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: scaleY(0);
    }
    to {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ name, email }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close dropdown after navigation
  };

  const handleLogout = () => {
    setIsModalOpen(true); // Open logout confirmation modal
  };

  const confirmLogout = () => {
    localStorage.clear(); // Clear local storage
    setIsAuthenticated(false); // Update authentication state
    setIsOpen(false); // Close dropdown after logout
    setIsModalOpen(false); // Close modal
    navigate('/'); // Redirect to home
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
  const user = localStorage.getItem('user');
  const userInfo = user ? JSON.parse(user) : null;
  const initial = userInfo?.name.charAt(0).toUpperCase();
  const renderProfileIcon = () => {
    if (!isAuthenticated) {
      return (
        <img
          className="h-8 w-8 rounded-full mt-1"
          src="/icons/profile-circle.svg"
          alt="User profile"
        />
      );
    }

    return (
      <div className="flex items-center justify-center bg-primary text-white w-8 h-8 rounded-full font-bold border border-gray-300 shadow-md">
        {initial}
      </div>
    );
  };

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
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
        {renderProfileIcon()}
        </button>
      </div>
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-transform duration-300"
          style={fadeIn}
        >
          <style>{keyframes}</style>
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            style={slideIn}
          >
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 bg-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{name}</p>
                  <p className="text-xs text-gray-600">{email}</p>
                </div>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={() => handleNavigation('/user/manage-profile')}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  Manage Profile
                </button>
                <button
                  onClick={() => handleNavigation('/user/review-book')}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  Review a Book
                </button>

                <button
                  onClick={() => handleNavigation('/user/view-reviews')}
                  className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                >
                  My Reviews
                </button>
                <div className="border-t border-gray-200"></div>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-600 w-full text-left hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        description="Are you sure you want to logout?"
      />
    </div>
  );
};

export default ProfileDropdown;
