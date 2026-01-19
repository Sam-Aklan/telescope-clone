import "./App.css";
import gsap from "gsap";
import {  useEffect,  useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import Section4 from "./components/Section4";

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
       <Section4/>
      </ReactLenis>
    </>
  );
}

export default App;
