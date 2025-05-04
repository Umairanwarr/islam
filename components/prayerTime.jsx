import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { doc, getDoc } from 'firebase/firestore';

function PrayerTime() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [is24Hour, setIs24Hour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    setIsLoading(true);

    try {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setDate(formattedDate);

      // Fetch prayer times from Firebase
      const prayerTimesDoc = await getDoc(doc(db, 'settings', 'prayerTimes'));
      if (prayerTimesDoc.exists()) {
        setPrayerTimes(prayerTimesDoc.data());
      } else {
        // Set default times if none exist
        setPrayerTimes({
          fajrBegin: '05:00',
          fajrJamat: '05:30',
          dhuhrBegin: '12:30',
          dhuhrJamat: '13:00',
          asrBegin: '15:30',
          asrJamat: '16:00',
          maghribBegin: '18:00',
          ishaBegin: '19:30',
          ishaJamat: '20:00',
          jummahKhutba: '13:00',
          jummahJamat: '13:30'
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      setIsLoading(false);
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';

    const [hours, minutes] = timeString.split(':');

    if (is24Hour) {
      return `${hours}:${minutes}`;
    } else {
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    }
  };

  const toggleTimeFormat = () => {
    setIs24Hour(!is24Hour);
  };

  return (
    <div id="prayer-time" className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 prayer-time-container">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Today's Prayer Times</h2>
            <p className="text-gray-600 mt-1">{date}</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center">
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!is24Hour ? 'font-bold text-gray-800' : 'text-gray-500'}`}>12-Hour</span>
              <button
                onClick={toggleTimeFormat}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#08948c] bg-[#08948c]"
              >
                <span
                  className={`${is24Hour ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out`}
                />
              </button>
              <span className={`text-sm ${is24Hour ? 'font-bold text-gray-800' : 'text-gray-500'}`}>24-Hour</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#08948c]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Fajr */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-[#08948c] prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Fajr</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.fajrBegin)}</p>
                  <p className="text-sm text-gray-500">Begins</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.fajrJamat)}</p>
                  <p className="text-sm text-gray-500">Jamat</p>
                </div>
              </div>
            </div>

            {/* Dhuhr */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Dhuhr</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.dhuhrBegin)}</p>
                  <p className="text-sm text-gray-500">Begins</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.dhuhrJamat)}</p>
                  <p className="text-sm text-gray-500">Jamat</p>
                </div>
              </div>
            </div>

            {/* Asr */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-orange-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Asr</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.asrBegin)}</p>
                  <p className="text-sm text-gray-500">Begins</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.asrJamat)}</p>
                  <p className="text-sm text-gray-500">Jamat</p>
                </div>
              </div>
            </div>

            {/* Maghrib */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-red-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Maghrib</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.maghribBegin)}</p>
                  <p className="text-sm text-gray-500">Begins</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-500 italic">Jamat immediately after Adhan</p>
                </div>
              </div>
            </div>

            {/* Isha */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Isha</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.ishaBegin)}</p>
                  <p className="text-sm text-gray-500">Begins</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.ishaJamat)}</p>
                  <p className="text-sm text-gray-500">Jamat</p>
                </div>
              </div>
            </div>

            {/* Jummah */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-purple-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Jummah</h3>
                <div className="mt-2">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.jummahKhutba)}</p>
                  <p className="text-sm text-gray-500">Khutba</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xl font-bold">{formatTime(prayerTimes?.jummahJamat)}</p>
                  <p className="text-sm text-gray-500">Jamat</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrayerTime;
