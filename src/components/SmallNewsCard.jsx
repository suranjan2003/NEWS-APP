import React from 'react';
import moment from 'moment';
import './styles.css';
import { FaShareAlt } from 'react-icons/fa';
import { GoHeart, GoHeartFill } from "react-icons/go";

const SmallNewsCard = ({ article, onToggleLike }) => {
  const { title, description, urlToImage, source, publishedAt, url, liked } = article;

  const handleLikeClick = () => {
    onToggleLike(article); // Call the parent function to toggle like status
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title || 'News Article',
        text: description || 'Check out this news article!',
        url: url || window.location.href,
      })
      .then(() => console.log('Article shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported in this browser');
    }
  };

  return (
    <div className="news-card small-card">
      <img
        src={urlToImage || '/images/no-image.png'}
        alt={title}
        className="object-cover w-full h-56"
      />
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">
          {(title === '[Removed]' || !title) ? 'No title available' : title}
        </h2>
        <p className="text-base text-gray-600">
          {(description === '[Removed]' || !description) ? 'No description available' : description}
        </p>
        <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="text-red-600 text-sm underline block">
          Read More
        </a>
        <span className="text-sm text-gray-400">
          {(!source || source.name === '[Removed]') ? 'Unknown Source' : source.name} • {publishedAt ? moment(publishedAt).fromNow() : 'No date available'}
        </span>

        {/* Like and Share Buttons */}
        <div className="flex items-center justify-start mt-1 ml-1 space-x-4">
          {/* Heart Button: Changes color based on `liked` state */}
          <button onClick={handleLikeClick} className="flex items-center text-2xl">
            {liked ? <GoHeartFill className="text-red-600" /> : <GoHeart className="text-gray-600" />}
          </button>
          <button onClick={handleShare} className="flex items-center text-xl text-gray-600">
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallNewsCard;