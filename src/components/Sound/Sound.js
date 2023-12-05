import { useState, useEffect } from "react";
import { Button } from "@mui/joy";

import styles from "./Sound.module.css";
import song from "../../assets/sound.mp3";

const useAudio = () => {
  const [audio] = useState(new Audio(song));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};
// if user navigates else museic should stop

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
