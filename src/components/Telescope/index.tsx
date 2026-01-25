import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import TelescopeHeader from "./TelescopHeader"
import TelescopeContent from "./TelescopeContent"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin([ScrollTrigger])

const Telescope = () => {
 useGSAP(()=>{

  gsap.set(".footer-top .socials",{
    autoAlpha:0

  })

  gsap.to("#stack-wrapper",{
    scrollTrigger:{
      trigger:"#stack-wrapper",
      start:"+=630%",
      end:`+=100%`,
      scrub:1,
      onUpdate:({progress})=>{
        gsap.set(".footer",{
          "--p":progress
        })
        if(Number(progress.toFixed(2)) === 1){
          gsap.to(".footer-top .socials",{
            autoAlpha:1,
          })
        }else{
          gsap.to(".footer-top .socials",{
            autoAlpha:0,
          })
        }

      },
    }
  })
 })
   
  return (
    <div className='footer'>
    <div className="bg">
      <div className="inner">
        <TelescopeHeader/>
        <TelescopeContent/>
        <div className="bottom">
          <div className="right-links">
            <div>Term of Use</div>
            <div>Private Polices</div>
          </div>
          <div className="left-links">
            <div>credits</div>
          </div>
        </div>
      </div>
    </div>
    
    
    </div>
  )
}

export default Telescope