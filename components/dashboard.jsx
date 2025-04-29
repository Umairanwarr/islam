import React, { useState, useEffect } from 'react';
import AddSurah from './addSurah';
import EditSurah from './editSurah';
import AddClass from './addClass';
import EditClass from './EditClass';
import SurahCard from './SurahCard';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { deleteFile } from '../src/appwrite';

const Dashboard = () => {
  const [surahs, setSurahs] = useState([]);
  const [showAddSurah, setShowAddSurah] = useState(false);
  const [showEditSurah, setShowEditSurah] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [classes, setClasses] = useState([]);
  const [showEditClass, setShowEditClass] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        console.log("Fetching surahs from Firestore...");
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

        console.log("Fetched surahs:", surahList);
        setSurahs(surahList);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };

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
          createdAt: doc.data().createdAt ?
            (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
            : new Date().toISOString()
        }));
        setClasses(classList);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchSurahs();
    fetchClasses();
  }, []);

  const handleAddSurah = () => {
    setShowAddSurah(true);
  };

  const handleCloseAddSurah = () => {
    setShowAddSurah(false);
  };

  const handleSubmitSurah = (newSurah) => {
    setSurahs(prev => [...prev, newSurah]);
  };

  const handleEditSurah = (id) => {
    const surahToEdit = surahs.find(surah => surah.id === id);
    if (surahToEdit) {
      setCurrentSurah(surahToEdit);
      setShowEditSurah(true);
    }
  };

  const handleCloseEditSurah = () => {
    setShowEditSurah(false);
    setCurrentSurah(null);
  };

  const handleUpdateSurah = (updatedSurah) => {
    setSurahs(prev =>
      prev.map(surah =>
        surah.id === updatedSurah.id ? updatedSurah : surah
      )
    );
  };

  const handleDeleteSurah = async (id) => {
    if (!id) {
      console.error("Cannot delete surah: No ID provided");
      return;
    }

    try {
      // Find the surah to get its image ID
      const surahToDelete = surahs.find(surah => surah.id === id);

      if (!surahToDelete) {
        console.error(`Surah with ID ${id} not found`);
        return;
      }

      // Confirm deletion with the user
      if (!window.confirm(`Are you sure you want to delete "${surahToDelete.surahName}"?`)) {
        return;
      }

      console.log(`Deleting surah: ${surahToDelete.surahName} (ID: ${id})`);

      // Delete from Firestore
      await deleteDoc(doc(db, 'surahs', id));
      console.log(`Deleted surah document with ID: ${id}`);

      // Delete image from Appwrite if it exists and is a file ID (not a URL)
      if (surahToDelete.imageUrl && !surahToDelete.imageUrl.startsWith('http')) {
        try {
          await deleteFile(surahToDelete.imageUrl);
          console.log(`Deleted image with ID: ${surahToDelete.imageUrl}`);
        } catch (imageError) {
          console.error(`Error deleting image: ${imageError.message}`);
          // Continue even if image deletion fails
        }
      }

      // Update state to remove the deleted surah
      setSurahs(prev => prev.filter(surah => surah.id !== id));

      // Show success message
      alert(`Surah "${surahToDelete.surahName}" has been deleted.`);
    } catch (error) {
      console.error(`Error deleting surah: ${error.message}`);
      alert(`Failed to delete surah: ${error.message}`);
    }
  };

  const handleAddClass = () => {
    setShowAddClass(true);
  };

  const handleCloseAddClass = () => {
    setShowAddClass(false);
  };

  const handleSubmitClass = (newClass) => {
    setClasses(prev => [newClass, ...prev]);
  };

  const handleEditClass = (id) => {
    const classToEdit = classes.find(cls => cls.id === id);
    if (classToEdit) {
      setCurrentClass(classToEdit);
      setShowEditClass(true);
    }
  };

  const handleDeleteClass = async (id) => {
    if (!id) return;
    const classToDelete = classes.find(cls => cls.id === id);
    if (!classToDelete) return;
    if (!window.confirm(`Are you sure you want to delete "${classToDelete.title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'classes', id));
      setClasses(prev => prev.filter(cls => cls.id !== id));
      alert(`Class "${classToDelete.title}" has been deleted.`);
    } catch (error) {
      alert('Failed to delete class: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
             
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleAddSurah}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Surah
              </button>
              <button
                onClick={handleAddClass}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Class
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Total Surahs</h3>
                <p className="text-2xl font-bold text-gray-900">{surahs.length}</p>
              </div>
            </div>
          </div>
          
          
          
        </div>

        {/* Surahs Grid */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Surahs</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                All
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Recent
              </button>
              <button className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Favorites
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surahs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Surahs Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first surah</p>
                <button
                  onClick={handleAddSurah}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First Surah
                </button>
              </div>
            ) : (
              surahs.map((surah, index) => {
                console.log(`Rendering surah card for ${surah.surahName}:`, surah);
                return (
                  <SurahCard
                    key={surah.id || index}
                    id={surah.id}
                    name={surah.surahName}
                    verses={surah.verses}
                    imageUrl={surah.imageUrl}
                    onDelete={handleDeleteSurah}
                    onEdit={handleEditSurah}
                    inDashboard={true}
                  />
                );
              })
            )}
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Classes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Classes Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first class</p>
              </div>
            ) : (
              classes.map((classItem, idx) => (
                <div key={classItem.id || idx} className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100 flex flex-col gap-2">
                  <div className="font-bold text-lg">{classItem.title}</div>
                  <div className="text-gray-700">{classItem.about}</div>
                  <div className="text-gray-500 text-sm">{classItem.time ? new Date(classItem.time).toLocaleString() : ''}</div>
                  <a href={classItem.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">Join Class</a>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEditClass(classItem.id)}
                      className="text-[#08948c] hover:text-[#067a73] text-sm font-medium flex items-center"
                    >
                      Edit
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteClass(classItem.id)}
                      className="text-red-600 hover:text-red-800 text-sm flex items-center"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showAddSurah && (
        <AddSurah
          onClose={handleCloseAddSurah}
          onAddSurah={handleSubmitSurah}
        />
      )}

      {showEditSurah && currentSurah && (
        <EditSurah
          surah={currentSurah}
          onClose={handleCloseEditSurah}
          onUpdate={handleUpdateSurah}
        />
      )}

      {showAddClass && (
        <AddClass
          onClose={handleCloseAddClass}
          onAddClass={handleSubmitClass}
        />
      )}

      {showEditClass && currentClass && (
        <EditClass
          classData={currentClass}
          onClose={() => { setShowEditClass(false); setCurrentClass(null); }}
          onUpdate={(updatedClass) => {
            setClasses(prev => prev.map(cls => cls.id === updatedClass.id ? updatedClass : cls));
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;