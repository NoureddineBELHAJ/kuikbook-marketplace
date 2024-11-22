import React from 'react';
import { createRoot } from 'react-dom/client';
import { initErrorMonitoring } from './services/errorMonitoring';
import App from './App';
import './index.css';

// Initialize error monitoring
initErrorMonitoring();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);