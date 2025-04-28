import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage';
import SurahList from '../pages/surahList';
import SurahDetail from '../pages/surahDetail';
import DashboardPage from '../pages/dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/surah" element={<SurahList />} />
        <Route path="/surah/:id" element={<SurahDetail />} />
        <Route path="/mydashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
