import * as React from "react";

export const useInterval = (cb: () => void, d: number): void => {
  React.useEffect(() => {
    const interval = setInterval(cb, d);
    return () => {
      clearInterval(interval);
    };
  }, [cb, d]);
};

export const useCountdown = (deadline: number, pollInterval = 1000): number => {
  const [remaining, setRemaining] = React.useState(deadline - Date.now());
  React.useEffect(() => {
    if (!deadline) {
      return;
    }
    const interval = setInterval(() => {
      setRemaining(deadline - Date.now());
    }, pollInterval);
    return () => {
      clearInterval(interval);
    };
  }, [deadline, pollInterval]);
  return remaining;
};
