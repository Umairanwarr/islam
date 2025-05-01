import React, { useState, useEffect } from 'react';
import Footer from '../components/footer';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getFileUrl } from '../src/appwrite';

function DailyReminder() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        setLoading(true);
        const remindersQuery = query(
          collection(db, 'reminders'),
          orderBy('createdAt', 'desc')
        );
        const reminderSnapshot = await getDocs(remindersQuery);
        const reminderList = reminderSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ?
            (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
            : new Date().toISOString()
        }));
        setReminders(reminderList);
      } catch (error) {
        console.error('Error fetching reminders:', error);
        // Fallback to sample reminders if fetch fails
        setReminders([
          {
            id: 1,
            title: "Learning the Quran",
            description: "The Prophet (ﷺ) said, 'The best of you are those who learn the Quran and teach it.'",
            category: "Quran",
            date: new Date().toISOString()
          },
          {
            id: 2,
            title: "Relieving Distress",
            description: "The Prophet (ﷺ) said, 'Whoever relieves a believer's distress of the distressful aspects of this world, Allah will rescue him from a difficulty of the difficulties of the Hereafter.'",
            category: "Charity",
            date: new Date().toISOString()
          },
          {
            id: 3,
            title: "Controlling Anger",
            description: "The Prophet (ﷺ) said, 'The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry.'",
            category: "Dhikr",
            date: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner - Styled like the image */}
      <div className="relative bg-cover bg-center py-12 sm:py-16" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/reminder-bg.jpg')" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#08948c] mb-2 sm:mb-4 font-arabic">
            اذْكُرُونِي أَذْكُرْكُمْ
          </h1>
          <p className="text-lg sm:text-xl text-gray-800 mb-2 sm:mb-4 italic">
            "Remember Me, and I will remember you." (Qur'an 2:152)
          </p>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Browse our short daily reminders—perfect for spiritual reflection during a coffee
            break, commute, or between prayers.
          </p>
        </div>
      </div>

      {/* Daily Reminders Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">Recent Reminders</h2>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#08948c]"></div>
            </div>
          ) : reminders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No reminders available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reminders.map((reminder) => {
                // Process image URL if it exists
                let imageUrl = reminder.imageUrl;
                if (imageUrl && !imageUrl.startsWith('http')) {
                  try {
                    imageUrl = getFileUrl(imageUrl);
                  } catch (error) {
                    console.error(`Error generating URL for reminder image:`, error);
                    imageUrl = null;
                  }
                }

                // Format date
                const date = reminder.date ? new Date(reminder.date) : new Date();
                const formattedDate = `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

                return (
                  <div key={reminder.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Image */}
                    <div className="h-48 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={reminder.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/reminder-bg.jpg';
                          }}
                        />
                      ) : (
                        <img
                          src="/reminder-bg.jpg"
                          alt="Default reminder"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Date and Category */}
                    <div className="px-6 pt-4 pb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-500">{formattedDate}</span>
                        {reminder.category && (
                          <span className="inline-block bg-[#08948c]/10 text-[#08948c] rounded-full px-3 py-1 text-xs font-medium">
                            {reminder.category}
                          </span>
                        )}
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{reminder.title}</h3>
                      <div className="mb-4">
                        <p className={`text-gray-600 ${expandedCards[reminder.id] ? '' : 'line-clamp-3'}`}>
                          {reminder.description}
                        </p>
                        <button
                          onClick={() => setExpandedCards(prev => ({
                            ...prev,
                            [reminder.id]: !prev[reminder.id]
                          }))}
                          className="text-[#08948c] hover:text-[#067a73] text-sm font-medium mt-2 flex items-center transition-all hover:translate-x-1"
                        >
                          {expandedCards[reminder.id] ? 'See Less' : 'See More'}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 ml-1 transition-transform ${expandedCards[reminder.id] ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DailyReminder;