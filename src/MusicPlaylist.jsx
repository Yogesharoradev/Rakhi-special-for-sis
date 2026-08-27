import { useEffect } from 'react';

const TRACKS = [
  '/audio/Chatte%20Batte%20(PenduJatt.Com.Se).mp3',
  '/audio/Phoolon%20Ka%20Taron%20Ka%20Male%20Hare%20Rama%20Hare%20Krishna%20128%20Kbps.mp3',
];

export default function MusicPlaylist() {
  useEffect(() => {
    const audio = document.querySelector('audio[data-rakhi-player]') || document.querySelector('audio');
    if (!audio) return;

    let trackIndex = 0;
    let switching = false;

    audio.loop = false;
    audio.preload = 'auto';
    audio.src = TRACKS[0];
    audio.load();

    const playCurrent = async () => {
      try {
        await audio.play();
      } catch (error) {
        console.warn('Rakhi music needs a user gesture:', error);
      }
    };

    const handleEnded = async () => {
      if (switching) return;
      switching = true;
      trackIndex = (trackIndex + 1) % TRACKS.length;
      audio.src = TRACKS[trackIndex];
      audio.load();
      try { await audio.play(); } catch {}
      switching = false;
    };

    const handleError = () => {
      if (switching) return;
      switching = true;
      trackIndex = (trackIndex + 1) % TRACKS.length;
      audio.src = TRACKS[trackIndex];
      audio.load();
      switching = false;
    };

    const handleFirstClick = (event) => {
      const button = event.target.closest('button');
      if (!button) return;
      const text = button.textContent?.toLowerCase() || '';
      if (text.includes('enter your surprise')) playCurrent();
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    document.addEventListener('click', handleFirstClick, true);

    audio.dataset.rakhiPlaylistReady = 'true';
    window.startRakhiMusic = playCurrent;

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      document.removeEventListener('click', handleFirstClick, true);
      delete window.startRakhiMusic;
    };
  }, []);

  return null;
}
