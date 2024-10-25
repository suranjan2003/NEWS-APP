import React from 'react';

const Slider = ({ isSidebarOpen, toggleSidebar }) => {
  const categories = [
    'India',
    'Technology',
    'Health',
    'Business',
    'Sports',
    'Entertainment',
    'Science',
    'Politics',
    'Startups',
    'International',
    'Hatke',
    'Travel',
    'Fashion',
    'Automobile',
    'Miscellaneous',
  ];

  const handleCategoryClick = () => {
    // Close the sidebar first
    toggleSidebar();
    // Reload the home page
    window.location.reload();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-200 w-1/6 transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 100 }}
      >
        {/* Sidebar Content */}
        <div className="p-4">
          <h1 className="py-4 text-2xl font-semibold">Menu</h1>
          <hr className="my-2 border-gray-400" /> {/* Line after Menu */}
          <p className="text-base mt-4">Categories</p> {/* Categories heading */}
          <ul className="px-8 mt-2 font-semibold space-y-2">
            {categories.map((category, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-red-700"
                onClick={handleCategoryClick} // Add onClick event handler
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay for clicking outside the sidebar to close it */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
          style={{ zIndex: 99 }}
        ></div>
      )}
    </>
  );
};

export default Slider;
