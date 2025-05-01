import React, { useState, useEffect } from 'react';
import { getFileUrl } from '../src/appwrite';

export default function TestimonialCard({ id, name, location, quote, image, onDelete, onEdit, inDashboard = false }) {
  const [imgError, setImgError] = useState(false);
  const [actualImageUrl, setActualImageUrl] = useState('');

  useEffect(() => {
    // Generate the actual image URL from the file ID
    if (image) {
      try {
        // Check if image is a file ID (not a full URL)
        if (!image.startsWith('http')) {
          // It's a file ID, generate the URL
          const url = getFileUrl(image);
        
          setActualImageUrl(url);
        } else {
          // It's already a URL
          console.log(`Using direct URL for ${name}:`, image);
          setActualImageUrl(image);
        }
      } catch (error) {
        console.error(`Error generating URL for ${name}:`, error);
        setImgError(true);
      }
    } else {
      console.log(`No image for ${name}`);
    }
  }, [image, name]);

  const handleImageError = () => {
    console.error(`Image failed to load for ${name}`);
    setImgError(true);
  };

  return (
    <div className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100 transform transition duration-300 hover:shadow-md hover:-translate-y-1 testimonial-item">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="sm:mr-6 mb-4 sm:mb-0">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
            {actualImageUrl && !imgError ? (
              <img 
                src={actualImageUrl} 
                alt={`${name} from ${location}`} 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="mb-4">
            <svg className="w-8 h-8 text-teal-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10,8L4,19h6v5h7V13h-7V8z M21,8l-6,11h6v5h7V13h-7V8z"></path>
            </svg>
          </div>
          <p className="text-gray-700 italic mb-4">{quote}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-teal-700">{name}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-600">{location}</span>
            </div>
            
            {inDashboard && (
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(id)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                  title="Edit Testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => onDelete(id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                  title="Delete Testimonial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
