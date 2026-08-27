import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './memory-page.css';
import './hero-overrides.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);