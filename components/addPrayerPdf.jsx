import React, { useState } from 'react';
import { uploadFile } from '../src/appwrite';
import { db } from '../src/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AddPrayerPdf = ({ onClose, onUpdate, currentPdfId }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please select a PDF file');
        setPdfFile(null);
        setFileName('');
        return;
      }
      
      setPdfFile(file);
      setFileName(file.name);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!pdfFile) {
      setError('Please select a PDF file');
      setLoading(false);
      return;
    }

    try {
      // Upload PDF to Appwrite
      const uploadRes = await uploadFile(pdfFile);
      
      if (uploadRes && uploadRes.$id) {
        // Save file ID to Firestore
        await setDoc(doc(db, 'settings', 'prayerPdf'), {
          fileId: uploadRes.$id,
          fileName: fileName,
          updatedAt: new Date()
        });

        onUpdate(uploadRes.$id);
        onClose();
      } else {
        throw new Error('Upload failed - no file ID returned');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setError('Failed to upload PDF. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300">
        <h2 className="text-2xl font-bold mb-4">Upload Prayer Timetable PDF</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pdfFile">
              Prayer Timetable PDF
            </label>
            
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
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
                    htmlFor="pdfFile"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-[#08948c] hover:text-[#067a73] focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="pdfFile"
                      name="pdfFile"
                      type="file"
                      accept="application/pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF up to 10MB</p>
              </div>
            </div>
            
            {fileName && (
              <div className="mt-2 text-sm text-gray-700 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c] mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {fileName}
              </div>
            )}
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
              {loading ? 'Uploading...' : 'Upload PDF'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrayerPdf;
