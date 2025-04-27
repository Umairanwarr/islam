import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Imam Abu Saad</h2>
            <p className="text-gray-600 mb-4">
              Providing Islamic knowledge and guidance to the community through education, counseling, and spiritual support.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              {/* Twitter/X */}
              <a href="https://x.com/1Abusaad17" target="_blank" rel="noopener noreferrer" className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              
              {/* Instagram */}
              <a href="https://www.instagram.com/1abusaad17?igsh=Z2dwdG5tbG9oMHB0" target="_blank" rel="noopener noreferrer" className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              
              {/* YouTube */}
              <a href="https://www.youtube.com/@AbuSaad17" target="_blank" rel="noopener noreferrer" className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              
              {/* TikTok */}
              <a href="https://www.tiktok.com/@1abusaad0" target="_blank" rel="noopener noreferrer" className="bg-green-50 p-2 rounded-full hover:bg-green-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Prayer Times</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Quran</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Resources</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Islamic Classes</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Counseling</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Marriage Services</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Community Events</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition duration-300">Charity Work</a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">123 Islamic Center Road, Birmingham, UK, B1 2CD</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">contact@imamwebsite.com</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">+44 123 456 7890</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} Imam Abu Saad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
