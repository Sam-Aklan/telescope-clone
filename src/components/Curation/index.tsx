
import { useCallback, useMemo, useRef } from 'react'
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
      if(window.innerWidth <768){
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
            start:.77,
            end:1.,
          }
        }
      }
      return{
          
          curate:{
            start:.0,
            end:.25,
          },
          your:{
            start:.25,
            end:.35,
          },
          lottie:{
            start:.4,
            end:.66,
          }
        }
    },[window.innerWidth])

   const calcualteYTranslation = useCallback((progress:number)=>{

    if(window.innerWidth < 768){

      return 50 - 50 * Math.min(1,progress)
    }
    return  37 - 87 * Math.min(1,progress )
    },[window.innerWidth])
   
    useGSAP(()=>{
      if(!curationSectionRef.current) return

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
        y:"-60%",
      scrollTrigger:{
        trigger:"#carousel-curation",
        start:"+=50%",
        end:"+=165.022%",
        scrub:1,
        onUpdate: ({ progress }) => {
    
        // console.log("progress",progress.toFixed(2))
        // const roundProgress = Math.round(progress * 100) / 100

        // 0.0 -> .22
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
 // .22 -> .32 to 0 -> 1
        if(progress >= curaitontextRangs.your.start && progress < curaitontextRangs.your.end){
           const mappedProgress =( ((progress - curaitontextRangs.your.start) * 1) / (curaitontextRangs.your.end - curaitontextRangs.your.start)) 

             gsap.to(".your .curate-inner",{
      x:`${-100 + 100 * mappedProgress}%`,
     })
          
             gsap.to(".your .curation-text .letter  ",{
      yPercent:(i)=>{
        if((i+1)%2 === 0){
          // console.log("your progress",mappedProgress )
           if((i + 1)%4 === 0){
            // console.log("translate y your", 50 - 50 *Math.min(1,mappedProgress * 1.3))
            return 50 - 50 *Math.min(1,mappedProgress * 1.3)
          }
          // console.log("translate y your", 50 - 50 *Math.min(1,mappedProgress * 1.3))
          return -50 + 50 * Math.min(1,mappedProgress * 1.3)
        }else return 0
      },
     })
        }

        // .32 -> .57
        if(progress >=curaitontextRangs.lottie.start && progress <curaitontextRangs.lottie.end){
           const mappedProgress =( ((progress - curaitontextRangs.lottie.start) * 1) / (curaitontextRangs.lottie.end - curaitontextRangs.lottie.start)) 

          //  console.log("mapped progress lottie", mappedProgress)

           gsap.to(".lottie .curate-inner",{
            "--x-translation":`${100 - 100 * mappedProgress}%`
           })
          
             gsap.to(".lottie .curation-text .letter  ",{
      yPercent:(i)=>{
        if((i+1)%2 === 0){
          if((i + 1)%4 === 0){
            return 50 - 50 *Math.min(mappedProgress * 1.1)
          }
          return -50 + 50 * Math.min(mappedProgress * 1.1)
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