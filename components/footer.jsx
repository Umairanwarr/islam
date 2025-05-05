import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="bg-gradient-to-b from-white to-teal-50 border-t border-teal-100 footer-container">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 footer-content">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="h-24 w-24 rounded-full overflow-hidden mr-4">
                <img src="/logo.jpg" alt="Arraheeq Logo" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-[#08948c]">Arraheeq</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Providing Islamic knowledge and guidance to the community through education, counseling, and spiritual support.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-3 mt-4">
              {/* Twitter/X */}
              <a href="https://x.com/1Abusaad17" target="_blank" rel="noopener noreferrer" className="bg-teal-50 p-2 rounded-full hover:bg-teal-100 transition duration-300 border border-teal-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/1abusaad17?igsh=Z2dwdG5tbG9oMHB0" target="_blank" rel="noopener noreferrer" className="bg-teal-50 p-2 rounded-full hover:bg-teal-100 transition duration-300 border border-teal-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://www.youtube.com/@AbuSaad17" target="_blank" rel="noopener noreferrer" className="bg-teal-50 p-2 rounded-full hover:bg-teal-100 transition duration-300 border border-teal-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@1abusaad0" target="_blank" rel="noopener noreferrer" className="bg-teal-50 p-2 rounded-full hover:bg-teal-100 transition duration-300 border border-teal-200 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-teal-200 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  About
                </Link>
              </li>
              <li>
                <Link to="/#prayer-time" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link to="/surah" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Quran
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-teal-200 pb-2">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/live-class" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Islamic Classes
                </Link>
              </li>
              <li>
                <Link to="/daily-reminder" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Daily Reminders
                </Link>
              </li>
              <li>
                <Link to="/#donation" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Charity Work
                </Link>
              </li>
              <li>
                <Link to="/ask-imam" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Counseling
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  PDF Resources
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-[#08948c] transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-teal-200 pb-2">Contact Us</h3>
            <ul className="space-y-4">

              <li className="flex items-start">
                <div className="bg-teal-50 p-2 rounded-full mr-3 border border-teal-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-600">arraheeq@gmail.com</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-teal-200">
          <div className="max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Subscribe to Our Newsletter</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button className="bg-[#08948c] hover:bg-teal-700 text-white px-6 py-2 rounded-md transition duration-300 shadow-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-teal-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Arraheeq. All rights reserved.
            </p>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <p className="text-gray-500 text-sm">
                Powered by Hall Green Community Centre
              </p>
              <p className="text-gray-500 text-sm">
                UK Registered Charity No. 1144170
              </p>
              <div className="flex space-x-6">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-500 hover:text-[#08948c] text-sm"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => setShowTermsModal(true)}
                  className="text-gray-500 hover:text-[#08948c] text-sm"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#08948c]">Privacy Policy</h2>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  We respect your data and do not share your information with third parties. Your privacy is our priority.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#08948c]">Terms of Service</h2>
                <button
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Please use the website for lawful and educational purposes only. All content is owned by the author unless otherwise stated.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Footer;
