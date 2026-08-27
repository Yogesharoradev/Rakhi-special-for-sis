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
    audio.loop = false;

    const playCurrent = async () => {
      audio.src = TRACKS[trackIndex];
      audio.load();
      try {
        await audio.play();
      } catch {
        // The browser may require the user's Enter button before playback.
      }
    };

    const handleEnded = () => {
      trackIndex = (trackIndex + 1) % TRACKS.length;
      playCurrent();
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', () => {
      if (trackIndex < TRACKS.length - 1) {
        trackIndex += 1;
        playCurrent();
      }
    });

    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  return null;
}
