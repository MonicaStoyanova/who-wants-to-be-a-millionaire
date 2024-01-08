import { useState, useEffect } from "react";
import { Button } from "@mui/joy";

import styles from "./Sound.module.css";
import song from "../../assets/sounds/sound.mp3";

// transfer to custom hooks
const useAudio = () => {
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(true);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    audio.loop = true;
    if (playing) {
      audio.play().catch((error) => {
        // the error: DOMException: The play() request was interrupted by a call to pause().
        // appears in chrome
        console.log("Play error:", error);
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

const Player = ({ song }) => {
  const [playing, toggle] = useAudio(song);

  return (
    <div className={styles.playerContainer}>
      <Button
        variant="plain"
        className={playing ? styles.playerOn : styles.playerOff}
        onClick={toggle}
      ></Button>
    </div>
  );
};

export default Player;
