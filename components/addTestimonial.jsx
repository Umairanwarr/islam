import React, { useState } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AddTestimonial = ({ onClose, onAddTestimonial }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    quote: '',
  });
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
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
      console.log("Preparing to save testimonial to Firestore");
      const testimonialData = {
        name: formData.name,
        location: formData.location,
        quote: formData.quote,
        image: imageUrl,
        createdAt: serverTimestamp()
      };

      console.log("Saving testimonial data:", testimonialData);
      const docRef = await addDoc(collection(db, 'testimonials'), testimonialData);
      console.log("Document written with ID:", docRef.id);

      // Update UI and close modal
      onAddTestimonial({...testimonialData, id: docRef.id});
      setFormData({
        name: '',
        location: '',
        quote: '',
      });
      setImage(null);
      setPreviewUrl('');
      onClose();
    } catch (err) {
      console.error("Error adding testimonial:", err);
      alert(`Failed to add testimonial: ${err.message || 'Unknown error'}`);
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
      const selectedFile = e.target.files[0];
      setImage(selectedFile);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Add New Testimonial</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quote">
                Testimonial Quote
              </label>
              <textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                Profile Image
              </label>
              <div className="relative">
                <label className="w-full flex items-center justify-center px-4 py-2 bg-white text-purple-600 rounded-lg shadow-sm border border-purple-300 cursor-pointer hover:bg-purple-50 transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{image ? image.name : "Choose Profile Image"}</span>
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              {previewUrl && (
                <div className="mt-4 relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
                  <img
                    src={previewUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2 transition duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center"
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
                  'Add Testimonial'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;
