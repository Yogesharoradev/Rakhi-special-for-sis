import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import MusicPlaylist from './MusicPlaylist.jsx';
import { applySiblingCopy } from './sibling-copy.js';
import './memory-page.css';
import './hero-overrides.css';

function Root() {
  useEffect(() => {
    const apply = () => applySiblingCopy();
    apply();
    const timer = setTimeout(apply, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <App />
      <MusicPlaylist />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);