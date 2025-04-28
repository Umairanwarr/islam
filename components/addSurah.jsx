import React, { useState, useEffect, useRef } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAllSurahs, searchSurahs } from '../src/quranApi';

const AddSurah = ({ onClose, onAddSurah }) => {
  const [formData, setFormData] = useState({
    surahName: '',
    verses: '',
    surahNumber: '',
    arabicText: '',
    englishName: '',
    englishNameTranslation: '',
    youtubeUrl: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allSurahs, setAllSurahs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Fetch all surahs when component mounts
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const surahs = await getAllSurahs();
        setAllSurahs(surahs);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      }
    };

    fetchSurahs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = '';
    try {
      // Step 1: Upload image to Appwrite if available
      if (image) {
        try {
          console.log("Uploading image to Appwrite:", image);
          console.log("Image details:", {
            name: image.name,
            type: image.type,
            size: image.size
          });

          // Upload the file to Appwrite
          const uploadRes = await uploadFile(image);
          console.log("Appwrite upload response:", uploadRes);

          if (uploadRes && uploadRes.$id) {
            // Store the file ID directly - we'll generate the URL when needed
            // This approach is more reliable than storing the full URL
            imageUrl = uploadRes.$id;
            console.log("Stored file ID:", imageUrl);
          } else {
            console.error("Upload response missing file ID");
          }
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          // Continue without image if upload fails
        }
      }

      // Step 2: Save data to Firestore
      console.log("Preparing to save to Firestore");
      const surahData = {
        surahName: formData.surahName,
        verses: formData.verses,
        surahNumber: formData.surahNumber,
        arabicText: formData.arabicText,
        englishName: formData.englishName,
        englishNameTranslation: formData.englishNameTranslation,
        youtubeUrl: formData.youtubeUrl,
        imageUrl,
        createdAt: serverTimestamp()
      };

      console.log("Saving surah data:", surahData);
      const docRef = await addDoc(collection(db, 'surahs'), surahData);
      console.log("Document written with ID:", docRef.id);

      // Log the saved data for debugging
      console.log("Successfully saved surah with data:", {
        ...surahData,
        id: docRef.id
      });

      // Update UI and close modal
      onAddSurah({...surahData, id: docRef.id});
      setFormData({
        surahName: '',
        verses: '',
        surahNumber: '',
        arabicText: '',
        englishName: '',
        englishNameTranslation: '',
        youtubeUrl: ''
      });
      setImage(null);
      onClose();
    } catch (err) {
      console.error("Error adding surah:", err);
      alert(`Failed to add surah: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle clicks outside the suggestions dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If the surahName field is being changed, show suggestions
    if (name === 'surahName') {
      if (value.trim().length > 0) {
        const filteredSuggestions = searchSurahs(value, allSurahs);
        setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
  };

  const handleSelectSurah = (surah) => {
    setFormData(prev => ({
      ...prev,
      surahName: surah.englishName,
      verses: surah.numberOfAyahs,
      surahNumber: surah.number,
      arabicText: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation
    }));
    setShowSuggestions(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">Add New Surah</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surahName">
              Surah Name
            </label>
            <input
              type="text"
              id="surahName"
              name="surahName"
              value={formData.surahName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Type to search for a surah..."
              autoComplete="off"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto"
              >
                {suggestions.map((surah) => (
                  <div
                    key={surah.number}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSelectSurah(surah)}
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-800 rounded-full mr-2 text-xs font-medium">
                      {surah.number}
                    </span>
                    <div>
                      <div className="font-medium">{surah.englishName}</div>
                      <div className="text-sm text-gray-500">{surah.englishNameTranslation} • {surah.numberOfAyahs} verses</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verses">
              Number of Verses
            </label>
            <input
              type="number"
              id="verses"
              name="verses"
              value={formData.verses}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="youtubeUrl">
              YouTube Video URL
            </label>
            <input
              type="url"
              id="youtubeUrl"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-xs text-gray-500 mt-1">Enter a YouTube video URL for this surah (recitation, etc.)</p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Surah Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              required
            />
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
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Surah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSurah;