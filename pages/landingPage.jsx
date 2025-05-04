import { useState, useEffect, useRef } from 'react';
import Hero from '../components/hero';
import Reminder from '../components/reminder';
import PrayerTime from '../components/prayerTime';
import About from '../components/about';
import Quran from '../components/quran';
import Resources from '../components/resources';
import Donation from '../components/donation';
import Testimonials from '../components/testimonials';
import Subscribe from '../components/subscribe';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Preloader from '../components/Preloader';
import '.././src/App.css';

function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const allImagesLoaded = useRef(false);
  const imageCount = useRef(0);
  const loadedImages = useRef(0);

  // Function to check if all content is loaded
  const checkAllContentLoaded = () => {
    if (imagesLoaded && minTimeElapsed) {
      startFadeOutProcess();
    }
  };

  // Start the fade-out transition process
  const startFadeOutProcess = () => {
    if (fadeOut) return; // Prevent multiple calls
    setFadeOut(true);
    // Wait for the fade out animation to complete before hiding the preloader
    setTimeout(() => {
      setLoading(false);
    }, 600); // Match this to the transition duration
  };

  useEffect(() => {
    // Ensure minimum display time for preloader (2.5 seconds)
    const minLoadTime = setTimeout(() => {
      setMinTimeElapsed(true);
      checkAllContentLoaded();
    }, 2500);

    // Track all images on the page
    const trackImageLoading = () => {
      const images = document.querySelectorAll('img');
      imageCount.current = images.length;

      if (images.length === 0) {
        // No images to load
        setImagesLoaded(true);
        checkAllContentLoaded();
        return;
      }

      // Track each image's load status
      images.forEach(img => {
        if (img.complete) {
          loadedImages.current += 1;
        } else {
          img.addEventListener('load', () => {
            loadedImages.current += 1;
            if (loadedImages.current >= imageCount.current && !allImagesLoaded.current) {
              allImagesLoaded.current = true;
              setImagesLoaded(true);
              checkAllContentLoaded();
            }
          });

          // Also handle error cases (broken images)
          img.addEventListener('error', () => {
            loadedImages.current += 1;
            if (loadedImages.current >= imageCount.current && !allImagesLoaded.current) {
              allImagesLoaded.current = true;
              setImagesLoaded(true);
              checkAllContentLoaded();
            }
          });
        }
      });

      // If all images were already loaded (from cache)
      if (loadedImages.current >= imageCount.current && !allImagesLoaded.current) {
        allImagesLoaded.current = true;
        setImagesLoaded(true);
        checkAllContentLoaded();
      }
    };

    // Wait for window load event which ensures all resources are loaded
    window.addEventListener('load', () => {
      trackImageLoading();
    });

    // Also start tracking images after component mounts
    // This helps when images are already cached
    trackImageLoading();

    // Cleanup
    return () => {
      clearTimeout(minLoadTime);
    };
  }, []);

  // Effect to check when both conditions are met
  useEffect(() => {
    checkAllContentLoaded();
  }, [imagesLoaded, minTimeElapsed]);

  return (
    <>
      {loading && (
        <div className={`transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          <Preloader />
        </div>
      )}

      <div className={`transition-opacity duration-500 ease-in-out ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <Reminder />
        <PrayerTime />
        <About />
        <Quran />
        <Resources />
        <Donation />
        <Testimonials />
        <Subscribe />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
