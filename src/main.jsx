import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import MusicPlaylist from './MusicPlaylist.jsx';
import './memory-page.css';
import './hero-overrides.css';

function Root() {
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