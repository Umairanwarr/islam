import React from 'react';

function About() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/about-me.jpg" 
                alt="Imam portrait" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Who Am I?</h2>
            
            <p className="text-lg text-gray-700 mb-6">
              I am an experienced Imam and Islamic teacher with over 27 years of service in both 
              Saudi Arabia and the United Kingdom. I began my journey in the holy city of Makkah, 
              serving as a teacher and Imam. Later, I continued teaching in various Islamic centres 
              and mosques across the UK.
            </p>
            
            <p className="text-lg text-gray-700 mb-10">
              My goal is to utilize this platform to continue serving the Ummah through daily 
              recitations, educational videos, and Islamic materials to help Muslims strengthen 
              their faith and connection to Allah.
            </p>
            
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Experience */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-lg p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Experience</h3>
                  <p className="text-gray-600">27+ years as Imam and teacher</p>
                </div>
              </div>
              
              {/* Locations */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-lg p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Locations</h3>
                  <p className="text-gray-600">Makkah, Saudi Arabia and across the UK</p>
                </div>
              </div>
              
              {/* Teaching */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-lg p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Teaching</h3>
                  <p className="text-gray-600">Quran, Hadith, and Islamic Studies</p>
                </div>
              </div>
              
              {/* Languages */}
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-50 rounded-lg p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Languages</h3>
                  <p className="text-gray-600">Arabic, English, and Urdu</p>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="mt-6">
              <a href="#" className="inline-block px-6 py-3 bg-teal-600 text-white font-medium text-base rounded-md shadow hover:bg-teal-700 transition duration-300">
                Learn More About Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
