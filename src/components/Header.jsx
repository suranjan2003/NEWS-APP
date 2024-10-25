import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaBars } from 'react-icons/fa';
import Slider from './Slider';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center h-14 p-4 shadow-md bg-gray-800 relative">
          {/* Hide search icon on small devices */}
          <div className="hidden md:block w-1/3">
            <input
              type="text"
              placeholder=" Search"
              className="w-3/4 p-1 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 h-14">
            <img
              src={isSmallScreen ? '/images/smallerlogo.png' : '/images/mainlogo.png'}
              alt="Company Logo"
              className="h-full w-auto"
            />
          </div>

          {/* Show hamburger icon only on larger devices */}
          <div 
            className="hidden md:flex cursor-pointer flex-col justify-between h-6 w-8 ml-auto text-gray-100" 
            onClick={toggleSidebar}
          >
            <FaBars size={24} />
          </div>

          {/* Show search icon only on small devices */}
          <div className="block md:hidden">
            {location.pathname !== '/profile' && (
              <FiSearch
                size={24}
                className="cursor-pointer text-gray-300"
                onClick={() => setSearchVisible(!searchVisible)}
              />
            )}
          </div>
        </nav>

        {/* Search Bar for Mobile */}
        {searchVisible && (
          <div
            className="absolute left-0 right-0 p-3 bg-opacity-90"
            style={{
              background: 'linear-gradient(to bottom, rgba(209, 213, 219, 0.9), rgba(209, 213, 219, 0))',
            }}
          >
            <input
              type="text"
              placeholder="Search for news"
              className="w-full p-2 pl-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 opacity-90"
            />
          </div>
        )}
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-14"></div>

      {/* Slider component */}
      <Slider isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;