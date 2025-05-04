import React from 'react';

function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        {/* Simple loading spinner */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-[#08948c]/20 rounded-full"></div>

          {/* Spinner arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-[#08948c] rounded-full animate-spin"></div>
        </div>

        {/* Main title with elegant styling */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#08948c] tracking-wide mb-2 relative">
          Arraheeq
          <span className="block h-1 w-24 bg-[#08948c] mx-auto mt-1"></span>
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-gray-600 font-medium mb-1">Powered by Hall Green Community Centre</p>

        {/* Charity registration */}
        <p className="text-xs sm:text-sm text-gray-500 mb-6">UK Registered Charity No. 1144170</p>

        {/* Loading progress dots */}
        <div className="flex mt-2 space-x-2">
          <div className="w-2 h-2 bg-[#08948c] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-[#08948c] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-2 h-2 bg-[#08948c] rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Preloader;