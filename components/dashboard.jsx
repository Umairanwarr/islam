import React, { useState, useEffect } from 'react';
import AddSurah from './addSurah';
import EditSurah from './editSurah';
import AddClass from './addClass';
import EditClass from './EditClass';
import AddReminder from './addReminder';
import EditReminder from './editReminder';
import AddTestimonial from './addTestimonial';
import EditTestimonial from './editTestimonial';
import AddBlog from './addBlog';
import EditBlog from './editBlog';
import AddVideoLink from './addVideoLink';
import AddPrayerPdf from './addPrayerPdf';
import AddPrayerTime from './addPrayerTime';
import AddPdfResource from './addPdfResource';
import EditPdfResource from './editPdfResource';
import SurahCard from './SurahCard';
import ReminderCard from './ReminderCard';
import TestimonialCard from './TestimonialCard';
import BlogCard from './BlogCard';
import PdfResourceCard from './PdfResourceCard';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { deleteFile, getFileUrl } from '../src/appwrite';

const Dashboard = () => {
  const [surahs, setSurahs] = useState([]);
  const [showAddSurah, setShowAddSurah] = useState(false);
  const [showEditSurah, setShowEditSurah] = useState(false);
  const [showAddClass, setShowAddClass] = useState(false);
  const [currentSurah, setCurrentSurah] = useState(null);
  const [classes, setClasses] = useState([]);
  const [showEditClass, setShowEditClass] = useState(false);
  const [currentClass, setCurrentClass] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showEditReminder, setShowEditReminder] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [showEditTestimonial, setShowEditTestimonial] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [pdfResources, setPdfResources] = useState([]);
  const [showAddPdfResource, setShowAddPdfResource] = useState(false);
  const [showEditPdfResource, setShowEditPdfResource] = useState(false);
  const [currentPdfResource, setCurrentPdfResource] = useState(null);

  // Settings state
  const [videoLinks, setVideoLinks] = useState({
    todayVideo: '',
    embeddedVideo: ''
  });
  const [prayerPdfId, setPrayerPdfId] = useState('');
  const [prayerPdfUrl, setPrayerPdfUrl] = useState('');
  const [showAddVideoLink, setShowAddVideoLink] = useState(false);
  const [currentVideoType, setCurrentVideoType] = useState('');
  const [showAddPrayerPdf, setShowAddPrayerPdf] = useState(false);

  // Prayer Times state
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [showAddPrayerTime, setShowAddPrayerTime] = useState(false);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
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

    const fetchReminders = async () => {
      try {
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
      }
    };

    const fetchTestimonials = async () => {
      try {
        const testimonialsQuery = query(
          collection(db, 'testimonials'),
          orderBy('createdAt', 'desc')
        );
        const testimonialSnapshot = await getDocs(testimonialsQuery);
        const testimonialList = testimonialSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ?
            (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
            : new Date().toISOString()
        }));
        setTestimonials(testimonialList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchSettings = async () => {
      try {
        // Fetch video links
        const videoLinksDoc = await getDoc(doc(db, 'settings', 'videoLinks'));
        if (videoLinksDoc.exists()) {
          const data = videoLinksDoc.data();
          setVideoLinks({
            todayVideo: data.todayVideo || '',
            embeddedVideo: data.embeddedVideo || '',
            todayVideoId: data.todayVideoId || '',
            embeddedVideoId: data.embeddedVideoId || ''
          });
        }

        // Fetch prayer PDF
        const prayerPdfDoc = await getDoc(doc(db, 'settings', 'prayerPdf'));
        if (prayerPdfDoc.exists()) {
          const fileId = prayerPdfDoc.data().fileId;
          setPrayerPdfId(fileId || '');

          if (fileId) {
            const url = getFileUrl(fileId);
            setPrayerPdfUrl(url);
          }
        }

        // Fetch prayer times
        const prayerTimesDoc = await getDoc(doc(db, 'settings', 'prayerTimes'));
        if (prayerTimesDoc.exists()) {
          setPrayerTimes(prayerTimesDoc.data());
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const blogsQuery = query(
          collection(db, 'blogs'),
          orderBy('createdAt', 'desc')
        );
        const blogSnapshot = await getDocs(blogsQuery);
        const blogList = blogSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ?
            (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
            : new Date().toISOString()
        }));
        setBlogs(blogList);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    const fetchPdfResources = async () => {
      try {
        const pdfResourcesQuery = query(
          collection(db, 'pdfResources'),
          orderBy('createdAt', 'desc')
        );
        const pdfResourceSnapshot = await getDocs(pdfResourcesQuery);
        const pdfResourceList = pdfResourceSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ?
            (doc.data().createdAt.toDate ? doc.data().createdAt.toDate().toISOString() : doc.data().createdAt)
            : new Date().toISOString()
        }));
        setPdfResources(pdfResourceList);
      } catch (error) {
        console.error('Error fetching PDF resources:', error);
      }
    };

    fetchSurahs();
    fetchClasses();
    fetchReminders();
    fetchTestimonials();
    fetchBlogs();
    fetchPdfResources();
    fetchSettings();
  }, []);

  // Video Link handlers
  const handleAddTodayVideo = () => {
    setCurrentVideoType('todayVideo');
    setShowAddVideoLink(true);
  };

  const handleAddEmbeddedVideo = () => {
    setCurrentVideoType('embeddedVideo');
    setShowAddVideoLink(true);
  };

  const handleCloseVideoLink = () => {
    setShowAddVideoLink(false);
    setCurrentVideoType('');
  };

  const handleUpdateVideoLink = (type, newLink, youtubeId) => {
    setVideoLinks(prev => ({
      ...prev,
      [type]: newLink,
      [`${type}Id`]: youtubeId
    }));
  };

  // Prayer PDF handlers
  const handleAddPrayerPdf = () => {
    setShowAddPrayerPdf(true);
  };

  const handleClosePrayerPdf = () => {
    setShowAddPrayerPdf(false);
  };

  const handleUpdatePrayerPdf = (fileId) => {
    setPrayerPdfId(fileId);
    const url = getFileUrl(fileId);
    setPrayerPdfUrl(url);
  };

  // Prayer Times handlers
  const handleAddPrayerTime = () => {
    setShowAddPrayerTime(true);
  };

  const handleClosePrayerTime = () => {
    setShowAddPrayerTime(false);
  };

  const handleUpdatePrayerTime = (newPrayerTimes) => {
    setPrayerTimes(newPrayerTimes);
  };

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

      // Delete from Firestore
      await deleteDoc(doc(db, 'surahs', id));

      // Delete image from Appwrite if it exists and is a file ID (not a URL)
      if (surahToDelete.imageUrl && !surahToDelete.imageUrl.startsWith('http')) {
        try {
          await deleteFile(surahToDelete.imageUrl);
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

  // Reminder handlers
  const handleAddReminder = () => {
    setShowAddReminder(true);
  };

  const handleCloseAddReminder = () => {
    setShowAddReminder(false);
  };

  const handleSubmitReminder = (newReminder) => {
    setReminders(prev => [newReminder, ...prev]);
  };

  const handleEditReminder = (id) => {
    const reminderToEdit = reminders.find(reminder => reminder.id === id);
    if (reminderToEdit) {
      setCurrentReminder(reminderToEdit);
      setShowEditReminder(true);
    }
  };

  const handleCloseEditReminder = () => {
    setShowEditReminder(false);
    setCurrentReminder(null);
  };

  const handleUpdateReminder = (updatedReminder) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === updatedReminder.id ? updatedReminder : reminder
      )
    );
  };

  const handleDeleteReminder = async (id) => {
    if (!id) return;
    const reminderToDelete = reminders.find(reminder => reminder.id === id);
    if (!reminderToDelete) return;
    if (!window.confirm(`Are you sure you want to delete "${reminderToDelete.title}"?`)) return;
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'reminders', id));

      // Delete image from Appwrite if it exists and is a file ID (not a URL)
      if (reminderToDelete.imageUrl && !reminderToDelete.imageUrl.startsWith('http')) {
        try {
          await deleteFile(reminderToDelete.imageUrl);
        } catch (imageError) {
          console.error(`Error deleting image: ${imageError.message}`);
        }
      }

      // Update state
      setReminders(prev => prev.filter(reminder => reminder.id !== id));
      alert(`Reminder "${reminderToDelete.title}" has been deleted.`);
    } catch (error) {
      alert('Failed to delete reminder: ' + error.message);
    }
  };

  // Testimonial handlers
  const handleAddTestimonial = () => {
    setShowAddTestimonial(true);
  };

  const handleCloseAddTestimonial = () => {
    setShowAddTestimonial(false);
  };

  const handleSubmitTestimonial = (newTestimonial) => {
    setTestimonials(prev => [newTestimonial, ...prev]);
  };

  const handleEditTestimonial = (id) => {
    const testimonialToEdit = testimonials.find(testimonial => testimonial.id === id);
    if (testimonialToEdit) {
      setCurrentTestimonial(testimonialToEdit);
      setShowEditTestimonial(true);
    }
  };

  const handleCloseEditTestimonial = () => {
    setShowEditTestimonial(false);
    setCurrentTestimonial(null);
  };

  const handleUpdateTestimonial = (updatedTestimonial) => {
    setTestimonials(prev =>
      prev.map(testimonial =>
        testimonial.id === updatedTestimonial.id ? updatedTestimonial : testimonial
      )
    );
  };

  const handleDeleteTestimonial = async (id) => {
    if (!id) return;
    const testimonialToDelete = testimonials.find(testimonial => testimonial.id === id);
    if (!testimonialToDelete) return;
    if (!window.confirm(`Are you sure you want to delete testimonial from "${testimonialToDelete.name}"?`)) return;
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'testimonials', id));

      // Delete image from Appwrite if it exists and is a file ID (not a URL)
      if (testimonialToDelete.image && !testimonialToDelete.image.startsWith('http')) {
        try {
          await deleteFile(testimonialToDelete.image);
        } catch (imageError) {
          console.error(`Error deleting image: ${imageError.message}`);
        }
      }

      // Update state
      setTestimonials(prev => prev.filter(testimonial => testimonial.id !== id));
      alert(`Testimonial from "${testimonialToDelete.name}" has been deleted.`);
    } catch (error) {
      alert('Failed to delete testimonial: ' + error.message);
    }
  };

  // Blog handlers
  const handleAddBlog = () => {
    setShowAddBlog(true);
  };

  const handleCloseAddBlog = () => {
    setShowAddBlog(false);
  };

  const handleSubmitBlog = (newBlog) => {
    setBlogs(prev => [newBlog, ...prev]);
  };

  const handleEditBlog = (id) => {
    const blogToEdit = blogs.find(blog => blog.id === id);
    if (blogToEdit) {
      setCurrentBlog(blogToEdit);
      setShowEditBlog(true);
    }
  };

  const handleCloseEditBlog = () => {
    setShowEditBlog(false);
    setCurrentBlog(null);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs(prev =>
      prev.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
    );
  };

  const handleDeleteBlog = async (id) => {
    if (!id) return;
    const blogToDelete = blogs.find(blog => blog.id === id);
    if (!blogToDelete) return;
    if (!window.confirm(`Are you sure you want to delete blog "${blogToDelete.title}"?`)) return;
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'blogs', id));

      // Delete image from Appwrite if it exists and is a file ID (not a URL)
      if (blogToDelete.imageUrl && !blogToDelete.imageUrl.startsWith('http')) {
        try {
          await deleteFile(blogToDelete.imageUrl);
        } catch (imageError) {
          console.error(`Error deleting image: ${imageError.message}`);
        }
      }

      // Update state
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      alert(`Blog "${blogToDelete.title}" has been deleted.`);
    } catch (error) {
      alert('Failed to delete blog: ' + error.message);
    }
  };

  // PDF Resource handlers
  const handleAddPdfResource = () => {
    setShowAddPdfResource(true);
  };

  const handleCloseAddPdfResource = () => {
    setShowAddPdfResource(false);
  };

  const handleSubmitPdfResource = (newResource) => {
    setPdfResources(prev => [newResource, ...prev]);
  };

  const handleEditPdfResource = (id) => {
    const resourceToEdit = pdfResources.find(resource => resource.id === id);
    if (resourceToEdit) {
      setCurrentPdfResource(resourceToEdit);
      setShowEditPdfResource(true);
    }
  };

  const handleCloseEditPdfResource = () => {
    setShowEditPdfResource(false);
    setCurrentPdfResource(null);
  };

  const handleUpdatePdfResource = (updatedResource) => {
    setPdfResources(prev =>
      prev.map(resource =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
  };

  const handleDeletePdfResource = async (id) => {
    if (!id) return;
    const resourceToDelete = pdfResources.find(resource => resource.id === id);
    if (!resourceToDelete) return;
    if (!window.confirm(`Are you sure you want to delete PDF resource "${resourceToDelete.title}"?`)) return;
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'pdfResources', id));

      // Delete image from Appwrite if it exists
      if (resourceToDelete.imageId) {
        try {
          await deleteFile(resourceToDelete.imageId);
        } catch (imageError) {
          console.error(`Error deleting image: ${imageError.message}`);
        }
      }

      // Delete PDF from Appwrite if it exists
      if (resourceToDelete.pdfId) {
        try {
          await deleteFile(resourceToDelete.pdfId);
        } catch (pdfError) {
          console.error(`Error deleting PDF: ${pdfError.message}`);
        }
      }

      // Update state
      setPdfResources(prev => prev.filter(resource => resource.id !== id));
      alert(`PDF Resource "${resourceToDelete.title}" has been deleted.`);
    } catch (error) {
      alert('Failed to delete PDF resource: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 sm:py-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Dashboard</h1>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                onClick={handleAddSurah}
                className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> Surah
              </button>
              <button
                onClick={handleAddClass}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> Class
              </button>
              <button
                onClick={handleAddReminder}
                className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> Reminder
              </button>
              <button
                onClick={handleAddTestimonial}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> Testimonial
              </button>
              <button
                onClick={handleAddBlog}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> Blog
              </button>
              <button
                onClick={handleAddPdfResource}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center gap-1 sm:gap-2 text-sm sm:text-base transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden xs:inline">Add</span> PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Surahs</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{surahs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Classes</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{classes.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-[#08948c]/20 text-[#08948c]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Reminders</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{reminders.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-full bg-purple-100 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Testimonials</h3>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{testimonials.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Website Settings Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Website Settings</h2>

          {/* Video Links Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Today's Video Link */}
            <div className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Today's Video</h3>
                  <p className="text-gray-600 text-sm">Update the "Watch Today's Video" button link</p>
                </div>
                <button
                  onClick={handleAddTodayVideo}
                  className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Update
                </button>
              </div>
              <div className="mt-2">
                {videoLinks.todayVideo ? (
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                    </svg>
                    <a href={videoLinks.todayVideo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                      {videoLinks.todayVideo}
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No video link set</p>
                )}
              </div>
            </div>

            {/* Embedded Video */}
            <div className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Embedded Video</h3>
                  <p className="text-gray-600 text-sm">Update the video embedded in the homepage</p>
                </div>
                <button
                  onClick={handleAddEmbeddedVideo}
                  className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Update
                </button>
              </div>
              <div className="mt-2">
                {videoLinks.embeddedVideo ? (
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.267,4,12,4,12,4S5.733,4,4.186,4.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.733,2,12,2,12s0,4.267,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.733,20,12,20,12,20s6.267,0,7.814-0.418c0.861-0.23,1.538-0.908,1.768-1.768C22,16.267,22,12,22,12S22,7.733,21.582,6.186z M10,15.464V8.536L16,12L10,15.464z"/>
                    </svg>
                    <a href={videoLinks.embeddedVideo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-xs">
                      {videoLinks.embeddedVideo}
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No video link set</p>
                )}
              </div>
            </div>

            {/* Prayer Times Row */}
            <div className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Prayer Times</h3>
                  <p className="text-gray-600 text-sm">Manage daily prayer times</p>
                </div>
                <button
                  onClick={handleAddPrayerTime}
                  className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  {prayerTimes ? 'Update' : 'Add'}
                </button>
              </div>
              <div className="mt-2">
                {prayerTimes ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Fajr:</span>
                      <span>{prayerTimes.fajrBegin} / {prayerTimes.fajrJamat}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Dhuhr:</span>
                      <span>{prayerTimes.dhuhrBegin} / {prayerTimes.dhuhrJamat}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Asr:</span>
                      <span>{prayerTimes.asrBegin} / {prayerTimes.asrJamat}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Maghrib:</span>
                      <span>{prayerTimes.maghribBegin}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Isha:</span>
                      <span>{prayerTimes.ishaBegin} / {prayerTimes.ishaJamat}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-700 mr-2">Jummah:</span>
                      <span>{prayerTimes.jummahKhutba} / {prayerTimes.jummahJamat}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No prayer times set</p>
                )}
              </div>
            </div>

            {/* Prayer PDF Row */}
            <div className="bg-gray-50 rounded-lg p-4 shadow border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">Prayer Timetable</h3>
                  <p className="text-gray-600 text-sm">Upload PDF for prayer timetable download</p>
                </div>
                <button
                  onClick={handleAddPrayerPdf}
                  className="bg-[#08948c] hover:bg-[#067a73] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Upload
                </button>
              </div>
              <div className="mt-2">
                {prayerPdfUrl ? (
                  <div className="flex items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <a href={prayerPdfUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Prayer Timetable PDF
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 italic text-sm">No PDF uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Surahs Grid */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Surahs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Reminders Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Reminders</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reminders.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Reminders Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first reminder</p>
                <button
                  onClick={handleAddReminder}
                  className="bg-[#08948c] hover:bg-[#067a73] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First Reminder
                </button>
              </div>
            ) : (
              reminders.map((reminder, idx) => (
                <ReminderCard
                  key={reminder.id || idx}
                  id={reminder.id}
                  title={reminder.title}
                  description={reminder.description}
                  imageUrl={reminder.imageUrl}
                  date={reminder.date}
                  category={reminder.category}
                  onDelete={handleDeleteReminder}
                  onEdit={handleEditReminder}
                  inDashboard={true}
                />
              ))
            )}
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Classes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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

        {/* Blogs Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Blogs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Blogs Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first blog</p>
                <button
                  onClick={handleAddBlog}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First Blog
                </button>
              </div>
            ) : (
              blogs.map((blog, idx) => (
                <BlogCard
                  key={blog.id || idx}
                  id={blog.id}
                  title={blog.title}
                  bloggerLink={blog.bloggerLink}
                  imageUrl={blog.imageUrl}
                  onDelete={handleDeleteBlog}
                  onEdit={handleEditBlog}
                  inDashboard={true}
                />
              ))
            )}
          </div>
        </div>

        {/* PDF Resources Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PDF Resources</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {pdfResources.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No PDF Resources Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first PDF resource</p>
                <button
                  onClick={handleAddPdfResource}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First PDF Resource
                </button>
              </div>
            ) : (
              pdfResources.map((resource, idx) => (
                <PdfResourceCard
                  key={resource.id || idx}
                  id={resource.id}
                  title={resource.title}
                  imageId={resource.imageId}
                  pdfId={resource.pdfId}
                  pdfFileName={resource.pdfFileName}
                  onDelete={handleDeletePdfResource}
                  onEdit={handleEditPdfResource}
                  inDashboard={true}
                />
              ))
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100 mt-6 sm:mt-8">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {testimonials.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Testimonials Yet</h3>
                <p className="text-gray-500 mb-4">Start by adding your first testimonial</p>
                <button
                  onClick={handleAddTestimonial}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-md mx-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Your First Testimonial
                </button>
              </div>
            ) : (
              testimonials.map((testimonial, idx) => (
                <TestimonialCard
                  key={testimonial.id || idx}
                  id={testimonial.id}
                  name={testimonial.name}
                  location={testimonial.location}
                  quote={testimonial.quote}
                  image={testimonial.image}
                  onDelete={handleDeleteTestimonial}
                  onEdit={handleEditTestimonial}
                  inDashboard={true}
                />
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

      {showAddReminder && (
        <AddReminder
          onClose={handleCloseAddReminder}
          onAddReminder={handleSubmitReminder}
        />
      )}

      {showEditReminder && currentReminder && (
        <EditReminder
          reminder={currentReminder}
          onClose={handleCloseEditReminder}
          onUpdate={handleUpdateReminder}
        />
      )}

      {showAddTestimonial && (
        <AddTestimonial
          onClose={handleCloseAddTestimonial}
          onAddTestimonial={handleSubmitTestimonial}
        />
      )}

      {showEditTestimonial && currentTestimonial && (
        <EditTestimonial
          testimonial={currentTestimonial}
          onClose={handleCloseEditTestimonial}
          onUpdate={handleUpdateTestimonial}
        />
      )}

      {showAddVideoLink && (
        <AddVideoLink
          onClose={handleCloseVideoLink}
          onUpdate={handleUpdateVideoLink}
          currentLinks={videoLinks}
          type={currentVideoType}
        />
      )}

      {showAddPrayerPdf && (
        <AddPrayerPdf
          onClose={handleClosePrayerPdf}
          onUpdate={handleUpdatePrayerPdf}
          currentPdfId={prayerPdfId}
        />
      )}

      {showAddPrayerTime && (
        <AddPrayerTime
          onClose={handleClosePrayerTime}
          onUpdate={handleUpdatePrayerTime}
        />
      )}

      {showAddBlog && (
        <AddBlog
          onClose={handleCloseAddBlog}
          onAddBlog={handleSubmitBlog}
        />
      )}

      {showEditBlog && currentBlog && (
        <EditBlog
          blog={currentBlog}
          onClose={handleCloseEditBlog}
          onUpdate={handleUpdateBlog}
        />
      )}

      {showAddPdfResource && (
        <AddPdfResource
          onClose={handleCloseAddPdfResource}
          onAddResource={handleSubmitPdfResource}
        />
      )}

      {showEditPdfResource && currentPdfResource && (
        <EditPdfResource
          resource={currentPdfResource}
          onClose={handleCloseEditPdfResource}
          onUpdate={handleUpdatePdfResource}
        />
      )}
    </div>
  );
};

export default Dashboard;