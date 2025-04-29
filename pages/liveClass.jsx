import React, { useEffect, useState } from 'react';
import ClassHeader from '../components/classHeader';
import ClassOfferings from '../components/ClassOfferings';
import Footer from '../components/footer';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import ClassCard from '../components/ClassCard';

const LiveClass = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesQuery = query(
          collection(db, 'classes'),
          orderBy('createdAt', 'desc')
        );
        const classSnapshot = await getDocs(classesQuery);
        const classList = classSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClasses(classList);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <ClassHeader />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Class</h2>

          {/* Class Cards */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
            ) : classes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-8 text-center">
                  <p className="text-gray-600 mb-4">
                    No classes are currently scheduled. Please check back later for upcoming classes and events.
                  </p>
                </div>
              </div>
            ) : (
              classes.map((classItem) => (
                <ClassCard key={classItem.id} classItem={classItem} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <ClassOfferings />

      <Footer />
    </div>
  );
};

export default LiveClass;