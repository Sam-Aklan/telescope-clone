export const preloadImages = (sources: string[]) => {
  let loaded = 0;

  return new Promise<void>((resolve, reject) => {
    if (sources.length === 0) resolve();

    sources.forEach((src) => {
      const img = new Image();

      img.src = src;

      img.onload = () => {
        loaded++;
        if (loaded === sources.length) resolve();
      };

      img.onerror = reject;
    });
  });
};