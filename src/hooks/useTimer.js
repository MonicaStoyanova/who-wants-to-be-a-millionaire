import { useEffect, useCallback, useState } from "react";

const useSecondsInterval = (callback, delay = 1000) => {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};

export const useTimer = ({ initialSeconds, initiallyRunning = true } = {}) => {
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

  return { pause, reset, running, seconds, start, stop };
};
