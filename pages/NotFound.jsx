import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Background Image Section */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/islam-bg.jpg"
          alt="Mosque background"
          className="w-full h-full object-cover"
        />
        {/* Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/85"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number */}
          <h1 className="text-9xl font-bold text-[#08948c] mb-4 opacity-20">404</h1>

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-teal-50 p-6 rounded-full border-2 border-[#08948c]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>


          {/* Return Home Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#08948c] text-white rounded-md shadow hover:bg-teal-700 transition duration-300 text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
