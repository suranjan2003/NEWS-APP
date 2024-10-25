// BottomNav.jsx
import React from 'react';
import { FaHome, FaList, FaUser } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation(); // Get the current location

  // Function to determine if the icon is active based on the current path
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 shadow-lg md:hidden">
      <ul className="flex justify-around items-center p-2">

        {/* Categories Icon */}
        <li className="flex flex-col items-center flex-1">
          <Link to="/categories" className="flex flex-col items-center">
            <FaList className={`text-lg sm:text-xl ${isActive('/categories') ? 'text-red-500' : 'text-gray-400'}`} /> 
            <span className={`text-xs sm:text-sm ${isActive('/categories') ? 'text-red-500' : 'text-gray-400'}`}>Categories</span>
          </Link>
        </li>

        {/* Home Icon */}
        <li className="flex flex-col items-center flex-1">
          <Link to="/" className="flex flex-col items-center">
            <FaHome className={`text-lg sm:text-xl ${isActive('/') ? 'text-red-500' : 'text-gray-400'}`} /> 
            <span className={`text-xs sm:text-sm ${isActive('/') ? 'text-red-500' : 'text-gray-400'}`}>Home</span>
          </Link>
        </li>

        {/* Profile Icon */}
        <li className="flex flex-col items-center flex-1">
          <Link to="/profile" className="flex flex-col items-center">
            <FaUser className={`text-lg sm:text-xl ${isActive('/profile') ? 'text-red-500' : 'text-gray-400'}`} /> 
            <span className={`text-xs sm:text-sm ${isActive('/profile') ? 'text-red-500' : 'text-gray-400'}`}>Profile</span>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default BottomNav;

