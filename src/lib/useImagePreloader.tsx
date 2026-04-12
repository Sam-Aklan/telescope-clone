import { useEffect, useState } from "react";

export const useImagePreloader = (sources: string[]) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!sources.length) {
      setIsDone(true);
      return;
    }

    let loaded = 0;

    sources.forEach((src) => {
      const img = new Image();
      img.src = src;

      img.onload = img.onerror = () => {
        loaded++;
        setProgress((loaded / sources.length) * 100);

        if (loaded === sources.length) {
          setIsDone(true);
        }
      };
    });
  }, [sources]);

  return { progress, isDone };
};