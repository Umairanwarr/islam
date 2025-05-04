import React, { useState, useEffect } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const EditBlog = ({ blog, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: '',
    bloggerLink: '',
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        bloggerLink: blog.bloggerLink || '',
      });
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = blog.imageUrl; // Keep existing image by default

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
      console.log("Updating blog data in Firestore");
      const blogRef = doc(db, 'blogs', blog.id);

      const updatedData = {
        title: formData.title,
        bloggerLink: formData.bloggerLink,
        imageUrl,
        updatedAt: new Date().toISOString(),
      };

      await updateDoc(blogRef, updatedData);
      console.log("Document updated with ID:", blog.id);

      // Update UI and close modal
      onUpdate({...blog, ...updatedData});
      onClose();
    } catch (err) {
      console.error("Error updating blog:", err);
      alert(`Failed to update blog: ${err.message || 'Unknown error'}`);
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
    const file = e.target.files[0];
    if (file) {
      setImage(file);
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
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter blog title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bloggerLink">
              Blogger Link
            </label>
            <input
              type="url"
              id="bloggerLink"
              name="bloggerLink"
              value={formData.bloggerLink}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="https://example.blogger.com/post/123"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
              Blog Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {previewUrl ? (
                  <div>
                    <img src={previewUrl} alt="Preview" className="mx-auto h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImage(null);
                        setPreviewUrl('');
                      }}
                      className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a new image</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#08948c] hover:bg-[#067a73] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
