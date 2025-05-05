import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Quran() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const playVideo = () => {
    setVideoPlaying(true);
    // This will trigger the iframe to play via postMessage API when clicked
    const iframe = document.querySelector('.quran-iframe');
    if (iframe) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  };

  const surahList = [
    {
      id: 1,
      name: 'Surah Al-Baqarah',
      description: 'The longest chapter of the Quran, containing guidance on various aspects of life.',
    },
    {
      id: 2,
      name: 'Surah Al-Imran',
      description: 'A chapter emphasizing faith, devotion, and the importance of following Allah\'s guidance.',
    },
    {
      id: 3,
      name: 'Surah An-Nisa',
      description: 'A chapter focusing on women\'s rights, family law, and social justice in Islam.',
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Quran Recitations</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Listen to daily Quran recitations, each recorded with clear tajweed and heartfelt delivery.
            Select from a growing library of surahs below.
          </p>
        </div>

        {/* Featured Surah - Al-Fatiha */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-16">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-8">
              <div className="mb-6 text-center">
                <h3 className="text-2xl text-teal-600 font-arabic">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</h3>
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">Surah Al-Fatiha</h2>
              <p className="text-gray-600 italic mb-4">"In the Name of Allah—the Most Merciful, the Especially Merciful."</p>

              <p className="text-gray-700 mb-6">
                Surah Al-Fatiha is the opening chapter of the Qur'an and a pillar of every prayer. Listen to the
                recitation below and reflect on its deep meanings.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Reflection</h3>
                <p className="text-gray-700">
                  This Surah reminds us of Allah's mercy and guidance. It sets the tone for our relationship
                  with Him. It teaches us to seek the straight path and avoid the path of those who have
                  earned Allah's anger or gone astray.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-gray-100">
              <div className="relative h-full min-h-[300px] w-full">
                <iframe
                  className="quran-iframe absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/iNpxyTQ0s6w?enablejsapi=1"
                  title="Quran Recitation"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>

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

        {/* Surah Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surahList.map((surah) => (
            <div key={surah.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img
                  src="/surah.jpg"
                  alt={surah.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{surah.name}</h3>
                <p className="text-gray-600 mb-4">{surah.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link to="/surah" className="inline-flex items-center justify-center px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-full hover:bg-teal-50 transition duration-300 text-lg font-medium">
            View All Recitations
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Quran;
