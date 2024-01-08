import { Button } from "@mui/joy";

import { useAudio } from "hooks/useAudio";

import styles from "./Sound.module.css";

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
