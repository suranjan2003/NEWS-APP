import React, { useState, useEffect } from 'react';
import NewsFeed from '../components/NewsFeed';

const Home = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Handle window resize event
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize); // Add resize listener
    return () => window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
  }, []);

  return (
    <div className='bg-gray-300'>
      <NewsFeed/>
    </div>
  );
};

export default Home;
