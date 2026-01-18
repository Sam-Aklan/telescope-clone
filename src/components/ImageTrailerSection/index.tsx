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

       if (!sectionRef.current ) return;
      console.log("hello")
      const rect = sectionRef.current.getBoundingClientRect();
      const intailXPostion = rect.width * 2/3
      const intailYPostion = rect.height /4


      gsap.set(".images-container",{
        left:intailXPostion,
        top:intailYPostion
      })

        const handleMouseMove = (e: MouseEvent) => {
             if (!sectionRef.current) return;
  

       // this function is resopnsible for determing how far the trailing images can go horizontally and vertically
        const getBounds = ()=>{
            const rect = sectionRef.current?.getBoundingClientRect()
            return {
                minX: rect?.left||0,
                maxX: (rect?.right || window.innerWidth) - 200,
                minY:rect?.top || 0,
                maxY:(rect?.bottom || window.innerHeight ) - 50,
            }
        }

          const clampPosition = (x: number, y: number) => {
      const bounds = getBounds();
      return {
        x: gsap.utils.clamp(bounds.minX, bounds.maxX, x),
        y: gsap.utils.clamp(bounds.minY, bounds.maxY, y),
      };
    };
  
    
     
  
      pointerRelativePostion.current = clampPosition(e.clientX, e.clientY)
    
    };

    const animate = ()=>{
       
        setTargetPosition(prev=>{
          const dx = pointerRelativePostion.current.x - prev.x
        const dy = pointerRelativePostion.current.y - prev.y

        return {
          x:prev.x + dx * .2,
          y:prev.y + dy * .2,
        }
        })
       
        
        animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current =requestAnimationFrame(animate)

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
      onUpdate:({progress})=>{
        console.log("image trailing progress", progress)
      }
    }
  })

  

  
    return ()=>{
        sectionRef.current?.removeEventListener("mousemove",handleMouseMove)
        if(animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    },)


  return (
    <div id="trailing-image-container" ref={sectionRef} className='w-full h-screen bg-white z-20 panel  '>
      <div id='trailing-inner' className="w-full h-screen relative overflow-hidden">

        <div className="images-container"
        style={{
          top:targetPosition.y,
          left: targetPosition.x
        }}>

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