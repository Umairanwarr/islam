import React from 'react';

function Blog() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Islamic Blog</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore articles on contemporary Islamic topics, reflections on the Quran, and spiritual guidance for daily life.
          </p>
        </div>

        {/* Coming Soon Message */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We're currently working on creating insightful articles and blog posts to help you deepen your understanding of Islam.
            Please check back soon for updates!
          </p>
          <a href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700">
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Blog;
