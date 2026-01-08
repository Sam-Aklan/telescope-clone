import  { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP,);

const trailingImages = [
"albert-dera.jpg",
"charlie-green.jpg",
"abubakr-palestine.jpg",
"christian-buehner.jpg",
"old-palestain.jpg",
"pexels-hk.jpg",
]
const ImagesTrailer = () => {
    
    const imageTrailingRef =useRef<HTMLDivElement|null>(null)

    // circular movment interval variables
    const circularTweenRef = useRef<()=>void| null>(null);
    const latestCoordinate = useRef({x:0,y:0})
    const angleRef = useRef(0)
    
    // time out reference
    const timeoutRef= useRef<number|null>(null)

    useGSAP(()=>{

      
    const rect = imageTrailingRef.current?.getBoundingClientRect();
    const centerX = (rect?.width ?? window.innerWidth) / 2;
    const centerY = (rect?.height ?? window.innerHeight) / 2;

    latestCoordinate.current = { x: centerX, y: centerY };

    // Instantly move all trailing images to the center
    gsap.set(".trailing-image", {
      x: centerX,
      y: centerY,
    });

        // circular movment interval variables
        
        const radius = 10
        const speed = .1

        // this function is resopnsible for determing how far the trailing images can go horizontally and vertically
        const getBounds = ()=>{
            const rect = imageTrailingRef.current?.getBoundingClientRect()
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

        // reset ticker and the refernce

        const stopCircularMotion = ()=>{
            if(circularTweenRef.current)
                gsap.ticker.remove(circularTweenRef.current)
                circularTweenRef.current = null
        }

        const startCircularMotion = () => {

            // reset the gsap ticker
            stopCircularMotion()
     
        const tick = ()=>{
             angleRef.current += speed;
        if (angleRef.current > Math.PI * 2) angleRef.current = 0;

        const newX = latestCoordinate.current.x + Math.sin(angleRef.current) * radius;
        const newY = latestCoordinate.current.y + Math.cos(angleRef.current) * radius;

        gsap.to(".trailing-image", {
          x:newX,
          y: newY,
          duration: 0.3,
          stagger: 0.1,
          overwrite: "auto",
        });
        }
        
        // gsap ticker works as setinterval

        gsap.ticker.add(tick)
        circularTweenRef.current = tick
    };
      
     

        const handleMouseMove = (e:MouseEvent)=>{
           
            if(timeoutRef.current){
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            
            stopCircularMotion()

            gsap.killTweensOf(".trailing-image")

            const{x,y} =clampPosition(e.clientX,e.clientY)

            gsap.to(".trailing-image",{
                x,
                y,
                stagger:0.1,
                overwrite:"auto"
            })
            // update the cooridanets with latest values
            latestCoordinate.current = {x, y}
            
           timeoutRef.current = window.setTimeout(startCircularMotion, 300);
        }

        imageTrailingRef.current?.addEventListener("mousemove",handleMouseMove)


        return ()=>{
            imageTrailingRef.current?.removeEventListener("mousemove", handleMouseMove)
            if(timeoutRef.current)clearTimeout(timeoutRef.current)
            stopCircularMotion() // clears gsap ticker
            
        }

    },{scope:imageTrailingRef})

  return (
    <div ref={imageTrailingRef} className='w-full h-screen relative overflow-hidden'>
        {trailingImages.map((img,i)=><div
        className='trailing-image'
        key={i}
        >
            <img src={`./pics/intro/${img}`} alt="" className='w-full h-full object-cover' />
        </div>)}

    </div>
  )
}

export default ImagesTrailer