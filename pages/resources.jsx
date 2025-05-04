import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import PdfResourceCard from '../components/PdfResourceCard';
import Footer from '../components/footer';
import '../styles/resourcesPage.css';

function Resources() {
  const [pdfResources, setPdfResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPdfResources();
  }, []);

  // Filter resources based on search query
  useEffect(() => {
    const filtered = pdfResources.filter(resource =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResources(filtered);
  }, [searchQuery, pdfResources]);

  const fetchPdfResources = async () => {
    try {
      setLoading(true);

      const pdfResourcesQuery = query(
        collection(db, 'pdfResources'),
        orderBy('createdAt', 'desc')
      );

      const pdfResourceSnapshot = await getDocs(pdfResourcesQuery);

      const pdfResourceList = pdfResourceSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert Firestore timestamp to string if it exists
          createdAt: data.createdAt ?
            (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt)
            : new Date().toISOString()
        };
      });

      setPdfResources(pdfResourceList);
      setFilteredResources(pdfResourceList);
      setError(null);
    } catch (err) {
      console.error('Error fetching PDF resources:', err);
      setError('Failed to load PDF resources. Please try again later.');
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 resources-header">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              Islamic PDF Resources
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-teal-50">
              Access printable worksheets, prayer guides, and educational materials for all ages.
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
                placeholder="Search resources..."
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
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
              {error}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              {searchQuery ? (
                <>
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We couldn't find any resources matching "{searchQuery}".
                    Please try a different search term or browse all resources.
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">No Resources Yet</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're currently preparing a collection of PDF resources for you to download.
                    These will include prayer guides, educational worksheets, and Islamic study materials.
                    Please check back soon!
                  </p>
                  <a href="/" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#08948c] hover:bg-teal-700">
                    Return to Home
                  </a>
                </>
              )}
            </div>
          ) : (
            <>
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing {filteredResources.length} {filteredResources.length === 1 ? 'result' : 'results'} for "{searchQuery}"
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <PdfResourceCard
                    key={resource.id}
                    id={resource.id}
                    title={resource.title}
                    imageId={resource.imageId}
                    pdfId={resource.pdfId}
                    pdfFileName={resource.pdfFileName}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resources;
