import { useGSAP } from '@gsap/react';
import  { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
gsap.registerPlugin(useGSAP);
const slides = [
  "./pics/tel-1.jpg",
  "./pics/tel-2.jpg",
  "./pics/tel-3.jpg",
  "./pics/tel-4.jpg",
  "./pics/tel-5.jpg",
];



const Carousel = () => {

  
  const [current, setCurrent] = useState(0);
  const leftCircleRef= useRef<SVGCircleElement>(null)
  const rightCircleRef= useRef<SVGCircleElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])

  // Bring next slide to front
    // nextSlide.classList.add("is-active")
   
    // currentSlide.classList.add("is-old")

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

    console.log("slides")
      console.table({current, next})
    // currentSlide.classList.add("is-active")
    // const isNewRound = currentIndex - nextIndex === -1?true:false


    // console.log("new round", isNewRound, "diff", nextIndex - currentIndex)

    tl.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" })
      .set(nextSlide, { zIndex: 3})
      .set(currentSlide, { zIndex: 4 })
      .to(leftCircleRef.current, {
        strokeDashoffset: "314%",
        duration: 2,
        ease: "cubic-bezier(0.77, 0, 0.175, 1)",
      })
      .to(
        rightCircleRef.current,
        {
          strokeDashoffset: "314%",
          duration: 2.5,
          ease: "cubic-bezier(0.77, 0, 0.175, 1)"
        },
        0.3
      );

})

// go next slide

const nextSlide = ()=>{

}

useEffect(()=>{
// console.log(slideRefs.current)
// if (slideRefs.current[slides.length - 1]) {
//   slideRefs.current[slides.length - 1].classList.add("is-active");
// }
const ctx =gsap.context(()=>{

  if(!slideRefs.current.length  || !leftCircleRef.current || !rightCircleRef.current) return

  slideRefs.current.forEach((el, i) => {
    // gsap.set(el, { zIndex: i === current ? 2 : 0 });
    if(i === current)el.classList.add("is-active")
  });
  if (leftCircleRef.current && rightCircleRef.current) {
    gsap.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" });
  }
})

return ()=> ctx.revert()

},[])

  return (
    <>
    <div className="w-full h-screen relative overflow-hidden">
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
    <svg width="0" height="0" viewBox="0 0 1440 1276">
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
            cx="25%"
            cy="50%"
            transform="matrix(0.70711,0.70711,-0.70711,0.70711,556.57658,-67.69578)"
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
            cx="25%"
            cy="50%"
            transform="matrix(0.70711,-0.70711,0.70711,0.70711,-345.69578,441.42342)"
          ></circle>
        </mask>
      </defs>
    </svg>
  </>
  )
}

export default Carousel