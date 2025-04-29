import React, { useState } from 'react';
import { db } from '../src/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditClass = ({ classData, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: classData.title || '',
    about: classData.about || '',
    time: classData.time || '',
    link: classData.link || ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const classRef = doc(db, 'classes', classData.id);
      await updateDoc(classRef, formData);
      onUpdate({ ...classData, ...formData });
      onClose();
    } catch (error) {
      alert('Failed to update class: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">Edit Class</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Class Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter class title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
              About Class
            </label>
            <textarea
              id="about"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Describe the class"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
              Class Time
            </label>
            <input
              type="datetime-local"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
              Class Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Zoom or YouTube link"
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
              {loading ? 'Updating...' : 'Update Class'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClass; 