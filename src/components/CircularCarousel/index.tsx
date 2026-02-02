import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from 'react';
import CarouselThumbnails from './CarouselThumbnails';

gsap.registerPlugin(MotionPathPlugin,ScrollTrigger);

const slideImages = [
    "kevinbidwell.jpg",
    "dad-palstine.jpg",
    "pexels-moose.jpg",
    "christian-buehner.jpg",
    "silverkblack.jpg",
    "pexels-hk.jpg",
]

const CircularCarousel = () => {

    const carouselContainerRef = useRef<HTMLDivElement | null>(null)
    const [current, setCurrent] = useState(0);
    const currentRef = useRef(current)
    const slideRefs = useRef<HTMLDivElement[]>([])

   const {contextSafe}= useGSAP(()=>{

     // intialization for navigation and cards
  if(!slideRefs.current.length ) return

  slideRefs.current.forEach((el, i) => {
   
    if(i === current) gsap.set(el,{zIndex:4})
  });

  gsap.set(".thumbNail",{
    motionPath:{
       path:"#curve",
        align:"#curve",
        alignOrigin:[.5,.5],
        start:0,
        end:0,
    }
  })

    gsap.to(".thumbNail",{
      motionPath:{
        path:"#curve",
        align:"#curve",
        alignOrigin:[.5,.5],
      },
      stagger:0.07,
      ease:"power2.inOut",
      scrollTrigger:{
        trigger:"#stack-wrapper",
        start:"top top",
        end:`+=${slideImages.length * 80}%`,
        scrub:1,
        onUpdate:({progress})=>{
      const roundedProgress = Math.round(progress * 100) / 100
      
      if(roundedProgress >= .38 && roundedProgress <.72){
        const mappedIndex =( ((roundedProgress - .38) * (5 - 1)) / (.7-.38)) + 1
        if(Math.floor(mappedIndex) !== currentRef.current) goToSlide(Math.floor(mappedIndex))
      }
    else if(roundedProgress < .38 ){
       
      goToSlide(0)
    }
    },
    
        onEnterBack:()=>{
          gsap.set(".thumbNail",{opacity:1})
        }
      },
      onComplete:()=>{
        gsap.set(".thumbNail",{opacity:0})
      },
      
    })

  },)


  const goToSlide = contextSafe((newIndex:number)=>{

  if(newIndex === currentRef.current) return
 
  const newSlide = slideRefs.current[newIndex];
  const currentSlide = slideRefs.current[currentRef.current];

  if (!newSlide || !currentSlide) return;

gsap.set(newSlide,{zIndex:4});
gsap.set(currentSlide,{zIndex:3})
setCurrent(newIndex)      

},)



  useEffect(()=>{
    currentRef.current = current
},[current])

  return (
    <div id='carousel-container' className="w-full h-screen absolute panel z-2" ref={carouselContainerRef}>
      <div className="w-full h-full overflow-hidden relative">

         {slideImages.map((src, i) => (
        
          <div className="thumb-slide "
            key={i}
          ref={(el)=>{
            if(el) slideRefs.current[i] = el
          }}
          >
          <img src={`./pics/intro/${src}`} alt="" className='w-full h-full object-cover' loading='lazy'/>
          </div>
        
      ))}

      <CarouselThumbnails thumbNailsImages={slideImages}/>
      </div>

    </div>
  )
}

export default CircularCarousel