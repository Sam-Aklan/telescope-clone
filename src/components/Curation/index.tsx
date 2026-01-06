
import { useRef } from 'react'
import CurateSection from './CurateSection'
import TasteMorphing from './TasteMorphing'
// import TasteMorphing from './Test_TasteMorphing'
import YourSection from './YourSection'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(ScrollTrigger,SplitText)

const CurationSection = () => {
    const curationSectionRef = useRef<HTMLDivElement>(null)
   
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
   

     ScrollTrigger.create({
      trigger: curationSectionRef.current,
      start: "top 50%",
      end: `bottom bottom`,
      scrub: 1,
      markers:true,
      onUpdate: ({ progress }) => {
      
        gsap.set(".curation .section",{
          translate:`0% ${(37 - 87 * Math.min(1,progress * 1.5)).toFixed(2)}%`,
        })

        console.log("progress",progress.toFixed(2))
        const roundedProgress = Math.round(progress * 100) / 100

        // 0.0 -> .22
        if(roundedProgress >=0 && roundedProgress <.22){
           const mappedProgress =( ((roundedProgress - 0.) * 1) / (0.22 - 0)) 
          //  console.log("mapped progress1", mappedProgress)

           gsap.set(".curate .curate-inner",{
      x:`${100 - 100 * mappedProgress}%`,
     })
             gsap.set(".curate .curation-text .letter  ",{
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
        if(roundedProgress >=.22 && roundedProgress <.32){
           const mappedProgress =( ((roundedProgress - 0.22) * 1) / (0.32 - 0.22)) 

             gsap.set(".your .curate-inner",{
      x:`${-100 + 100 * mappedProgress}%`,
     })
          
             gsap.set(".your .curation-text .letter  ",{
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
        if(roundedProgress >=0.32 && roundedProgress <.57){
           const mappedProgress =( ((roundedProgress - 0.32) * 1) / (.57 - .32)) 

           gsap.set(".lottie .curate-inner",{
            "--x-translation":`${100 - 100 * mappedProgress}%`
           })
          
             gsap.set(".lottie .curation-text .letter  ",{
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
    });
    
  },{scope:curationSectionRef});
  
  return (
   
 <div className="curation" ref={curationSectionRef}>
     
        <CurateSection/>
        <YourSection/>
        <TasteMorphing/>
    </div> 
  )
}

export default CurationSection