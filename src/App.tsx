import "./App.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import Test_Telescop from "./components/Telescope/Test_TelescopeContent";
import Test_TelescopHeader from "./components/Telescope/Test_TelescopHeader";
import Test_Telescop1 from "./components/Telescope/Test_Telescop1";
import Telescope from "./components/Telescope";
// import Test_TelescopeBtn from "./components/Telescope/Test_TelescopeBtn";

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
       
      
      {/* <Telescope/> */}
      {/* <Test_Telescop/> */}
      {/* <Test_TelescopHeader/> */}
      {/* <Test_Telescop1/> */}
      {/* <Test_TelescopeBtn/> */}
      <div className="w-full h-screen bg-blue-400" id="main"></div>
      <Telescope/>
      
      {/* <div className="w-200 h-10 bg-yellow-600 fixed inset-[auto_0.3rem_0.3rem_0.3rem]"></div>
      <div className="h-[10rem] bg-green-600 fixed inset-[auto_0.75rem_0.75rem_0.75rem]"></div> */}
      </ReactLenis>
    </>
  );
}

export default App;
