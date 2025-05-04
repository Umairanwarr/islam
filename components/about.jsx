import React from 'react';

function About() {
  return (
    <div id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 about-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Column */}
          <div className="about-image relative">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-green-500/20 rounded-lg"></div>
            <div className="relative p-2">
              <img
                src="/about-me.png"
                alt="Imam Abu Saad"
                className="rounded-lg shadow-lg w-full border-4 border-white"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="about-content">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">About Abu Saad Abdullah Yahya</h2>
            <p className="text-lg text-gray-600 mb-6">
              Abu Saad Abdullah Yahya is a dedicated Islamic teacher, Quran reciter, and former Imam with over 27 years of experience teaching and leading prayers in Makkah, Saudi Arabia, and the UK. His passion lies in sharing the beauty and wisdom of the Qur'an through heartfelt recitations, educational videos, and spiritual reminders that inspire Muslims around the world.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Currently based in the UK, Abu Saad continues his mission of Dawah online, producing daily Qur'anic content across multiple platforms including YouTube, Instagram, Twitter, and TikTok. His calm and clear style, rooted in traditional knowledge, makes Islamic learning accessible and spiritually uplifting for all audiences.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              This website serves as a hub for his recitations, lectures, teaching resources, and opportunities to connect for educational and speaking engagements.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualified Scholar</h3>
                  <p className="text-gray-600">Ijazah in multiple Islamic disciplines including Quran, Hadith, and Fiqh.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Weekly Classes</h3>
                  <p className="text-gray-600">Regular sessions on Tafsir, Fiqh, and contemporary issues.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Counseling</h3>
                  <p className="text-gray-600">Islamic guidance for personal and family matters.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Online Resources</h3>
                  <p className="text-gray-600">Digital content to help Muslims learn and practice their faith.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
