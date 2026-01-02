
import { useGSAP } from '@gsap/react'
import { InstagramIcon,XIcon, YouTubeIcon } from './icons/SocialMedia'
import gsap from 'gsap'
import { useRef } from 'react'
import { SplitText } from 'gsap/SplitText'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'
import { buttonMorphs } from './button-morphs'
gsap.registerPlugin(SplitText,MorphSVGPlugin) 

const TelescopeHeader = () => {
  const footerTopRef = useRef<HTMLDivElement>(null)
  const pathRef= useRef<SVGPathElement>(null)
  const {contextSafe} = useGSAP(()=>{
    if(!footerTopRef.current) return

     const splitedWord = new SplitText(footerTopRef.current.querySelector(".btn-inner >span"),{type:"chars",charsClass:"letter"})
    splitedWord.chars.forEach(char=>{
      char.innerHTML = `<span>${char.innerHTML}</span>`
    })
  },{scope:footerTopRef})

  const letterAnimationHandler =contextSafe(()=>{
    if(!pathRef.current)return

   const tl = gsap.timeline()
   tl.to(".btn-inner >span .letter",{
    y:-10,
    stagger:.01,
    duration:.3,
    ease:"power2.inOut"
   }).
   to(pathRef.current,{
    morphSVG:{
      shape:buttonMorphs.expanded,
      shapeIndex:"auto",
    },
    duration:.3
   },"<").
   to(".btn-inner >span .letter",{
    y:0,
    stagger:.01,
    duration:.3,
   })
   .to(pathRef.current,{
    morphSVG:{
      shape:buttonMorphs.shrinked,
      shapeIndex:"auto",
    },
    duration:.3
   },"<")
   .to(pathRef.current,{
    morphSVG:{
      shape:buttonMorphs.normal,
      shapeIndex:"auto",
    },
    duration:.3
   })
  })
    
  return (
    <div className='footer-top' ref={footerTopRef}>
        <ul className='socials'>
            <li>
              <span className='icon is-instagram'><InstagramIcon className='w-full h-full block'/></span>
            </li>
            <li>
              <span className='icon is-youtube'><YouTubeIcon className='w-full h-full block'/></span>
            </li>
            <li>
              <span className='icon is-x'><XIcon className='w-full h-full block'/></span>
            </li>
        </ul>

        <div className='extra-buttons'>

          <button className='sign-in-btn'>
            sign in
        </button>
        <button className="ui-button t-mono -yellow is-btn" aria-expanded="false" aria-label="Join Waitlist" ><div className="btn-inner" onMouseEnter={letterAnimationHandler}>
            <span className="z-3" aria-hidden="true" data-text="Join Waitlist" data-v-ef4014b6="">
                Join Waitlist
            </span>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 285 165" className='svg-container' preserveAspectRatio="none">
        <defs>
            <clipPath id="__lottie_element_37">
                <rect width="285" height="165" x="0" y="0"></rect>
                </clipPath>
                </defs>
                <g clipPath="url(#__lottie_element_37)">
                    <g id="27"  transform="matrix(2,0,0,2,142.5,82.5)" opacity="1"><g opacity="1" transform="matrix(1,0,0,1,0,0)">
                      <path fill="rgb(227,247,147)" fillOpacity="1" d={buttonMorphs.normal} ref={pathRef}>
                     </path>
                     </g>
                    </g>
                    </g>
                    </svg>
                    </div>
                    </button>
        </div>

                  

    </div>
  )
}

export default TelescopeHeader