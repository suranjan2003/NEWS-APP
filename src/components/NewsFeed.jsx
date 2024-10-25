import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import SmallNewsCard from './SmallNewsCard';
import LargeNewsCard from './LargeNewsCard';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const apiKey = '0531fa2cea8743179afc526d48322bf3'; // Update this with your actual API key.

  // Fetch articles on load
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        const data = await response.json();

        // Add a 'liked' field to each article with a default value of 0 (not liked)
        const articlesWithLikeStatus = data.articles.map(article => ({
          ...article,
          liked: 0 // Default value is 0 (not liked)
        }));

        setArticles(articlesWithLikeStatus);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [apiKey]);

  // Check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Swiping configuration for smaller devices
  const handlers = useSwipeable({
    onSwipedUp: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length),
    onSwipedDown: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + articles.length) % articles.length),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Function to toggle the like status of an article
  const toggleLike = (articleToToggle) => {
    const updatedArticles = articles.map(article =>
      article === articleToToggle
        ? { ...article, liked: !article.liked } // Toggle the 'liked' status
        : article
    );
    setArticles(updatedArticles);
  };

  return (
    <div className="news-feed" {...(isSmallScreen ? handlers : {})}>
      {articles.length > 0 ? (
        isSmallScreen ? (
          <SmallNewsCard article={articles[currentIndex]} onToggleLike={toggleLike} />
        ) : (
          articles.map((article, index) => (
            <LargeNewsCard key={index} article={article} onToggleLike={toggleLike} />
          ))
        )
      ) : (
        <p className="text-red-500">Loading news...</p>
      )}
    </div>
  );
};

export default NewsFeed;