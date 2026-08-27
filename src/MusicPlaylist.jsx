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
      if (switching) return;
      try {
        await audio.play();
      } catch (error) {
        // Browser autoplay policy: the Enter button will retry playback.
      }
    };

    const handleEnded = async () => {
      switching = true;
      trackIndex = (trackIndex + 1) % TRACKS.length;
      audio.src = TRACKS[trackIndex];
      audio.load();
      try {
        await audio.play();
      } catch {}
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

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Expose a reliable starter for the Enter button.
    audio.dataset.rakhiPlaylistReady = 'true';
    window.startRakhiMusic = playCurrent;

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      delete window.startRakhiMusic;
    };
  }, []);

  return null;
}
