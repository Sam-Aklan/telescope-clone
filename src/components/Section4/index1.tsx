import { useCallback, useMemo, useRef } from 'react'
import CircularCarousel from '../CircularCarousel'
import ImagesTrailing from '../ImageTrailerSection'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Section4 = () => {

  // this is a parallex stack animation
 const panelsHeights =  useMemo(()=>{
    return [
      {id:"#carousel-container",height:window.innerHeight * 4.8},
      {id:"#section-container",height:window.innerHeight * 1.5},
    ]
  },[])

  const cumulativePanelsHeights = useMemo(()=>{
  return panelsHeights.reduce<{id:string,height:number}[]>((acc,{id,height},i)=>{
    if(i ===0){

      acc.push({id,height})
    }else{
      const previousHeight = acc[i - 1].height;
      acc.push({
        id,
        height: previousHeight + height
      })
    }
    return acc
   
  },[])

},[])

const totalHeight = useMemo(()=>{
  return panelsHeights.reduce((a,b)=>a + b.height,0)
},[])

const scrollPercent = useCallback((px: number) =>
  (px / window.innerHeight) * 100,[])

const masterTlRef = useRef<gsap.core.Timeline|undefined>(undefined)

useGSAP(()=>{

   const panels = gsap.utils.toArray<HTMLDivElement>(".panel");

    // Set stacking order
    gsap.set(panels, {
      zIndex: (i) => i
    });
    
const baseScroll = cumulativePanelsHeights[0].height

    panels.forEach((panel, i) => {
      
  const startPx = cumulativePanelsHeights[i].height - baseScroll;
  let endPx = 0;
  // if(i === panelsHeights.length - 1){
  //     endPx =
  //    (cumulativePanelsHeights[i]?.height ?? totalHeight) ;
  // }else{

  //   endPx =
  //    (cumulativePanelsHeights[i + 1]?.height ?? totalHeight) - baseScroll;
  // }

  endPx =startPx + panelsHeights[i].height;

  const offset = scrollPercent(startPx);

  gsap.fromTo(
    panel,
    { yPercent: offset },
    {
      yPercent: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#container",
        start: () => `top+=${startPx} top`,
        end: () => `top+=${endPx} top`,
        scrub: true,
        markers: true,
        onUpdate:({progress})=>{
          console.log("progress",i,progress)
        }
      }
    }
  );
});
masterTlRef.current = gsap.timeline({
  scrollTrigger:{
     trigger: "#container",
  start: "top top",
  end: () => `+=${totalHeight - baseScroll}`,
  pin: true,
  pinSpacing:true,
  scrub: true
  }
})

// ScrollTrigger.create({
//   trigger: "#container",
//   start: "top top",
//   end: () => `+=${totalHeight}`,
//   pin: true,
//   pinSpacing:true,
//   scrub: true
// });


})
  return (
    <>
     <div className="w-full h-screen bg-yellow-400"></div>
     <div id='container' className='w-full h-screen relative overflow-hidden'>

       <CircularCarousel containerAnimation={masterTlRef.current}/>

       <ImagesTrailing containerAnimation={masterTlRef.current}/>
     </div>
       
      <div className="w-full h-screen bg-yellow-400"></div>
    </>
  )
}

export default Section4