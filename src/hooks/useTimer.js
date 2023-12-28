import { useEffect, useCallback, useState } from "react";
import { MAX_SECONDS } from "../utils/constants";

const interval =
  (delay = 0) =>
  (callback) =>
    useEffect(() => {
      const id = setInterval(callback, delay);

      return () => clearInterval(id);
    }, [callback]);
const useSecondsInterval = interval(1000);

export const useTimer = ({
  initialSeconds = MAX_SECONDS,
  initiallyRunning = true,
  cb = () => {},
} = {}) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(initiallyRunning);

  const tick = useCallback(
    () => (running ? setSeconds((seconds) => seconds - 1) : undefined),
    [running]
  );

  const start = () => setRunning(true);
  const pause = () => setRunning(false);
  const reset = () => setSeconds(initialSeconds);
  const stop = () => {
    pause();
    reset();
  };

  useSecondsInterval(tick);

  useEffect(() => {
    if (running && seconds === 0) {
      pause();
      cb();
    }

    if (!running) {
      pause();
    }
  }, [seconds, running]);

  return { pause, reset, running, seconds, start, stop };
};
