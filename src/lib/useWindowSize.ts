

import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

interface WindowSize {
  width: number ;
  height: number ;
}

function useWindowSize(debounceDelay = 300) {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width:0,
    height: 0,
  });

  const debouncedWindowSize = useDebounce(windowSize, debounceDelay);
  // const [isMobile,setIsMobile] = useState(debouncedWindowSize?.width < 768?true:false)
  // const [isTablet,setIsTablet] = useState(debouncedWindowSize?.width > 768 && debouncedWindowSize.width<1024?true:false)
  // const [isDesktop,setIsDesktop] = useState(debouncedWindowSize?.width > 1024 && debouncedWindowSize.width<1280?true:false)

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window?.innerWidth || 0,
        height: window?.innerHeight || 0,
      });
      // setIsMobile(debouncedWindowSize.width <768)
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect(()=>{

  //   setIsMobile(debouncedWindowSize.width < 768)
  //   setIsTablet(debouncedWindowSize?.width > 768 && debouncedWindowSize.width<1024?true:false)
  //   setIsDesktop(debouncedWindowSize?.width > 1024 && debouncedWindowSize.width<1280?true:false)
  // },[debouncedWindowSize.width])

   const isXlarge = windowSize.width > 1280
  const isDesktop = windowSize.width >= 1024  && windowSize.width< 1280
  const isTablet = windowSize.width < 1200 && windowSize.width >= 768
  const isMobile = windowSize.width <768

  return {isMobile,isTablet,isDesktop,isXlarge,debouncedWindowSize};
}

export default useWindowSize;
