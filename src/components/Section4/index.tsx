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

   gsap.set(".black-overlay",{
              opacity: 0,
            })

 gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=830%",
        scrub: 1,
        pin: true,
        pinSpacing:true,
        onUpdate:({progress})=>{
          if(progress >.66 && progress <= 1.){
            const mappedProgress = ((progress - .66) *(1 - 0)) / (1. - .66) +0.;
            gsap.set(".black-overlay",{
              opacity: `${30 * mappedProgress}%`,
            })
          }
        }
        
      }
    })

 

  }, { scope: sectionRef })

    

  return (
    <>
     
      <div
        ref={sectionRef}
        id="stack-wrapper"
        className="relative w-full h-screen"
      >
        
        <CircularCarousel />
        <ImagesTrailer/>
        <div className="w-full h-screen absolute bg-black z-20 black-overlay pointer-events-none"/>

       
      </div>

    </>
  );
};

export default Section4