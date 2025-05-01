import React from 'react';

const Blogs = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">
          Islamic Blogs
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#08948c] mb-4">Coming Soon</h2>
          <p className="text-gray-700 mb-4">
            We're currently working on creating valuable blog content for our community. 
            Please check back soon for articles on Islamic teachings, practices, and guidance.
          </p>
          <div className="h-1 w-20 bg-[#08948c] my-6"></div>
          <p className="text-gray-600 italic">
            "Seek knowledge from the cradle to the grave." - Prophet Muhammad (PBUH)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
