import "./App.css"
import Intro from "./components/ZoomEffect/Intro";
import ZoomEffect from "./components/ZoomEffect/ZoomEffect";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {SplitText} from 'gsap/SplitText'
import {ReactLenis, type LenisRef} from 'lenis/react'

gsap.registerPlugin(ScrollTrigger,SplitText);

function App() {
  const lenisRef = useRef<LenisRef>(null)
  const heroContainerRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
     function update(time:number) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update)

    return ()=> gsap.ticker.remove(update)
    
  },[])

  useGSAP(() => {
    if(!heroContainerRef.current) return
    // set the intial size of every layer
    gsap.set(".image.mask", { scale: (i) => 0.9 - i * 0.15 });

    // scale down the container to zero intially

    gsap.set(".banner-img-container", { scale: 0 });

    // animate images from deeper z
    gsap.from([".pic.z-1",".pic.z-2",".pic.z-4"],{
      z:-50,
      duration:1,
      overwrite:"auto",
      delay:.1,
      
    }
  )

  // animate text
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

    // gsap.set(".text-left, .text-right", { xPercent: 0 });

    ScrollTrigger.create({
      trigger: heroContainerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 4}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: ({ progress }) => {

        if(progress >=0. && progress <=.3){
          // Intro component animation
          // cinamatic intro animation
          const introProgress = (((progress - 0) * (1.-0))/(.3 - .0)) + .0 // range maping
         const clampedIntro =Math.min(Math.max(introProgress,0),1)
  
         gsap.to(".pic.z-1",{z:clampedIntro * 400,})
     gsap.to(".pic.z-2",{z:clampedIntro * 600})
     
     gsap.to(".pic.z-4",{z:clampedIntro * 800})
        }
       
        // zoom effect animation
        gsap.set(".banner-img-container", { scale: progress.toFixed(2) });

        gsap.set(".image.mask", {
          scale: (i) => {
            const initialScale = 0.9 - i * 0.15;
            const layerProgress = Math.min(progress / 0.9, 1.0);

            const currentScale =
              initialScale + layerProgress * (1.0 - initialScale); // the equation calcuate the speed in which each layer should scale

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
    <ReactLenis root ref={lenisRef} options={{lerp:.05,autoRaf:false}}>

    <div className=" w-full h-screen relative hero" ref={heroContainerRef}>

<div className="absolute w-full h-full">

    <Intro/>
</div>

<div className="absolute w-full h-full">

    <ZoomEffect/>
</div>
   

    </div>
    </ReactLenis>

    </>
  );
}

export default App;
