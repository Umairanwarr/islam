import React, { useState } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddReminder = ({ onClose, onAddReminder }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      console.log("Preparing to save reminder to Firestore");
      const reminderData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        imageUrl,
        date: new Date().toISOString(),
        createdAt: serverTimestamp()
      };

      console.log("Saving reminder data:", reminderData);
      const docRef = await addDoc(collection(db, 'reminders'), reminderData);
      console.log("Document written with ID:", docRef.id);

      // Update UI and close modal
      onAddReminder({...reminderData, id: docRef.id});
      setFormData({
        title: '',
        description: '',
        category: '',
      });
      setImage(null);
      onClose();
    } catch (err) {
      console.error("Error adding reminder:", err);
      alert(`Failed to add reminder: ${err.message || 'Unknown error'}`);
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
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">Add New Reminder</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter reminder title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a category</option>
              <option value="Quran">Quran</option>
              <option value="Charity">Charity</option>
              <option value="Dhikr">Dhikr</option>
              <option value="Prayer">Prayer</option>
              <option value="Hadith">Hadith</option>
              <option value="Fasting">Fasting</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter reminder description"
              rows="4"
              required
            ></textarea>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Reminder Image
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
              className="bg-[#08948c] hover:bg-[#067a73] text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Add Reminder'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReminder;
