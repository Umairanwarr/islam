import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landingPage';
import SurahList from '../pages/surahList';
import SurahDetail from '../pages/surahDetail';
import DashboardPage from '../pages/dashboard';
import LiveClass from '../pages/liveClass';
import AskImam from '../pages/askImam';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/surah" element={<SurahList />} />
        <Route path="/surah/:id" element={<SurahDetail />} />
        <Route path="/mydashboard" element={<DashboardPage />} />
        <Route path="/live-class" element={<LiveClass />} />
        <Route path="/ask-imam" element={<AskImam />} />
      </Routes>
    </Router>
  );
}

export default App;
