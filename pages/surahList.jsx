import React, { useEffect, useState } from 'react';
import SurahCard from '../components/SurahCard';
import SurahHeader from '../components/surahHeader';
import Footer from '../components/footer';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSurahs, setFilteredSurahs] = useState([]);

  useEffect(() => {
    fetchSurahs();
  }, []);

  useEffect(() => {
    // Filter surahs whenever searchQuery or surahs change
    const filtered = surahs.filter(surah => 
      surah.surahName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSurahs(filtered);
  }, [searchQuery, surahs]);

  const fetchSurahs = async () => {
    try {
      console.log("Fetching surahs for SurahList page...");
      // Create a query with ordering by createdAt (newest first)
      const surahsQuery = query(
        collection(db, 'surahs'),
        orderBy('createdAt', 'desc')
      );

      const surahSnapshot = await getDocs(surahsQuery);

      // Map documents to include both data and document ID
      const surahList = surahSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to string if it exists
        createdAt: doc.data().createdAt ?
          (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
          : new Date().toISOString()
      }));

      console.log("Fetched surahs for list page:", surahList);
      setSurahs(surahList);
      setFilteredSurahs(surahList);
    } catch (error) {
      console.error("Error fetching surahs for list page:", error);
    }
  };

  return (
    <div>
      <SurahHeader />
      <div className="pl-4 md:pl-10 mt-8 pb-8">
        <h1 className="text-3xl font-bold mb-6">Featured Surahs</h1>
        <div className="flex justify-center mb-8 px-2 md:px-0">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search surahs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
          {filteredSurahs.map((surah, idx) => {
            console.log(`SurahList rendering card for ${surah.surahName}:`, surah);
            return (
              <SurahCard
                key={surah.id || idx}
                id={surah.id}
                name={surah.surahName}
                verses={surah.verses}
                imageUrl={surah.imageUrl}
                onDelete={null} // Pass null to disable delete functionality
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
