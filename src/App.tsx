import "./App.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import CircularCarousel from "./components/CircularCarousel";
import ImagesTrailer from "./components/Test_ImagesTrailer";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<LenisRef>(null);


  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <>
      <ReactLenis root ref={lenisRef} options={{ lerp: 0.05, autoRaf: false }}>
       
       {/* <CircularCarousel/> */}
       <div className="w-full h-screen bg-amber-300"></div>

        <div className="w-full h-screen">
          {/* <ImagesTrailer /> */}
          <ImagesTrailer/>
        </div>
         <div className="w-full h-screen bg-amber-300"></div>
      </ReactLenis>
    </>
  );
}

export default App;
