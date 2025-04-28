import React, { useState, useEffect, useRef } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getAllSurahs, searchSurahs } from '../src/quranApi';

const EditSurah = ({ surah, onClose, onUpdate }) => {
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
  const [previewUrl, setPreviewUrl] = useState('');
  const [allSurahs, setAllSurahs] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  // Initialize form data when surah prop changes
  useEffect(() => {
    if (surah) {
      setFormData({
        surahName: surah.surahName || '',
        verses: surah.verses || '',
        surahNumber: surah.surahNumber || '',
        arabicText: surah.arabicText || '',
        englishName: surah.englishName || '',
        englishNameTranslation: surah.englishNameTranslation || '',
        youtubeUrl: surah.youtubeUrl || '',
      });
      setPreviewUrl(surah.imageUrl || '');
    }
  }, [surah]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = surah.imageUrl; // Keep existing image by default

      // Upload new image if selected
      if (image) {
        try {
          console.log("Uploading new image to Appwrite:", image);

          // Upload the file to Appwrite
          const uploadRes = await uploadFile(image);
          console.log("Appwrite upload response:", uploadRes);

          if (uploadRes && uploadRes.$id) {
            imageUrl = uploadRes.$id;
            console.log("Stored new file ID:", imageUrl);
          } else {
            console.error("Upload response missing file ID");
          }
        } catch (uploadErr) {
          console.error("Image upload failed:", uploadErr);
          // Continue with existing image if upload fails
        }
      }

      // Update data in Firestore
      console.log("Updating surah data in Firestore");
      const surahRef = doc(db, 'surahs', surah.id);

      const updatedData = {
        surahName: formData.surahName,
        verses: formData.verses,
        surahNumber: formData.surahNumber,
        arabicText: formData.arabicText,
        englishName: formData.englishName,
        englishNameTranslation: formData.englishNameTranslation,
        youtubeUrl: formData.youtubeUrl,
        imageUrl,
      };

      console.log("Updating surah with data:", updatedData);
      await updateDoc(surahRef, updatedData);
      console.log("Surah updated successfully");

      // Update UI and close modal
      onUpdate({ ...surah, ...updatedData });
      onClose();
    } catch (err) {
      console.error("Error updating surah:", err);
      alert(`Failed to update surah: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

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
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">Edit Surah</h2>
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
                    <span className="w-8 h-8 flex items-center justify-center bg-[#08948c]/10 text-[#08948c] rounded-full mr-2 text-xs font-medium">
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
            <div className="mb-2">
              {previewUrl && (
                <div className="relative w-full h-40 mb-2 rounded overflow-hidden">
                  <img
                    src={previewUrl.startsWith('data:') ? previewUrl : `https://cloud.appwrite.io/v1/storage/buckets/680f87410012f15bc221/files/${previewUrl}/view?project=680f7c57002f9ac7662d`}
                    alt="Surah preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>
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
              {loading ? 'Updating...' : 'Update Surah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSurah;
