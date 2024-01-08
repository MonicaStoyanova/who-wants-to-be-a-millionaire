import { useState, useEffect } from "react";

import song from "assets/sounds/sound.mp3";

export const useAudio = () => {
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(true);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.loop = true;
    if (playing) {
      audio.play().catch((error) => {
        console.log("Play error:", error);
        // the error: DOMException: The play() request was interrupted by a call to pause().
        // appears in chrome
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};
