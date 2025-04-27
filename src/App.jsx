import { useState, useEffect } from 'react';
import Hero from '../components/hero';
import PrayerTime from '../components/prayerTime';
import About from '../components/about';
import Quran from '../components/quran';
import Resources from '../components/resources';
import Subscribe from '../components/subscribe';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Preloader from '../components/Preloader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading time and ensure minimum display time for preloader
    const minLoadTime = setTimeout(() => {
      startFadeOutProcess();
    }, 2500);

    // Add an event listener to wait for window load
    const handleLoad = () => {
      // Start fade out process
      startFadeOutProcess();
    };

    // Start the fade-out transition process
    const startFadeOutProcess = () => {
      setFadeOut(true);
      // Wait for the fade out animation to complete before hiding the preloader
      setTimeout(() => {
        setLoading(false);
      }, 600); // Match this to the transition duration
    };

    window.addEventListener('load', handleLoad);

    // Cleanup
    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      {loading && (
        <div className={`transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <Preloader />
        </div>
      )}
      
      <div className={`transition-opacity duration-500 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <PrayerTime />
        <About />
        <Quran />
        <Resources />
        <Subscribe />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default App;
