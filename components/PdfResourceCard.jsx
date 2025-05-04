import React from 'react';
import { getFileUrl } from '../src/appwrite';
import { secureOpenPdfInNewTab } from '../src/utils/secureDownload';

const PdfResourceCard = ({ id, title, imageId, pdfId, pdfFileName, onDelete, onEdit, inDashboard = false }) => {
  const handleOpenPdf = async (e) => {
    e.preventDefault();

    try {
      await secureOpenPdfInNewTab(pdfId);
    } catch (error) {
      console.error('Error opening PDF:', error);
      alert('Failed to open PDF. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={getFileUrl(imageId)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

        {inDashboard ? (
          <div className="mt-auto pt-4 flex justify-between">
            <button
              onClick={() => onEdit(id)}
              className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Delete
            </button>
          </div>
        ) : (
          <button
            onClick={handleOpenPdf}
            className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
            Read
          </button>
        )}
      </div>
    </div>
  );
};

export default PdfResourceCard;
