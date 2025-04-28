import React, { useEffect, useState } from 'react';
import SurahCard from '../components/SurahCard';
import SurahHeader from '../components/surahHeader';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function SurahList() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    fetchSurahs();
  }, []);

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
    } catch (error) {
      console.error("Error fetching surahs for list page:", error);
    }
  };



  return (
    <div>
      <SurahHeader />
      <div className="pl-4 md:pl-10 mt-8 pb-8">
        <h1 className="text-3xl font-bold mb-6">Featured Surahs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2 md:px-0">
          {surahs.map((surah, idx) => {
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
    </div>
  );
}
