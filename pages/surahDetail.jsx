import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { getSurahVerses, getSurahTranslation, getAvailableTranslations, getSurahInfo } from '../src/quranComApi';

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url) => {
  
  if (!url || typeof url !== 'string') {
    
    return '';
  }

  try {
    // Handle different YouTube URL formats
    let videoId = '';

    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    if (url.includes('youtube.com/watch')) {
      try {
        const urlParams = new URLSearchParams(new URL(url).search);
        videoId = urlParams.get('v');
      } catch (error) {
        
      }
    }
    // YouTube Shorts URL: https://youtube.com/shorts/VIDEO_ID or https://www.youtube.com/shorts/VIDEO_ID
    else if (url.includes('youtube.com/shorts/')) {
      try {
        const shortsPath = url.split('youtube.com/shorts/')[1];
        videoId = shortsPath.split('/')[0].split('?')[0];
      } catch (error) {
     
      }
    }
    // Short YouTube URL: https://youtu.be/VIDEO_ID
    else if (url.includes('youtu.be/')) {
      try {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      } catch (error) {
      
      }
    }
    // YouTube Embed URL: https://www.youtube.com/embed/VIDEO_ID
    else if (url.includes('youtube.com/embed/')) {
      try {
        videoId = url.split('youtube.com/embed/')[1].split('?')[0];
      } catch (error) {
       
      }
    }

    // Return embed URL if video ID was found
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    
    return embedUrl;
  } catch (error) {
    
    return '';
  }
};

const SurahDetail = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState(null);
  const [verses, setVerses] = useState([]);
  const [translation, setTranslation] = useState([]);
  const [availableTranslations, setAvailableTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState('84'); // 84 is T. Usmani (Mufti Taqi Usmani)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [surahInfo, setSurahInfo] = useState(null);

  // Fetch surah data from Firestore
  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        setLoading(true);
        const surahDoc = await getDoc(doc(db, 'surahs', id));

        if (surahDoc.exists()) {
          const surahData = surahDoc.data();
        

          // Add ID to the surah data
          setSurah({
            ...surahData,
            id: surahDoc.id
          });
        } else {
          setError('Surah not found');
        }
      } catch (err) {
      
        setError('Failed to load surah data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSurahData();
    }
  }, [id]);

  // Fetch Quran text and translation when surah data is available
  useEffect(() => {
    const fetchQuranData = async () => {
      if (!surah || !surah.surahNumber) return;

      try {
        setLoading(true);

        // Fetch surah info to check if it has bismillah
        const info = await getSurahInfo(surah.surahNumber);
        setSurahInfo(info);

        // Fetch verses with proper Arabic text
        const versesData = await getSurahVerses(surah.surahNumber);
        setVerses(versesData);

        // Fetch translation
        const translationData = await getSurahTranslation(surah.surahNumber, selectedTranslation);
        setTranslation(translationData);

        // Fetch available translations
        const translations = await getAvailableTranslations();
        setAvailableTranslations(translations);

        setError(null);
      } catch (err) {
     
        setError('Failed to load Quran data');
      } finally {
        setLoading(false);
      }
    };

    fetchQuranData();
  }, [surah, selectedTranslation]);

  // Handle translation change
  const handleTranslationChange = (e) => {
    setSelectedTranslation(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!surah) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Surah Not Found</h2>
          <p className="text-gray-600">The requested surah could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Surah Header */}
      <div className="relative min-h-[220px] sm:min-h-[250px] md:min-h-[280px] flex items-center justify-start pl-4 sm:pl-6 md:pl-10 pr-4 sm:pr-6 md:pr-10 py-8 sm:py-10 md:py-16 bg-cover bg-center overflow-hidden font-sans"
           style={{ backgroundImage: "url('/surah-bg.jpg')" }}>
        <div className="absolute inset-0 bg-[#14462c] opacity-75 z-0" />
        <div className="relative z-10 w-full max-w-3xl px-2">
          <div className="flex flex-col sm:flex-row sm:items-center mb-2 sm:mb-4">
            <span className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white text-green-800 rounded-full mb-2 sm:mb-0 sm:mr-4 text-lg sm:text-xl font-bold">
              {surah.surahNumber}
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white drop-shadow-lg tracking-tight mb-1">
                {surah.surahName}
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-normal text-green-100 leading-relaxed drop-shadow-md mb-2">
                {surah.englishNameTranslation} • {surah.verses} verses
              </p>
              {surahInfo && surahInfo.description && (
                <p className="text-xs sm:text-sm font-normal text-green-50 leading-relaxed drop-shadow-md max-w-3xl" style={{ lineHeight: '1.6' }}>
                  {surahInfo.description.replace(/<\/?[^>]+(>|$)/g, '')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Translation Selector */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center">
              <Link
                to="/surah"
                className="flex items-center text-[#08948c] hover:text-[#067a73] mr-4 text-sm sm:text-base"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Surahs
              </Link>

            </div>
            <div className="flex flex-wrap items-center w-full sm:w-auto">
              <label htmlFor="translation" className="mr-2 text-gray-700 text-sm sm:text-base">Translation:</label>
              <select
                id="translation"
                value={selectedTranslation}
                onChange={handleTranslationChange}
                className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#08948c] w-full sm:w-auto"
              >
                {availableTranslations.map((trans) => (
                  <option key={trans.identifier} value={trans.identifier}>
                    {trans.language} - {trans.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Video (if available) */}
      

      {/* YouTube Video */}
      {surah && surah.youtubeUrl && surah.youtubeUrl.trim() !== '' && (
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-[#08948c]">Surah Recitation</h3>
            {/* Video container with max-width for large screens */}
            <div className="mx-auto w-full md:w-4/5 lg:w-3/4 xl:w-2/3 max-w-3xl">
              <div className="relative w-full pb-[56.25%]">
                {(() => {
                  const embedUrl = getYouTubeEmbedUrl(surah.youtubeUrl);
                
                  return embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={`${surah.surahName} Recitation`}
                      style={{ border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full rounded"
                    ></iframe>
                  ) : (
                    <div className="absolute top-0 left-0 w-full h-full rounded bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Invalid YouTube URL</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bismillah (only shown for surahs that have it, except Surah 9) */}
      {surahInfo && surahInfo.bismillah_pre && surah.surahNumber !== 9 && (
        <div className="container mx-auto px-2 sm:px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6 mb-4 flex flex-col items-center">
            <p className="text-2xl sm:text-3xl leading-loose text-[#08948c] font-arabic text-center" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </p>
            <p className="text-sm sm:text-base text-gray-700 text-center mt-2">
              In the name of Allah, the Most Gracious, the Most Merciful
            </p>
          </div>
        </div>
      )}

      {/* Surah Content */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 md:p-6">
          {verses.map((verse, index) => (
            <div key={verse.id} className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100 last:border-0">
              <div className="flex items-start mb-3 sm:mb-4">
                <span className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-[#08948c]/10 text-[#08948c] rounded-full mr-2 sm:mr-3 text-xs sm:text-sm font-medium shrink-0">
                  {verse.verseNumber}
                </span>
                <div className="w-full">
                  {/* Arabic Text */}
                  <p className="text-xl sm:text-2xl leading-loose mb-3 sm:mb-4 text-right font-arabic" dir="rtl">
                    {verse.text}
                  </p>

                  {/* Translation */}
                  {translation[index] && (
                    <p className="text-sm sm:text-base text-gray-700">
                      {translation[index].text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-[#08948c] hover:bg-[#067a73] text-white p-2 rounded-full shadow-lg transition-all duration-300"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default SurahDetail;
