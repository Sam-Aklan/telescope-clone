

import { useState, useEffect} from 'react';
import useDebounce from './useDebounce';

interface WindowSize {
  width: number ;
  height: number ;
}

function useWindowSize(debounceDelay = 300) {

   const getSize = (): WindowSize => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const getBreakpoints = () => ({
    isMobile: window.matchMedia('(max-width: 767px)').matches,
    isTablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches,
    isDesktop: window.matchMedia('(min-width: 1024px) and (max-width: 1279px)').matches,
    isXlarge: window.matchMedia('(min-width: 1280px)').matches,
  });

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);
  const [breakpoints, setBreakpoints] = useState(getBreakpoints);

  const debouncedWindowSize = useDebounce(windowSize, debounceDelay);

  useEffect(() => {
    // ---- Size listener ----
    const handleResize = () => {
      setWindowSize(getSize());
    };

    window.addEventListener('resize', handleResize);

    // ---- Breakpoint listeners ----
    const mediaQueries = [
      window.matchMedia('(max-width: 767px)'),
      window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      window.matchMedia('(min-width: 1024px) and (max-width: 1279px)'),
      window.matchMedia('(min-width: 1280px)'),
    ];

    const handleMediaChange = () => {
      setBreakpoints(getBreakpoints());
    };

     mediaQueries.forEach(mq =>
      mq.addEventListener('change', handleMediaChange)
    );

    // Initialize once on mount
    handleResize();
    handleMediaChange();


     return () => {
      window.removeEventListener('resize', handleResize);
      mediaQueries.forEach(mq =>
        mq.removeEventListener('change', handleMediaChange)
      );
    };
    
  }, []);

  return {
    ...breakpoints,
    debouncedWindowSize
  };
}

export default useWindowSize;
