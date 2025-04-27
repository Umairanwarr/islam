import React from 'react';

function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="fixed inset-0 bg-gradient-to-b from-white to-green-50 flex flex-col items-center justify-center z-50">
        <div className="relative w-40 h-40">
          {/* Main circular pattern */}
          <div className="absolute inset-0 border-4 border-teal-500 rounded-full animate-spin-slow"></div>
          
          {/* Inner circular pattern */}
          <div className="absolute inset-2 border-4 border-teal-400 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          
          {/* Smallest circular pattern */}
          <div className="absolute inset-4 border-4 border-teal-300 rounded-full animate-spin-slow"></div>
          
          {/* Islamic geometric pattern - Octagonal star */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* First diamond */}
              <div className="absolute w-24 h-24 border-2 border-teal-600 transform rotate-0 animate-pulse" 
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              
              {/* Second diamond */}
              <div className="absolute w-24 h-24 border-2 border-teal-600 transform rotate-45 animate-pulse" 
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <h2 className="mt-8 text-2xl font-bold text-teal-600">Imam Abu Saad</h2>
        <p className="mt-2 text-gray-600">Loading Islamic Knowledge...</p>
        
        {/* Loading progress dots */}
        <div className="flex mt-4 space-x-2">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </div>
    </div>
  );
}

export default Preloader; 