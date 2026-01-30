import CarousselThumbPara from '../ShutterSection/CarouselThumbPara'
import CurationSection from '../Curation'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const CurationCarouselSection = () => {

  const carouselCurationRef = useRef<HTMLDivElement>(null)

  useGSAP(()=>{
    // console.log(document.querySelector('.curation')?.clientHeight)
    const curationHeight = document.querySelector('.curation')?.clientHeight

    if(!curationHeight) return
    const curationHeightPrecent = (curationHeight / window.innerHeight) * 100

    // console.log("precent net", (curationHeightPrecent ).toFixed(3))
    // console.log("precent", (curationHeightPrecent + 50).toFixed(3))
    // console.log("precent", `+=${(curationHeightPrecent + 50).toFixed(3)}%`)

    gsap.set(".white-overlay",{
      opacity:0,
    })

    ScrollTrigger.create({
      trigger:carouselCurationRef.current,
      start:"top top",
      end:`+=${(curationHeightPrecent + 50).toFixed(3)}%`,
      pin:true,
      pinSpacing:true,
      scrub:1,
      onUpdate:({progress})=>{
        if(progress > .8 && progress <=.95){
          const mappedProgress =( ((progress - .8) * 1) / (.95 - .8)) 
          // console.log("mapped progress opacity",mappedProgress)
          gsap.set(".white-overlay",{
            opacity:mappedProgress
          })
        }
      },
      onLeaveBack:()=>{
        gsap.set(".white-overlay",{
          opacity:0,
        })
      },
      // onLeave:()=>{
      //   gsap.set(".white-overlay",{
      //     opacity:0,
      //   })
      // },
    })


  },{scope:carouselCurationRef})

  return (
    <div id="carousel-curation" className='relative w-full h-screen' ref={carouselCurationRef}>
    <CarousselThumbPara/>
    <div className="white-overlay w-full h-screen absolute top-0 left-0 z-20 bg-white pointer-events-none"/>
    <CurationSection/>
    </div>
  )
}

export default CurationCarouselSection