import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import LandingPage from '../pages/landingPage';
import SurahList from '../pages/surahList';
import SurahDetail from '../pages/surahDetail';
import DashboardPage from '../pages/dashboard';
import LiveClass from '../pages/liveClass';
import AskImam from '../pages/askImam';
import DailyReminder from '../pages/dailyReminder';
import Blogs from '../pages/blogs';
import Resources from '../pages/resources';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';
import './App.css';

// AppRoutes component to handle routing
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/surah" element={<SurahList />} />
      <Route path="/surah/:id" element={<SurahDetail />} />
      <Route path="/mydashboard" element={<DashboardPage />} />
      <Route path="/live-class" element={<LiveClass />} />
      <Route path="/ask-imam" element={<AskImam />} />
      <Route path="/daily-reminder" element={<DailyReminder />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/resources" element={<Resources />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

// AppContent component to conditionally render Navbar
const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/mydashboard';

  // Handle hash navigation when page loads
  useEffect(() => {
    // First scroll to top (for non-hash navigation)
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    // For hash navigation, scroll to the element
    // Remove the # character
    const id = location.hash.substring(1);

    // Wait for the DOM to be fully loaded
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }, [location]);

  return (
    <>
      <Navbar />
      <div className={!isDashboard ? 'pt-16 sm:pt-20' : ''}>
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
