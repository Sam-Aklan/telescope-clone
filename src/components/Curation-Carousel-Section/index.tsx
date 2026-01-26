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

    console.log("precent", (curationHeightPrecent + 50).toFixed(3))
    console.log("precent", `+=${(curationHeightPrecent + 50).toFixed(3)}%`)
    ScrollTrigger.create({
      trigger:carouselCurationRef.current,
      start:"top top",
      end:`+=${(curationHeightPrecent + 50).toFixed(3)}%`,
      pin:true,
      pinSpacing:true,
      scrub:1,
    })


  },{scope:carouselCurationRef})

  return (
    <div id="carousel-curation" className='relative w-full h-screen bg-white' ref={carouselCurationRef}>
    <CarousselThumbPara/>
    {/* <CurationSection/> */}
    </div>
  )
}

export default CurationCarouselSection