import React, { useState, useEffect } from 'react';

function PrayerTime() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [selectedCity, setSelectedCity] = useState('London');
  const [is24Hour, setIs24Hour] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState('');
  
  const ukCities = [
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Birmingham', latitude: 52.4862, longitude: -1.8904 },
    { name: 'Manchester', latitude: 53.4808, longitude: -2.2426 },
    { name: 'Glasgow', latitude: 55.8642, longitude: -4.2518 },
    { name: 'Edinburgh', latitude: 55.9533, longitude: -3.1883 },
    { name: 'Liverpool', latitude: 53.4084, longitude: -2.9916 },
    { name: 'Bristol', latitude: 51.4545, longitude: -2.5879 },
    { name: 'Leeds', latitude: 53.8008, longitude: -1.5491 },
    { name: 'Sheffield', latitude: 53.3811, longitude: -1.4701 },
    { name: 'Cardiff', latitude: 51.4816, longitude: -3.1791 },
    { name: 'Belfast', latitude: 54.5973, longitude: -5.9301 },
    { name: 'Leicester', latitude: 52.6369, longitude: -1.1398 },
    { name: 'Bradford', latitude: 53.7960, longitude: -1.7594 },
    { name: 'Nottingham', latitude: 52.9548, longitude: -1.1581 },
    { name: 'Newcastle', latitude: 54.9783, longitude: -1.6178 }
  ];

  useEffect(() => {
    fetchPrayerTimes();
  }, [selectedCity]);

  const fetchPrayerTimes = async () => {
    setIsLoading(true);
    const selectedCityData = ukCities.find(city => city.name === selectedCity);
    
    try {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-GB', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setDate(formattedDate);
      
      const response = await fetch(`https://api.aladhan.com/v1/timings/${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}?latitude=${selectedCityData.latitude}&longitude=${selectedCityData.longitude}&method=2`);
      const data = await response.json();
      
      setPrayerTimes(data.data.timings);
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

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const toggleTimeFormat = () => {
    setIs24Hour(!is24Hour);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50 prayer-time-container">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Today's Prayer Times</h2>
            <p className="text-gray-600 mt-1">{date} | {selectedCity}, UK</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-8">
            <div className="flex flex-col items-start space-y-1">
              <span className="text-sm text-teal-600 font-medium">Choose a city from below:</span>
              <select 
                value={selectedCity} 
                onChange={handleCityChange}
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {ukCities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`text-sm ${!is24Hour ? 'font-bold text-gray-800' : 'text-gray-500'}`}>12-Hour</span>
              <button 
                onClick={toggleTimeFormat}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 bg-teal-600"
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-teal-600 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Fajr</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Fajr)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-yellow-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Sunrise</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Sunrise)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-blue-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Dhuhr</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Dhuhr)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-orange-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Asr</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Asr)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-red-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Maghrib</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Maghrib)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-indigo-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Isha</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Isha)}</p>
                <p className="text-sm text-gray-500 mt-1">Begins</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-purple-500 prayer-time-item">
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-700">Jummah</h3>
                <p className="text-2xl font-bold mt-2">{formatTime(prayerTimes?.Dhuhr)}</p>
                <p className="text-sm text-gray-500 mt-1">Friday Prayer</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrayerTime;
