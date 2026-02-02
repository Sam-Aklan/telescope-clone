
import { useMemo, useRef } from 'react'
import CurateSection from './CurateSection'
import TasteMorphing from './TasteMorphing'
import YourSection from './YourSection'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger,SplitText)

const CurationSection = () => {
    const curationSectionRef = useRef<HTMLDivElement>(null)
    const curaitontextRangs =useMemo(()=>{
     
      return{
          
          curate:{
            start:.0,
            end:.35,
          },
          your:{
            start:.57,
            end:.77,
          },
          lottie:{
            start:.7,
            end:.82,
          }
        }
    },[])

    const curationSectionLift= useMemo(()=>{
      if(window.innerWidth < 768) return "-40%"
      return "-60.5%"
      
    },[])

   
    useGSAP(()=>{
      if(!curationSectionRef.current) return

       const curationHeight = document.querySelector('.curation')?.clientHeight

    if(!curationHeight) return
    const curationHeightPrecent = (curationHeight / window.innerHeight) * 100

     const curationTexts = curationSectionRef.current.querySelectorAll(".curation .curation-text")
    
     curationTexts.forEach(text=>{

      const splitedChars = new SplitText(text,{type:"chars",charsClass:"letter"})
      splitedChars.chars.forEach(char=>{
        char.innerHTML = `<span>${char.innerHTML}</span>`
      })

     })

     gsap.set([".curate .curate-inner",".your .curate-inner"],{
      x:(i)=> (i+1)%2 ===0 ?"-100%":"100%",
     })

     gsap.set(".lottie .curate-inner",{
      "--x-translation":"100%"
     })

     gsap.set(".curation-text .letter  ",{
      yPercent:(i)=>{
        
        if((i+1)%2 === 0){
          if((i + 1)%4 === 0){
            return 50
          }
          return -50
        }
        else return 0
      },
     })
   
     gsap.fromTo(curationSectionRef.current,
      {y:"100%"},
      {
        y:curationSectionLift,
      scrollTrigger:{
        trigger:"#carousel-curation",
        start:"+=50%",
        end:`+=${(curationHeightPrecent + 50).toFixed(3)}%`,
        scrub:1,
        onUpdate: ({ progress }) => {

        if(progress >=curaitontextRangs.curate.start && progress < curaitontextRangs.curate.end){
           const mappedProgress =( ((progress - curaitontextRangs.curate.start) * 1) / (curaitontextRangs.curate.end - curaitontextRangs.curate.start)) 
         
           gsap.to(".curate .curate-inner",{
      x:`${100 - 100 * mappedProgress}%`,
     })
             gsap.to(".curate .curation-text .letter  ",{
      yPercent:(i)=>{
        if((i+1)%2 === 0){
           if((i + 1)%4 === 0){
            return 50 - 50 *mappedProgress
          }
          return -50 + 50 * mappedProgress
        }else return 0
      },
     })
        }

        if(progress >= curaitontextRangs.your.start && progress < curaitontextRangs.your.end){
           const mappedProgress =( ((progress - curaitontextRangs.your.start) * 1) / (curaitontextRangs.your.end - curaitontextRangs.your.start)) 

             gsap.to(".your .curate-inner",{
      x:`${-100 + 100 * mappedProgress}%`,
     })
          
             gsap.to(".your .curation-text .letter  ",{
      yPercent:(i)=>{
        if((i+1)%2 === 0){
           if((i + 1)%4 === 0){
            return 50 - 50 *Math.min(1,mappedProgress * 1.3)
          }
          return -50 + 50 * Math.min(1,mappedProgress * 1.3)
        }else return 0
      },
     })
        }

        if(progress >=curaitontextRangs.lottie.start && progress <curaitontextRangs.lottie.end){
           const mappedProgress =( ((progress - curaitontextRangs.lottie.start) * 1) / (curaitontextRangs.lottie.end - curaitontextRangs.lottie.start)) 

           gsap.to(".lottie .curate-inner",{
            "--x-translation":`${100 - 100 * mappedProgress}%`
           })
          
             gsap.to(".lottie .curation-text .letter  ",{
      yPercent:(i)=>{
        if((i+1)%2 === 0){
          if((i + 1)%4 === 0){
            return 50 - 50 *Math.min(1,mappedProgress * 1.2)
          }
          return -50 + 50 * Math.min(1,mappedProgress * 1.2)
        }else return 0
      },
     })
        }
      },
      }
     })


    
  },);
  
  return (
   
 <div className="curation" ref={curationSectionRef}>
     
        <CurateSection/>
        <YourSection/>
        <TasteMorphing/>
    </div> 
  )
}

export default CurationSection