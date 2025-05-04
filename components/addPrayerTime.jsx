import React, { useState } from 'react';
import { db } from '../src/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AddPrayerTime = ({ onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fajrBegin: '',
    fajrJamat: '',
    dhuhrBegin: '',
    dhuhrJamat: '',
    asrBegin: '',
    asrJamat: '',
    maghribBegin: '',
    ishaBegin: '',
    ishaJamat: '',
    jummahKhutba: '',
    jummahJamat: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Save to Firestore in prayerTimes collection
      await setDoc(doc(db, 'settings', 'prayerTimes'), {
        ...formData,
        updatedAt: new Date()
      });

      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Error saving prayer times:', error);
      setError('Failed to save prayer times. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl transform transition-all duration-300 my-8">
        <h2 className="text-2xl font-bold mb-4">Prayer Times</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Fajr */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Fajr</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Begin Time
                  </label>
                  <input
                    type="time"
                    name="fajrBegin"
                    value={formData.fajrBegin}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Jamat Time
                  </label>
                  <input
                    type="time"
                    name="fajrJamat"
                    value={formData.fajrJamat}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Dhuhr */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Dhuhr</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Begin Time
                  </label>
                  <input
                    type="time"
                    name="dhuhrBegin"
                    value={formData.dhuhrBegin}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Jamat Time
                  </label>
                  <input
                    type="time"
                    name="dhuhrJamat"
                    value={formData.dhuhrJamat}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Asr */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Asr</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Begin Time
                  </label>
                  <input
                    type="time"
                    name="asrBegin"
                    value={formData.asrBegin}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Jamat Time
                  </label>
                  <input
                    type="time"
                    name="asrJamat"
                    value={formData.asrJamat}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Maghrib */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Maghrib</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Begin Time
                  </label>
                  <input
                    type="time"
                    name="maghribBegin"
                    value={formData.maghribBegin}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div className="text-sm text-gray-500 italic mt-2">
                  Maghrib prayer begins immediately after sunset
                </div>
              </div>
            </div>

            {/* Isha */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Isha</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Begin Time
                  </label>
                  <input
                    type="time"
                    name="ishaBegin"
                    value={formData.ishaBegin}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Jamat Time
                  </label>
                  <input
                    type="time"
                    name="ishaJamat"
                    value={formData.ishaJamat}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Jummah */}
            <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
              <h3 className="font-bold text-lg mb-2">Jummah (Friday Prayer)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Khutba Time
                  </label>
                  <input
                    type="time"
                    name="jummahKhutba"
                    value={formData.jummahKhutba}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Jamat Time
                  </label>
                  <input
                    type="time"
                    name="jummahJamat"
                    value={formData.jummahJamat}
                    onChange={handleChange}
                    className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#08948c] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#08948c] hover:bg-[#067a73] text-white px-4 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Prayer Times'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPrayerTime;
