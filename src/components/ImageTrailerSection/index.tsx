import  { useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP,ScrollTrigger);

const trailingImages = [
"albert-dera.jpg",
"charlie-green.jpg",
"abubakr-palestine.jpg",
"christian-buehner.jpg",
"old-palestain.jpg",
"pexels-hk.jpg",
]
const ImagesTrailer = () => {
    
    const sectionRef =useRef<HTMLDivElement|null>(null)
    const pointerRelativePostion = useRef({x:0,y:0})
    const [targetPosition, setTargetPosition] = useState<{x:number,y:number}>({x:0,y:0})
    const animationRef = useRef(0)
    const imagesContainerRef = useRef<HTMLDivElement>(null)
   
const imagesPostions= useMemo(()=>{
  const firstPostions = Array.from({length:3},(_,i)=>{
    return{
    top:i%2 === 0?10:40 + (i*5),
    left:(i) %2 === 0?0 + (i*50):(50 * i)
  }
}
)

  const secondPostions = Array.from({length:3},(_,i)=>{
    return{
    top:(i + 1)%2===0?80:50 + (Math.abs(i-1) * 5),
    left:(i) %2 === 0?0 + (i*50):(50 * i)
  }
}
)
return [...firstPostions,...secondPostions]
},[])

    useGSAP(()=>{

       if (!sectionRef.current  || !imagesContainerRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const intailXPostion = rect.width * 2/3
      const intailYPostion = rect.height /4


      gsap.set(".images-container",{
        left:intailXPostion,
        top:intailYPostion
      })

      const container = imagesContainerRef.current

        // GSAP setters (super fast)
    const setX = gsap.quickTo(container, "x", {
      duration: 0.4,
      ease: "power3.out",
    })

    const setY = gsap.quickTo(container, "y", {
      duration: 0.4,
      ease: "power3.out",
    })

    let bounds = sectionRef.current.getBoundingClientRect()

    // Cache bounds (important)
    const updateBounds = () => {
      bounds = sectionRef.current!.getBoundingClientRect()
    }

    updateBounds()

    const handleMouseMove = (e: MouseEvent) => {
      const x =
        e.clientX -
        bounds.left -
        container.offsetWidth / 2

      const y =
        e.clientY -
        bounds.top 
        // -
        // container.offsetHeight / 2

      const clampedX = gsap.utils.clamp(
        0,
        bounds.width - container.offsetWidth,
        x
      )

      const clampedY = gsap.utils.clamp(
        0,
        bounds.height - container.offsetHeight,
        y
      )

      setX(clampedX)
      setY(clampedY)

    }

    sectionRef.current.addEventListener("mousemove",handleMouseMove)

    gsap.set(".trailing-image",{
      scale:0
    })

    gsap.set(".trailing-image",{
      x:0
    })

   const tl =  gsap.timeline({repeat:-1, defaults:{ease:"power2.out"}})

   tl.to(".trailing-image",{
    scale:1,
    x:20,
    y:-30,
    stagger:.1,
    duration:.3,
    ease:"power3.out"
   
   })
   
   .to(".trailing-image",{
    scale:0,
    x:50,
    y:-50,
    stagger:.1,
    duration:.3
   })
   .set(".trailing-image",{
    x:20,
    y:-30,
    stagger:.1,
   })

    gsap.fromTo(sectionRef.current,{
      yPercent:100
    },
    {
      yPercent:0,
      ease:"none",
      scrollTrigger:{
        trigger:"#stack-wrapper",
        start:"+=480%",
        end:"+=50%",
        scrub:1,
        markers:true
      }
    }
  )

 
  gsap.to(sectionRef.current,{
    scrollTrigger:{
      trigger:"#stack-wrapper",
      start:`+=530%`,
      end:`+=200%`,
      // onUpdate:({progress})=>{
      //   console.log("image trailing progress", progress)
      // }
    }
  })

  

  
    return ()=>{
        sectionRef.current?.removeEventListener("mousemove",handleMouseMove)
        if(animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    },)


  return (
    <div id="trailing-image-container" ref={sectionRef} className='w-full h-screen bg-white z-10 panel  '>
      <div id='trailing-inner' className="w-full h-screen relative overflow-hidden">

        <div className="images-container will-change-transform"
        ref={imagesContainerRef}
        // style={{
        //   top:targetPosition.y,
        //   left: targetPosition.x
        // }}
        >

         <div className="trailing-image-wraper">

        {trailingImages.slice(0,3).map((img,i)=><div
        className='trailing-image first-batch'
        key={i}
        style={{
          top:`${imagesPostions[i].top}%`,
          left:`${imagesPostions[i].left}%`,
        }}
        >
            <img src={`./pics/intro/${img}`} alt="" className='w-full h-full object-cover' />
        </div>)}
        
        </div>

        <div className="trailing-image-wraper ">

        {trailingImages.slice(3).map((img,i)=><div
        className='trailing-image second-batch '
        key={i}
        style={{
           top:`${imagesPostions[i + 3].top}%`,
          left:`${imagesPostions[i + 3].left}%`,
        }}
        >
            <img src={`./pics/intro/${img}`} alt="" className='w-full h-full object-cover' />
        </div>)}
        
        </div>

        </div>
      </div>

    </div>
  )
}

export default ImagesTrailer