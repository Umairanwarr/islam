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
  // Allow a small delay for the app to fully render
  setTimeout(() => {
    initAnimations();
  }, 100);
});
