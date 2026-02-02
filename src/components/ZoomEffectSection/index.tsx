import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import {SplitText} from 'gsap/SplitText'
import Intro from "./Intro";
import ZoomEffect from "./ZoomEffect";

gsap.registerPlugin(ScrollTrigger,SplitText);

function ZoomEffectSection() {
  const heroContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if(!heroContainerRef.current) return
    gsap.set(".image.mask", { scale: (i) => 0.9 - i * 0.15 });
    gsap.set(".banner-img-container", { scale: 0 });

    const tl = gsap.timeline()

    tl.from(".pic.z-1",{
      z:-50,
      autoAlpha:0,
      duration:1,
      overwrite:"auto",
      stagger:.2,
      
    }
  )

  tl.from(".pic.z-2",{
     z:-50,
      duration:1,
      overwrite:"auto",
      autoAlpha:0,
      stagger:.2,
  },"<")

  tl.from(".pic.z-4",{
     z:-50,
      duration:1,
      autoAlpha:0,
      overwrite:"auto",
      stagger:.2,
  },"<")

  const secondLine =heroContainerRef.current.querySelectorAll(".line")

  secondLine.forEach(phrase=>{
    const splitedWords = new SplitText(phrase,{type:"words",wordsClass:"word"})
    splitedWords.words.forEach(word=>{
      word.innerHTML = `<span>${word.innerHTML}</span>`
    })
  })

  gsap.fromTo(".word >span",{
    opacity:0,
    y:"100%",
  },{
    opacity:.8,
    y:"0",
    stagger:.3,
    duration:1,
    ease:"power2.inOut"
  })

    ScrollTrigger.create({
      trigger: heroContainerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {

        if(progress >=0. && progress <=.3){
         
          const introProgress = (((progress - 0) * (1.-0))/(.3 - .0)) + .0 ;
         const clampedIntro =Math.min(Math.max(introProgress,0),1)
         
         gsap.to(".pic.z-1",{z:clampedIntro * 400,})
     gsap.to(".pic.z-2",{z:clampedIntro * 600})
     
     gsap.to(".pic.z-4",{z:clampedIntro * 800})

        }

        if(progress > .3 && progress < .5){
          const mappedProgress = (((progress - .3) * (1.-0))/(.5 - .3)) + .3

           gsap.to(".first-line >.word",{
            opacity:1 - mappedProgress,
            y:-25 * mappedProgress,
            stagger:.1,
           })

        }
     
        gsap.set(".banner-img-container", { scale: progress.toFixed(2) });

        gsap.set(".image.mask", {
          scale: (i) => {
            const initialScale = 0.9 - i * 0.15;
            const layerProgress = Math.min(progress / 0.9, 1.0);

            const currentScale =
              initialScale + layerProgress * (1.0 - initialScale); 
              
            return currentScale;
          },
        });

    

        gsap.to(".left-text", { xPercent: progress*2 * -500 });
        gsap.to(".right-text", { xPercent: progress*2 * 500 });
      },
    });
  },{scope:heroContainerRef});

 

  
  return (
    <>
   

    <div className=" w-full h-screen relative hero" ref={heroContainerRef}>

<div className="absolute w-full h-full overflow-hidden">

    <Intro/>
</div>

<div className="absolute w-full h-full overflow-hidden">

    <ZoomEffect/>
</div>
   

    </div>
    

    </>
  );
}

export default ZoomEffectSection;