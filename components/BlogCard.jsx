import React, { useState, useEffect } from 'react';
import { getFileUrl } from '../src/appwrite';

export default function BlogCard({ id, title, bloggerLink, imageUrl, onDelete, onEdit, inDashboard = false }) {
  const [imgError, setImgError] = useState(false);
  const [actualImageUrl, setActualImageUrl] = useState('');

  useEffect(() => {
    // Generate the actual image URL from the file ID
    if (imageUrl) {
      try {
        // Check if imageUrl is a file ID (not a full URL)
        if (!imageUrl.startsWith('http')) {
          // It's a file ID, generate the URL
          const url = getFileUrl(imageUrl);
          setActualImageUrl(url);
        } else {
          // It's already a URL
          setActualImageUrl(imageUrl);
        }
      } catch (error) {
        console.error(`Error generating URL for ${title}:`, error);
        setImgError(true);
      }
    }
  }, [imageUrl, title]);

  // Handle image loading error
  const handleImageError = () => {
    setImgError(true);
  };

  const handleReadClick = (e) => {
    if (!bloggerLink) {
      e.preventDefault();
      alert('Blog link is not available');
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow bg-white transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="relative w-full h-64 bg-gray-200">
        {actualImageUrl && !imgError ? (
          <img
            src={actualImageUrl}
            alt={title}
            className="object-cover w-full h-full"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
            <div className="text-center p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">Image not available</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          {inDashboard && onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(id);
              }}
              className="text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-50"
              title="Delete Blog"
              aria-label="Delete Blog"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <div className="flex justify-between items-center mt-2">
          {inDashboard ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit && onEdit(id);
              }}
              className="text-[#08948c] hover:text-[#067a73] text-sm font-medium flex items-center"
            >
              Edit
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          ) : (
            <a
              href={bloggerLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleReadClick}
              className="text-[#08948c] hover:text-[#067a73] text-sm font-medium flex items-center"
            >
              Read
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
