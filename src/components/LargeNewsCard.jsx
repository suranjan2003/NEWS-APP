import React from 'react';
import moment from 'moment';
import './styles.css';
import { FaShareAlt } from 'react-icons/fa';
import { GoHeart, GoHeartFill } from "react-icons/go";

const LargeNewsCard = ({ article, onToggleLike }) => {
  const { title, description, urlToImage, source, publishedAt, url, liked } = article;

  const handleLikeClick = () => {
    onToggleLike(article); // Call the parent function to toggle like status
  };

  // Share article function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || 'News Article',
          text: description || 'Check out this news article!',
          url: url || window.location.href,
        });
        console.log('Article shared successfully');
      } catch (error) {
        console.error('Error sharing article:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="news-card large-card flex mt-6 p-4 shadow-lg bg-white rounded-lg ">
      {/* Cropped Image */}
      <div className="w-1/3">
        <img
          src={urlToImage || '/images/no-image.png'}
          alt={title}
          className="object-cover w-full h-64 rounded-md"  // Fixed height and aspect ratio for uniformity
        />
      </div>

      {/* Text Content Side by Side */}
      <div className="w-2/3 pl-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {(title === '[Removed]' || !title) ? 'No title available' : title}
          </h2>
          <p className="text-base text-gray-600">
            {(description === '[Removed]' || !description) ? 'No description available' : description}
          </p>
          <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="text-red-600 text-base underline">
            Read More
          </a>
          <div className="text-sm text-gray-400">
            {(!source || source.name === '[Removed]') ? 'Unknown Source' : source.name} • {publishedAt ? moment(publishedAt).fromNow() : 'No date available'}
          </div>

          {/* Like and Share Buttons */}
          <div className="flex items-center justify-start mt-1 ml-1 space-x-4">
            {/* Heart Button: Changes color based on `liked` state */}
            <button onClick={handleLikeClick} className="flex items-center text-2xl">
              {liked ? <GoHeartFill className="text-red-600" /> : <GoHeart className="text-gray-600" />}
            </button>

            {/* Share Button */}
            <button onClick={handleShare} className="flex items-center text-gray-600 hover:text-green-500">
              <FaShareAlt />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeNewsCard;
