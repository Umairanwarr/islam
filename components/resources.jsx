import React from 'react';

function Resources() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto resources-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Islamic Resources</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access a variety of educational materials to enhance your understanding of Islam and
            strengthen your faith.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* E-Books */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden resources-card h-full">
            <div className="h-2 bg-teal-600"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">Daily Islamic Reminders</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Gain spiritual insights through daily reminders about Quran, Hadith, and
                practical Islamic guidance for everyday life.
              </p>

              <a href="/daily-reminder" className="text-teal-600 font-medium hover:text-teal-700 flex items-center mt-auto">
                View Reminders
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* PDF Resources */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden resources-card h-full">
            <div className="h-2 bg-yellow-500"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">PDF Resources</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Access printable worksheets, prayer guides, and educational materials for all
                ages.
              </p>

              <a href="/resources" className="text-yellow-500 font-medium hover:text-yellow-600 flex items-center mt-auto">
                Read Books
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Live Classes */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden resources-card h-full">
            <div className="h-2 bg-blue-500"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">Live Classes</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Join interactive online classes covering Quran, Tajweed, and Islamic studies for students of all ages and levels.
              </p>

              <a href="/live-class" className="text-blue-500 font-medium hover:text-blue-600 flex items-center mt-auto">
                View Schedule
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Blog */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden resources-card h-full">
            <div className="h-2 bg-purple-600"></div>
            <div className="p-6 flex flex-col h-full">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">Blog</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Explore articles on contemporary Islamic topics, reflections on the Quran, and spiritual guidance for daily life.
              </p>

              <a href="/blogs" className="text-purple-600 font-medium hover:text-purple-700 flex items-center mt-auto">
                Read Articles
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
