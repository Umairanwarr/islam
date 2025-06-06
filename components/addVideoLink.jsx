import React, { useState } from 'react';
import { db } from '../src/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AddVideoLink = ({ onClose, onUpdate, currentLinks, type }) => {
  const [videoUrl, setVideoUrl] = useState(currentLinks?.[type] || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Determine title based on type
  const title = type === 'todayVideo' ? 'Today\'s Video Link' : 'Embedded Video';
  const description = type === 'todayVideo'
    ? 'This video link will be used for the "Watch Today\'s Video" button'
    : 'This video will be embedded in the hero section';

  const validateYouTubeUrl = (url) => {
    if (!url) return false;
    return !!extractYouTubeId(url);
  };

  const extractYouTubeId = (url) => {
    if (!url || typeof url !== 'string') {
      return '';
    }

    try {
      // Handle different YouTube URL formats
      let videoId = '';

      // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
      if (url.includes('youtube.com/watch')) {
        try {
          const urlParams = new URLSearchParams(new URL(url).search);
          videoId = urlParams.get('v');
        } catch (error) {
          console.error('Error parsing standard YouTube URL:', error);
        }
      }
      // YouTube Shorts URL: https://youtube.com/shorts/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
      else if (url.includes('youtube.com/shorts/')) {
        try {
          const shortsPath = url.split('youtube.com/shorts/')[1];
          videoId = shortsPath.split('/')[0].split('?')[0];
        } catch (error) {
          console.error('Error parsing YouTube shorts URL:', error);
        }
      }
      // Short YouTube URL: https://youtu.be/VIDEO_ID
      else if (url.includes('youtu.be/')) {
        try {
          videoId = url.split('youtu.be/')[1].split('?')[0];
        } catch (error) {
          console.error('Error parsing youtu.be URL:', error);
        }
      }
      // YouTube Embed URL: https://www.youtube.com/embed/VIDEO_ID
      else if (url.includes('youtube.com/embed/')) {
        try {
          videoId = url.split('youtube.com/embed/')[1].split('?')[0];
        } catch (error) {
          console.error('Error parsing YouTube embed URL:', error);
        }
      }

      return videoId;
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateYouTubeUrl(videoUrl)) {
      setError('Please enter a valid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      // Extract YouTube ID
      const youtubeId = extractYouTubeId(videoUrl);

      // Get existing data first
      const docRef = doc(db, 'settings', 'videoLinks');

      // Save to Firestore in settings collection
      await setDoc(docRef, {
        [type]: videoUrl,
        [`${type}Id`]: youtubeId,
        updatedAt: new Date()
      }, { merge: true }); // Use merge to update only the specified fields

      onUpdate(type, videoUrl, youtubeId);
      onClose();
    } catch (error) {
      console.error('Error saving video link:', error);
      setError('Failed to save video link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="videoUrl">
              YouTube Video URL
            </label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter any YouTube video URL (standard, shorts, or youtu.be links are supported)
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#08948c] hover:bg-[#067a73] text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Video Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVideoLink;
