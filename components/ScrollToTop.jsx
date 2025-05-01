import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever the route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Use 'instant' instead of 'smooth' for immediate scrolling
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
