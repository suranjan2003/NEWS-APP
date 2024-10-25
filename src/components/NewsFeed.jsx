import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import SmallNewsCard from './SmallNewsCard';
import LargeNewsCard from './LargeNewsCard';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const apiKey = '0531fa2cea8743179afc526d48322bf3'; // Update this with your actual API key.

  const data = 
     [
      {
        "author": "Tracy Swartz",
        "content": "Type 2 diabetics may have a shot at significantly lowering their risk of Alzheimer’s disease if they take Ozempic instead.",
        "description": "Nearly 7 million Americans 65 and older are living with Alzheimer’s disease, which gradually destroys memory and thinking skills.",
        "publishedAt": "2024-10-24T11:00:00Z",
        "source": {
          "id": null,
          "name": "New York Post"
        },
        "title": "1 Ozempic may significantly lower the risk of Alzheimer’s disease — here’s how - New York Post",
        "url": "https://nypost.com/2024/10/24/lifestyle/ozempic-may-lower-the-risk-of-alzheimers-disease-new-study/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2024/10/92232000.jpg"
      },
      {
        "author": "Tracy Swartz",
        "content": "Type 2 diabetics may have a shot at significantly lowering their risk of Alzheimer’s disease if they take Ozempic instead.",
        "description": "Nearly 7 million Americans 65 and older are living with Alzheimer’s disease, which gradually destroys memory and thinking skills.",
        "publishedAt": "2024-10-24T11:00:00Z",
        "source": {
          "id": null,
          "name": "New York Post"
        },
        "title": "2 Ozempic may significantly lower the risk of Alzheimer’s disease — here’s how - New York Post",
        "url": "https://nypost.com/2024/10/24/lifestyle/ozempic-may-lower-the-risk-of-alzheimers-disease-new-study/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2024/10/92232000.jpg"
      },
      {
        "author": "Tracy Swartz",
        "content": "Type 2 diabetics may have a shot at significantly lowering their risk of Alzheimer’s disease if they take Ozempic instead.",
        "description": "Nearly 7 million Americans 65 and older are living with Alzheimer’s disease, which gradually destroys memory and thinking skills.",
        "publishedAt": "2024-10-24T11:00:00Z",
        "source": {
          "id": null,
          "name": "New York Post"
        },
        "title": "3 Ozempic may significantly lower the risk of Alzheimer’s disease — here’s how - New York Post",
        "url": "https://nypost.com/2024/10/24/lifestyle/ozempic-may-lower-the-risk-of-alzheimers-disease-new-study/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2024/10/92232000.jpg"
      },
      {
        "author": "Tracy Swartz",
        "content": "Type 2 diabetics may have a shot at significantly lowering their risk of Alzheimer’s disease if they take Ozempic instead.",
        "description": "Nearly 7 million Americans 65 and older are living with Alzheimer’s disease, which gradually destroys memory and thinking skills.",
        "publishedAt": "2024-10-24T11:00:00Z",
        "source": {
          "id": null,
          "name": "New York Post"
        },
        "title": "4 Ozempic may significantly lower the risk of Alzheimer’s disease — here’s how - New York Post",
        "url": "https://nypost.com/2024/10/24/lifestyle/ozempic-may-lower-the-risk-of-alzheimers-disease-new-study/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2024/10/92232000.jpg"
      },
    ]

  


  // Fetch articles on load
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        );
        // const data = await response.json();
        console.log(data);
        console.log('newsfeed');
        // Add a 'liked' field to each article with a default value of 0 (not liked)
        const articlesWithLikeStatus = data?.map(article => ({
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