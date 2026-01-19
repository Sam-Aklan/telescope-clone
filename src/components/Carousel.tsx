import { useGSAP } from '@gsap/react';
import  { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useResponsiveMatrix } from '../lib/useResposiveTranslation';
import useWindowSize from '../lib/useWindowSize';
gsap.registerPlugin(useGSAP);
const slides = [
 "./pics/leonardo.jpg",
  "./pics/Mari-curl.jpg",
  "./pics/albert-einstein.jpg",
  "./pics/Mozart.jpg",
  "./pics/frida-kahlo.jpg",
];



const Carousel = () => {

  
  const [current, setCurrent] = useState(0);
  const leftCircleRef= useRef<SVGCircleElement>(null)
  const rightCircleRef= useRef<SVGCircleElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])
  const maskContainerRef=useRef<HTMLDivElement|null>(null)

 const {contextSafe}= useGSAP()

const goToSlide = contextSafe((nextIndex:number)=>{

  const next = (nextIndex + slides.length) % slides.length;
  const currentIndex = (current + slides.length) % slides.length;

  const nextSlide = slideRefs.current[next];
  const currentSlide = slideRefs.current[currentIndex];

  if (!nextSlide || !currentSlide || !leftCircleRef.current || !rightCircleRef.current) return;


    const tl = gsap.timeline({
      onComplete: () => {
        currentSlide.classList.remove("is-active")
        setCurrent(next);
        slideRefs.current.forEach((el, i) => {
          gsap.set(el, { zIndex: i === next ? 3 : i ===currentIndex?2:0 });
          if(i === next) el.classList.add("is-active")
        });
        // Reset mask to 0% after animation so new slide stays visible
        gsap.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" });
      }
    });

    // console.log("slides")
    //   console.table({current, next})
    // currentSlide.classList.add("is-active")
    // const isNewRound = currentIndex - nextIndex === -1?true:false


    // console.log("new round", isNewRound, "diff", nextIndex - currentIndex)

    tl.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" })
      .set(nextSlide, { zIndex: 3})
      .set(currentSlide, { zIndex: 4 })
      .to(leftCircleRef.current, {
        strokeDashoffset: "-314%",
        duration: 1.5,
        // ease: "cubic-bezier(0.77, 0, 0.175, 1)",
        ease:"power3.inOut"
      })
      .to(
        rightCircleRef.current,
        {
          strokeDashoffset: "-314%",
          duration: 1.5,
          // ease: "cubic-bezier(0.77, 0, 0.175, 1)"
          ease:"power3"
        },
        0.3
      );

})

// go next slide

useEffect(()=>{

const ctx =gsap.context(()=>{

  if(!slideRefs.current.length  || !leftCircleRef.current || !rightCircleRef.current) return

  slideRefs.current.forEach((el, i) => {
    // gsap.set(el, { zIndex: i === current ? 2 : 0 });
    if(i === current)el.classList.add("is-active")
  });
  if (leftCircleRef.current && rightCircleRef.current) {
    leftCircleRef.current.setAttribute("stroke-dashoffset","0%")
    rightCircleRef.current.setAttribute("stroke-dashoffset","0%")
    // gsap.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" });
  }
})

return ()=> ctx.revert()



},[])

const {debouncedWindowSize}= useWindowSize()

const leftMatrix = useResponsiveMatrix(
  {
   
  
  containerRef:maskContainerRef,
  xPercent: debouncedWindowSize.width < 1024 ? .5 : .25,
  yPercent: debouncedWindowSize.width < 1024 ? .25: .5,
  rotationDegree:debouncedWindowSize.width>=1024?45:135,
  },
)

const rightMatrix = useResponsiveMatrix(
  {
  containerRef:maskContainerRef,
  xPercent: debouncedWindowSize.width < 1024 ? .5 : .25,
  yPercent: debouncedWindowSize.width < 1024 ? .25: .5,
  rotationDegree:debouncedWindowSize.width >=1024?-45:45
  },
 
)

