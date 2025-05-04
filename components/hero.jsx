import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { secureDownloadFile } from '../src/utils/secureDownload';

function Hero() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [todayVideoLink, setTodayVideoLink] = useState('');
  const [embeddedVideoId, setEmbeddedVideoId] = useState('ztT8RUczkW0'); // Default video ID
  const [prayerPdfId, setPrayerPdfId] = useState('');
  const [prayerPdfName, setPrayerPdfName] = useState('Prayer_Timetable.pdf');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch video links
        const videoLinksDoc = await getDoc(doc(db, 'settings', 'videoLinks'));
        if (videoLinksDoc.exists()) {
          const data = videoLinksDoc.data();

          // Today's video link (for the button)
          if (data.todayVideo) {
            setTodayVideoLink(data.todayVideo);
          }

          // Embedded video ID
          if (data.embeddedVideoId) {
            setEmbeddedVideoId(data.embeddedVideoId);
          }
        }

        // Fetch prayer PDF
        const prayerPdfDoc = await getDoc(doc(db, 'settings', 'prayerPdf'));
        if (prayerPdfDoc.exists() && prayerPdfDoc.data().fileId) {
          const fileId = prayerPdfDoc.data().fileId;
          setPrayerPdfId(fileId);

          // Set custom filename if available
          if (prayerPdfDoc.data().fileName) {
            setPrayerPdfName(prayerPdfDoc.data().fileName);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const playVideo = () => {
    setVideoPlaying(true);
    // This will trigger the iframe to play via postMessage API when clicked
    const iframe = document.querySelector('.youtube-iframe');
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  };

  const handleDownloadPdf = async (e) => {
    e.preventDefault();

    if (!prayerPdfId) {
      alert('Prayer timetable PDF not available');
      return;
    }

    try {
      await secureDownloadFile(prayerPdfId, prayerPdfName);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('No Timetable Uploaded Yet. Please try later.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Image Section */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/islam-bg.jpg"
          alt="Mosque background"
          className="w-full h-full object-cover"
        />
        {/* Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 text-gray-800 py-6 lg:py-24 hero-content">
          <div className="w-full flex justify-center mb-4">
            <div className="inline-block px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-teal-100 max-w-[90%] sm:max-w-none text-center">
              <p className="text-sm sm:text-base md:text-lg text-[#08948c] font-semibold mb-0.5 sm:mb-1 tracking-wide text-center">
                Hall Green Community Centre
              </p>
              <p className="text-sm sm:text-base md:text-lg text-[#08948c] font-semibold tracking-wide text-center">
                UK Registered Charity No. 1144170
              </p>
            </div>
          </div>
          <p className="text-xl sm:text-3xl text-teal-600 font-bold mb-2 text-center">Assalamu Alaikum wa Rahmatullah</p>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 leading-tight">Welcome to official website</h1>
          <p className="text-sm sm:text-lg text-gray-600 mb-3 sm:mb-6">
            A place dedicated to spreading the light of the Quran and Sunnah. With over 27 years of experience in Islamic teaching—beginning in the blessed city of Makkah and continuing across the UK. Our mission is to make authentic Islamic knowledge accessible to everyone, everywhere.
          </p>
          <p className="text-sm sm:text-lg text-gray-600 mb-4 sm:mb-8">
            Explore daily reminders, Quran recitations, prayer times, and educational resources. Let's walk together on the path of knowledge and faith.
          </p>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4" style={{ opacity: 1, visibility: 'visible' }}>
            <a
              href={todayVideoLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 transition duration-300 text-sm sm:text-base"
              style={{ opacity: 1, visibility: 'visible' }}
              onClick={(e) => {
                if (!todayVideoLink) {
                  e.preventDefault();
                  alert('No video link available');
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Today's Video
            </a>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border border-teal-600 text-teal-600 rounded-md shadow hover:bg-teal-50 transition duration-300 text-sm sm:text-base"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Download Prayer Timetable
            </button>
            <a href="https://www.youtube.com/@AbuSaad17" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition duration-300 text-sm sm:text-base" style={{ opacity: 1, visibility: 'visible' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
              </svg>
              Subscribe on YouTube
            </a>
            <a href="https://www.tiktok.com/@1abusaad0" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-md shadow hover:bg-gray-800 transition duration-300 text-sm sm:text-base" style={{ opacity: 1, visibility: 'visible' }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
              Follow on TikTok
            </a>
          </div>
        </div>

        {/* YouTube Video Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center py-2 lg:py-0 mt-1 lg:mt-0">
          <div className="w-full max-w-xs sm:max-w-md md:max-w-xl rounded-lg overflow-hidden shadow-xl bg-white/90">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="youtube-iframe absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${embeddedVideoId}?enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              </iframe>

              {/* Custom play button overlay */}
              {!videoPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/50"
                  onClick={playVideo}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600 flex items-center justify-center">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;