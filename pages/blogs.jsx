import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import BlogCard from '../components/BlogCard';
import Footer from '../components/footer';
import '../styles/blogsPage.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Filter blogs whenever searchQuery or blogs change
    const filtered = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [searchQuery, blogs]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      // Create a query with ordering by createdAt (newest first)
      const blogsQuery = query(
        collection(db, 'blogs'),
        orderBy('createdAt', 'desc')
      );

      const blogSnapshot = await getDocs(blogsQuery);

      // Map documents to include both data and document ID
      const blogList = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to string if it exists
        createdAt: doc.data().createdAt ?
          (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
          : new Date().toISOString()
      }));

      setBlogs(blogList);
      setFilteredBlogs(blogList);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Header with Background */}
      <div className="relative bg-[#08948c] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/islamic-pattern.jpg"
            alt="Islamic Pattern Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08948c] to-teal-600 opacity-90"></div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 blogs-header">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Islamic Blogs
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-teal-50">
              Explore our collection of Islamic blogs covering various topics from Quranic teachings to daily Islamic practices.
            </p>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="flex justify-center mb-8">
            <div className="w-full max-w-md">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#08948c]"></div>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <>
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBlogs.map((blog, idx) => (
                  <BlogCard
                    key={blog.id || idx}
                    id={blog.id}
                    title={blog.title}
                    bloggerLink={blog.bloggerLink}
                    imageUrl={blog.imageUrl}
                    onDelete={null}
                    onEdit={null}
                    inDashboard={false}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              {searchQuery ? (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No Matching Blogs</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We couldn't find any blogs matching "{searchQuery}".
                    Please try a different search term or browse all blogs.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#08948c] hover:bg-teal-700"
                  >
                    Clear Search
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're currently working on creating valuable blog content for our community.
                    Please check back soon for articles on Islamic teachings, practices, and guidance.
                  </p>
                  <div className="h-1 w-20 bg-[#08948c] mx-auto my-6"></div>
                  <p className="text-gray-600 italic">
                    "Seek knowledge from the cradle to the grave." - Prophet Muhammad (PBUH)
                  </p>
                  <a href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#08948c] hover:bg-teal-700 mt-6">
                    Return to Home
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blogs;