console.log("right mask",rightMatrix, "left mask", leftMatrix)

  return (
    <>
    <div className="w-full h-screen relative overflow-hidden" ref={maskContainerRef}>
      {/* <div className="absolute top-0   left-1/2 -translate-x-1/2 w-0.5 h-full bg-red-600 z-10"></div>
      <div className="absolute top-1/4  -translate-y-1/4 left-0 w-full h-0.5 bg-red-600 z-10"></div> */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-0.5 bg-red-600 z-10"></div>
      <div className="absolute top-0 left-1/4 -translate-x-1/4 w-0.5 h-full bg-red-600 z-10"></div>
      {slides.map((src, i) => (
        <div
          key={i}
          ref={(el)=>{
            if(el) slideRefs.current[i] = el
          }}
          className="bg-item absolute w-full h-full"
        >
          {/* First half */}
          <div className="img w-full h-screen absolute">
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>

          {/* Second half */}
          <div className="img w-full h-screen">
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>
        </div>
      ))}
    </div>

    {/* Controls */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-4 z-20">
      <button
        className="bg-white px-4 py-2 rounded focus:scale-95"
        onClick={() => goToSlide(current - 1)}
      >
        Prev
      </button>
      <button
        className="bg-white px-4 py-2 rounded"
        onClick={() => goToSlide(current + 1)}
      >
        Next
      </button>
    </div>

    {/* SVG Masks */}
    <svg width="0" height="0" viewBox={`0 0 ${Math.min(1440,debouncedWindowSize.width)} ${debouncedWindowSize.height}`}>
      <defs>
        <mask id="radial-mask-left">
          <circle
            ref={leftCircleRef}
            r="50%"
            fill="none"
            stroke="white"
            strokeWidth="100%"
            strokeDasharray="314%"
            strokeDashoffset="314%"
            strokeLinecap="butt"
            cx={debouncedWindowSize.width>=1024?"25%":"50%"}
            cy={debouncedWindowSize.width>=1024?"50%":"25%"}
          // transform='matrix(0.70711,0.70711,-0.70711,0.70711,388.2844,-137.4036)' 1440 * 800
          // transform='matrix(0.70711,0.70711,-0.70711,0.70711,373.78228,-125.39219)' 1353 * 777
          // transform='matrix(0.70711,0.70711,-0.70711,0.70711,353.03325,-102.29925)'  1200 * 750
          // transform='matrix(0.70711,0.70711,-0.70711,0.70711,320.96215,-94.87265)' 1100 * 680
            transform={leftMatrix !==''?leftMatrix:undefined}
          ></circle>
        </mask>
        <mask id="radial-mask-right">
          <circle
            ref={rightCircleRef}
            r="50%"
            fill="none"
            stroke="white"
            strokeWidth="100%"
            strokeDasharray="314%"
            strokeDashoffset="314%"
            strokeLinecap="butt"
            cx={debouncedWindowSize.width>=1024?"25%":"50%"}
            cy={debouncedWindowSize.width>=1024?"50%":"25%"}
           
            // transform='matrix(0.70711,-0.70711,0.70711,0.70711,-177.4036,371.7156)' 1440 * 800
            // transform='matrix(0.70711,-0.70711,0.70711,0.70711,-175.64219,352.96772)' 1353 * 777
            // transform='matrix(0.70711,-0.70711,0.70711,0.70711,-177.29925,321.96675)' 1200 * 750
            // transform='matrix(0.70711,-0.70711,0.70711,0.70711,-159.87265,294.03785)' 1100 * 680
            // transform='matrix(0.70711,-0.70711,0.70711,0.70711,-159.87265,294.03785)'
            transform={rightMatrix !==''?rightMatrix:undefined}
          ></circle>
        </mask>
      </defs>
    </svg>
  </>
  )
}

export default Carousel