import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initAnimations } from './utils/animations.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Initialize animations after the app has rendered
window.addEventListener('load', () => {
  // Ensure all elements are visible first
  const allElements = document.querySelectorAll('.resources-card, .prayer-time-item, .testimonial-item');
  allElements.forEach(el => {
    if (el) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.visibility = 'visible';
    }
  });

  // Then initialize animations with a longer delay to ensure content is visible
  setTimeout(() => {
    initAnimations();
  }, 300);
});
