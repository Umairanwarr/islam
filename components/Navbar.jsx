import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const resourcesDropdownRef = useRef(null);

  // Don't render navbar on dashboard page
  if (location.pathname === '/mydashboard') {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsResourcesOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (resourcesDropdownRef.current && !resourcesDropdownRef.current.contains(event.target)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    // Close mobile menu and dropdown
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
    setIsResourcesOpen(false);

    // If we're already on the homepage, just scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-14 w-14 md:h-16 md:w-16 rounded-full overflow-hidden mr-2 md:mr-3">
                <img src="/logo.jpg" alt="Arraheeq Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-[#08948c]">Arraheeq</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Home with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center">
                <Link
                  to="/"
                  className={`text-base font-medium transition-all duration-300 px-3 py-1.5 rounded-md ${
                    location.pathname === '/' && !location.hash
                      ? 'text-[#08948c] hover:bg-teal-50'
                      : 'text-gray-600 hover:text-[#08948c] hover:bg-gray-50'
                  }`}
                >
                  Home
                </Link>
                <button
                  onClick={toggleDropdown}
                  className={`ml-1 p-1 rounded-md transition-all duration-300 ${
                    isDropdownOpen
                      ? 'bg-teal-50 text-[#08948c]'
                      : 'text-gray-400 hover:text-[#08948c] hover:bg-gray-50'
                  }`}
                  aria-label="Toggle dropdown menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-56 rounded-lg overflow-hidden shadow-xl bg-white border border-gray-100 transition-all duration-300 transform origin-top-left ${
                  isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-2">
                  {/* Decorative header */}
                  <div className="h-1 bg-gradient-to-r from-[#08948c] to-teal-400 mb-2"></div>

                  <button
                    onClick={() => scrollToSection('about')}
                    className="flex w-full items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c] group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">About</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('prayer-time')}
                    className="flex w-full items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c] group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Prayer Times</span>
                  </button>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="flex w-full items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c] group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Contact</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={resourcesDropdownRef}>
              <div className="flex items-center">
                <Link
                  to="/blogs"
                  className={`text-base font-medium transition-all duration-300 px-3 py-1.5 rounded-md ${
                    (location.pathname === '/blogs' || location.pathname === '/resources')
                      ? 'text-[#08948c] border-b-2 border-[#08948c]'
                      : 'text-gray-600 hover:text-[#08948c]'
                  }`}
                >
                  Resources
                </Link>
                <button
                  onClick={() => {
                    // Toggle resources dropdown
                    setIsResourcesOpen(!isResourcesOpen);
                    // Close other dropdowns
                    setIsDropdownOpen(false);
                  }}
                  className={`ml-1 p-1 rounded-md transition-all duration-300 ${
                    isResourcesOpen
                      ? 'bg-teal-50 text-[#08948c]'
                      : 'text-gray-400 hover:text-[#08948c] hover:bg-gray-50'
                  }`}
                  aria-label="Toggle resources dropdown"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Resources Dropdown Menu */}
              <div
                className={`absolute left-0 mt-2 w-48 rounded-lg overflow-hidden shadow-xl bg-white border border-gray-100 transition-all duration-300 transform origin-top-left ${
                  isResourcesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="py-2">
                  {/* Decorative header */}
                  <div className="h-1 bg-gradient-to-r from-[#08948c] to-teal-400 mb-2"></div>

                  <Link
                    to="/resources"
                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c] group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">PDF Resources</span>
                  </Link>

                  <Link
                    to="/blogs"
                    className="flex items-center px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200 group"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c] group-hover:text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5z" />
                    </svg>
                    <span className="font-medium">Blogs</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Regular Navigation Links */}
            <Link
              to="/surah"
              className={`text-base font-medium transition-colors duration-300 ${
                location.pathname === '/surah'
                  ? 'text-[#08948c] border-b-2 border-[#08948c]'
                  : 'text-gray-600 hover:text-[#08948c]'
              }`}
            >
              Quran
            </Link>
            <Link
              to="/live-class"
              className={`text-base font-medium transition-colors duration-300 ${
                location.pathname === '/live-class'
                  ? 'text-[#08948c] border-b-2 border-[#08948c]'
                  : 'text-gray-600 hover:text-[#08948c]'
              }`}
            >
              Live Classes
            </Link>
            <Link
              to="/daily-reminder"
              className={`text-base font-medium transition-colors duration-300 ${
                location.pathname === '/daily-reminder'
                  ? 'text-[#08948c] border-b-2 border-[#08948c]'
                  : 'text-gray-600 hover:text-[#08948c]'
              }`}
            >
              Daily Reminders
            </Link>
            <Link
              to="/ask-imam"
              className={`text-base font-medium transition-colors duration-300 ${
                location.pathname === '/ask-imam'
                  ? 'text-[#08948c] border-b-2 border-[#08948c]'
                  : 'text-gray-600 hover:text-[#08948c]'
              }`}
            >
              Ask Imam
            </Link>

            {/* Donate Button */}
            <a
              href="https://paypal.me/Mohammadabdullah1?country.x=GB&locale.x=en_GB"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-[#08948c] to-teal-500 text-white rounded-md hover:from-[#067a73] hover:to-teal-600 transition duration-300 shadow-md transform hover:scale-105 active:scale-95 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Donate</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-[#08948c] focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white border-t border-gray-200">
          {/* Home Section */}
          <div className="mb-4">
            {/* Section Header */}
            <div className="flex items-center px-4 py-2 mb-2">
              <Link
                to="/"
                className="flex items-center text-[#08948c] hover:text-teal-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="font-medium">Home</span>
              </Link>
            </div>

            {/* Decorative line */}
            <div className="h-0.5 bg-gradient-to-r from-[#08948c] to-teal-400 mb-2 mx-4"></div>

            {/* Home Dropdown Items */}
            <div className="space-y-1 mt-1">
              <button
                onClick={() => scrollToSection('about')}
                className="flex w-full items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className={`${location.pathname === '/' && location.hash === '#about' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                  About
                </span>
              </button>

              <button
                onClick={() => scrollToSection('prayer-time')}
                className="flex w-full items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className={`${location.pathname === '/' && location.hash === '#prayer-time' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                  Prayer Times
                </span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="flex w-full items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className={`${location.pathname === '/' && location.hash === '#contact' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                  Contact
                </span>
              </button>
            </div>

            {/* Resources Section */}
            <div className="mb-4">
              {/* Section Header */}
              <div className="flex items-center px-4 py-2 mb-2">
                <Link
                  to="/blogs"
                  className="flex items-center text-[#08948c] hover:text-teal-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-medium">Resources</span>
                </Link>
              </div>

              {/* Decorative line */}
              <div className="h-0.5 bg-gradient-to-r from-[#08948c] to-teal-400 mb-2 mx-4"></div>

              {/* Resources Dropdown Items */}
              <div className="space-y-1 mt-1">
                <Link
                  to="/resources"
                  className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className={`${location.pathname === '/resources' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                    PDF Resources
                  </span>
                </Link>

                <Link
                  to="/blogs"
                  className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-5a2 2 0 00-2 2v12a2 2 0 002 2h5z" />
                  </svg>
                  <span className={`${location.pathname === '/blogs' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                    Blogs
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-1">
            <Link
              to="/surah"
              className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className={`${location.pathname === '/surah' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                Quran
              </span>
            </Link>

            <Link
              to="/live-class"
              className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className={`${location.pathname === '/live-class' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                Live Classes
              </span>
            </Link>

            <Link
              to="/daily-reminder"
              className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className={`${location.pathname === '/daily-reminder' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                Daily Reminders
              </span>
            </Link>

            <Link
              to="/ask-imam"
              className="flex items-center py-3 px-6 rounded-md hover:bg-gradient-to-r hover:from-teal-50 hover:to-white transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-[#08948c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className={`${location.pathname === '/ask-imam' ? 'font-medium text-[#08948c]' : 'text-gray-700'}`}>
                Ask Imam
              </span>
            </Link>
          </div>

          {/* Donate Button */}
          <div className="mt-6 px-4">
            <a
              href="https://paypal.me/Mohammadabdullah1?country.x=GB&locale.x=en_GB"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-[#08948c] to-teal-500 text-white rounded-lg hover:from-[#067a73] hover:to-teal-600 transition duration-300 flex items-center justify-center shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-lg">Donate Now</span>
            </a>
            <p className="text-center text-xs text-gray-500 mt-2">Support our mission with your generous contribution</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
