import React, { useState, useEffect } from 'react';

function Reminder() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyVerse = async () => {
      try {
        // Check if we have a stored verse and when it was last updated
        const storedVerse = localStorage.getItem('dailyVerse');
        const lastUpdate = localStorage.getItem('lastVerseUpdate');
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastUpdateDate = lastUpdate ? new Date(lastUpdate) : null;

        // If we have a stored verse and it was updated today after 12 PM, use it
        if (storedVerse && lastUpdateDate &&
            lastUpdateDate >= new Date(today.setHours(12, 0, 0, 0)) &&
            lastUpdateDate < new Date(today.setHours(24, 0, 0, 0))) {
          setVerse(JSON.parse(storedVerse));
          setLoading(false);
          return;
        }

        // Get a random surah number (1-114)
        const randomSurah = Math.floor(Math.random() * 114) + 1;
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${randomSurah}/en.sahih`);
        const data = await response.json();

        if (data.data && data.data.ayahs) {
          // Get a random verse from the surah
          const randomVerse = Math.floor(Math.random() * data.data.ayahs.length);
          const newVerse = {
            text: data.data.ayahs[randomVerse].text,
            surah: data.data.name,
            number: data.data.ayahs[randomVerse].numberInSurah
          };

          // Store the new verse and update time
          localStorage.setItem('dailyVerse', JSON.stringify(newVerse));
          localStorage.setItem('lastVerseUpdate', new Date().toISOString());

          setVerse(newVerse);
        }
      } catch (error) {
        console.error('Error fetching verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyVerse();
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Verse of the Day</h2>

            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
              </div>
            ) : verse ? (
              <div className="text-center">
                <p className="text-xl text-gray-700 mb-4 italic">"{verse.text}"</p>
                <p className="text-lg text-teal-600 font-semibold">
                  {verse.surah} - Verse {verse.number}
                </p>
              </div>
            ) : (
              <p className="text-center text-gray-600">Unable to load verse. Please try again later.</p>
            )}

            <div className="flex justify-center mt-8">
              <a href="/daily-reminder" className="inline-flex items-center justify-center px-8 py-3 border-2 border-teal-600 text-teal-600 rounded-full hover:bg-teal-50 transition duration-300 text-lg font-medium">
                View Daily Reminder
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminder;
