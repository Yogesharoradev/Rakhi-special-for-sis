import React from 'react';
import { createRoot } from 'react-dom/client';
import SiblingsExperience from './SiblingsExperience.jsx';
import MusicPlaylist from './MusicPlaylist.jsx';
import './memory-page.css';
import './hero-overrides.css';

function Root(){return <><SiblingsExperience/><MusicPlaylist/></>}
createRoot(document.getElementById('root')).render(<React.StrictMode><Root/></React.StrictMode>);
