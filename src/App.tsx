import "./App.css";
import gsap from "gsap";
import {  useEffect,  useMemo,  useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import ZoomEffectSection from "./components/ZoomEffectSection";
import Section4 from "./components/Section4";
import CurationCarouselSection from "./components/Curation-Carousel-Section";
import Telescope from "./components/Telescope";
import { useImagePreloader } from "./lib/useImagePreloader";
import OverLayLoader from "./components/OverLayLoader";

function App() { 

  const images = useMemo(()=>["./pics/leonardo.jpg",
  "./pics/Mari-curl.jpg",
  "./pics/albert-einstein.jpg",
  "./pics/Mozart.jpg",
  "./pics/frida-kahlo.jpg",
  "./intro/albert-dera.jpg",
"./intro/charlie-green.jpg",
"./intro/christian-buehner.jpg",
"./intro/abubakr-palestine.jpg",
"./intro/dad-palstine.jpg",
"./intro/clint-maliq.jpg",
"./intro/dajana-reci.jpg",
"./intro/jean-daniel.jpg",
"./intro/kevinbidwell.jpg",
"./intro/old-palestain.jpg",
"./intro/sara-palestine.jpg",
"./intro/pexels-hk.jpg",
"./zoom/stefan-moertl.jpg",
"./zoom/stefan-moertl.png",
],[])

const{isDone,progress} = useImagePreloader(images)

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
     { !isDone&&<OverLayLoader progress={progress}/>}
     <ReactLenis root ref={lenisRef} options={{ lerp: 0.05, autoRaf: false }}>
        <ZoomEffectSection/>
        <CurationCarouselSection/>
        <Telescope/>
        <Section4/>
      </ReactLenis>
    </>
  );
}

export default App;
