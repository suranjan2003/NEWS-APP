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
        "title": "Ozempic may significantly lower the risk of Alzheimer’s disease — here’s how - New York Post",
        "url": "https://nypost.com/2024/10/24/lifestyle/ozempic-may-lower-the-risk-of-alzheimers-disease-new-study/",
        "urlToImage": "https://nypost.com/wp-content/uploads/sites/2/2024/10/92232000.jpg"
      },
      {
        "author": "Alex Sherman",
        "content": "TKO Group, the company that owns WWE and UFC, is expanding into sports-adjacent properties by acquiring three businesses for $3.25 billion from its controlling owner, Endeavor Group.\r\nThe businesses … [+2245 chars]",
        "description": "TKO Group, the company that owns UFC and WWE, is expanding its reach in the sports world by acquiring three businesses from Endeavor Group for $3.25 billion.",
        "publishedAt": "2024-10-24T10:50:42Z",
        "source": {
          "id": null,
          "name": "CNBC"
        },
        "title": "TKO Group to acquire IMG, Professional Bull Riders and On Location from Endeavor for $3.25 billion - CNBC",
        "url": "https://www.cnbc.com/2024/10/24/tko-group-to-acquire-img-pbr-and-on-location-from-endeavor.html",
        "urlToImage": "https://image.cnbcfm.com/api/v1/image/107363166-17060314842024-01-23t173451z_2098709955_rc2qn5ah21l9_rtrmadp_0_usa-stocks.jpeg?v=1706031562&w=1920&h=1080"
      },
      {
        "author": "Aaron McDade",
        "content": "United Parcel Service (UPS) shares rose as the company reported third-quarter results above analysts' expectations Thursday morning.\r\nThe shipping giant reported revenue of $22.2 billion, better than… [+1472 chars]",
        "description": "UPS shares rose Thursday morning after the company reported better-than-expected third-quarter results, returning to revenue and profit growth for the first ...",
        "publishedAt": "2024-10-24T10:29:05Z",
        "source": {
          "id": null,
          "name": "Investopedia"
        },
        "title": "UPS Stock Rises as Shipping Giant Returns To Growth - Yahoo Finance",
        "url": "https://www.investopedia.com/ups-stock-rises-as-shipping-giant-returns-to-revenue-growth-8731450",
        "urlToImage": "https://s.yimg.com/ny/api/res/1.2/_TLImXjRdqLlN.y_vCX.XA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/investopedia_245/21a573f40395d9d605d06d750f237d6a"
      },
      {
        "author": "Jackie Wattles",
        "content": "The two test pilots for the inaugural crewed flight of Boeings Starliner spacecraft NASAs Suni Williams and Butch Wilmore left Earth for the International Space Station under the impression their tri… [+7439 chars]",
        "description": "NASA’s Suni Williams and Butch Wilmore will wait until 2025 to return to Earth on their newly assigned spacecraft, SpaceX’s Crew-9. Here’s what they’re doing in space.",
        "publishedAt": "2024-10-24T10:00:00Z",
        "source": {
          "id": "cnn",
          "name": "CNN"
        },
        "title": "A SpaceX capsule is coming back to Earth. Here’s why Boeing Starliner’s astronauts aren’t on it - CNN",
        "url": "https://www.cnn.com/2024/10/24/science/boeing-astronauts-spacex-crew-8-splashdown/index.html",
        "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/spacex-dragon-endeavour.jpg?c=16x9&q=w_800,c_fill"
      },
      {
        "author": "Benjamin Guggenheim",
        "content": "For more than a decade, Richard Neal has been a quietly dominant force in tax policy, culminating in his four years as chair of the House Ways and Means Committee, arguably the most powerful panel in… [+14913 chars]",
        "description": "Brendan Neal, son of the Democrats’ longtime Ways and Means leader, has collected regular payments from his father’s campaign and received business from lobbyists on tax issues.",
        "publishedAt": "2024-10-24T09:00:00Z",
        "source": {
          "id": "politico",
          "name": "Politico"
        },
        "title": "‘Trying to curry favor’: Lobbyists on tax matters hired Richard Neal’s son - POLITICO",
        "url": "https://www.politico.com/news/2024/10/24/richard-neal-son-congress-lobbying-00181853",
        "urlToImage": "https://static.politico.com/9b/27/9c9bdecf489a810de145cee52577/ap20063519357120.jpg"
      }
    ]

  


  // Fetch articles on load
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // const response = await fetch(
        //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
        // );
        // const data = await response.json();
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