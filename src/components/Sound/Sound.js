import { useState, useEffect } from "react";

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

const Player = ({ song }) => {
  const [playing, toggle] = useAudio(song);

  return (
    <div>
      <button onClick={toggle}>
        {playing ? "Pause" : "Play"}
        <img className={styles.player} />
      </button>
    </div>
  );
};

export default Player;
