import "./App.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import ImagesTrailer from "./components/ImagesTrailer";
import CircularCarousel from "./components/CircularCarousel";

gsap.registerPlugin(ScrollTrigger, SplitText);

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
       
       <CircularCarousel/>

        <div className="w-full h-screen">
          <ImagesTrailer />
        </div>
      </ReactLenis>
    </>
  );
}

export default App;
