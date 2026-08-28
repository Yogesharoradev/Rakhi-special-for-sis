import { useEffect } from "react";

const TRACKS = ["/audio/song-1.mp3", "/audio/song-2.mp3"];

export default function MusicPlaylist() {
  useEffect(() => {
    const audio = document.querySelector("audio[data-rakhi-player]");
    if (!audio) return;

    let trackIndex = 0;
    let switching = false;
    let wasPlayingBeforeMemory = false;

    audio.loop = false;
    audio.preload = "auto";

    const loadTrack = (index, autoplay = false) => {
      trackIndex = index;
      audio.src = TRACKS[trackIndex];
      audio.load();
      if (autoplay) audio.play().catch(() => {});
    };

    const playCurrent = () => audio.play().catch(() => {});

    const handleEnded = () => {
      if (switching) return;
      switching = true;
      loadTrack((trackIndex + 1) % TRACKS.length, true);
      switching = false;
    };

    const handleMemoryOpen = () => {
      wasPlayingBeforeMemory = !audio.paused && !audio.muted;
      audio.pause();
    };

    const handleMemoryClose = () => {
      if (wasPlayingBeforeMemory) audio.play().catch(() => {});
      wasPlayingBeforeMemory = false;
    };

    audio.addEventListener("ended", handleEnded);
    window.addEventListener("rakhi:memory-open", handleMemoryOpen);
    window.addEventListener("rakhi:memory-close", handleMemoryClose);

    loadTrack(0);
    window.startRakhiMusic = playCurrent;

    return () => {
      audio.removeEventListener("ended", handleEnded);
      window.removeEventListener("rakhi:memory-open", handleMemoryOpen);
      window.removeEventListener("rakhi:memory-close", handleMemoryClose);
      delete window.startRakhiMusic;
    };
  }, []);

  return null;
}
