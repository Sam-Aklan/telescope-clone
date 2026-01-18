import { useGSAP } from "@gsap/react";
import {useRef} from "react";
import CircularCarousel from "../CircularCarousel";
import ImagesTrailer from "../ImageTrailerSection";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)

const Section4 = () => {
  
  const sectionRef = useRef<HTMLDivElement | null>(null);
 
useGSAP(() => {

 gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=730%",
        scrub: 1,
        pin: true,
        
      }
    })

 

  }, { scope: sectionRef })

    

  return (
    <>
      <div className="w-full h-screen bg-yellow-300" />

      <div
        ref={sectionRef}
        id="stack-wrapper"
        className="relative w-full h-screen"
      >
        

        <CircularCarousel />
        <ImagesTrailer/>
       

       
      </div>

      <div className="w-full h-screen bg-yellow-300" />
    </>
  );
};

export default Section4