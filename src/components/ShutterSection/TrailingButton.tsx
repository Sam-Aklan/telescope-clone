import { useState, useEffect, useRef,} from 'react';

import { MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import gsap from 'gsap';

gsap.registerPlugin(MorphSVGPlugin);


const TrailingButton = ({goToSlide,currentIndex}:{goToSlide:(nextIndex:number)=>void,currentIndex:number}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const targetPosition = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const morphRef = useRef<gsap.core.Tween>(null)
  const isLeftSide = useRef(true)

  const rightArrow = "M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42"

  const leftArrow = "M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
  
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
  
      targetPosition.current = { x: relativeX, y: relativeY };
  
      const newIsLeftSide = relativeX < rect.width / 2;
      if (newIsLeftSide !== isLeftSide.current) {
        isLeftSide.current = newIsLeftSide;
        if (pathRef.current && svgRef.current) {
          morphRef.current = gsap.to(pathRef.current, {
            morphSVG: {
              shape: newIsLeftSide ? leftArrow : rightArrow,
              shapeIndex: "auto"
            },
            duration: 0.5,
            ease: "power1.inOut"
          });
        }
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
  
    const animate = () => {
      setPosition(prev => {
        const dx = targetPosition.current.x - prev.x;
        const dy = targetPosition.current.y - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2
        };
      });
      animationRef.current = requestAnimationFrame(animate);
    };
  
    animationRef.current = requestAnimationFrame(animate);
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (morphRef.current) morphRef.current.kill();
    };
  }, []);
  

  return (
    <div className='w-full h-screen relative' ref={containerRef}>

    <div 
      ref={buttonRef}
      className='mouse-pointer '
      style={{
        
        left: `${Math.max(10,position.x)}px`,
        top: `${Math.min(600,position.y)}px`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={()=> {
        console.log("clicked", isLeftSide)
        const nextIndex = isLeftSide.current?currentIndex -1 : currentIndex +1;
        goToSlide(nextIndex);
      }
    }
    >
      <div className='absolute w-10 h-10 lg:w-20 lg:h-20 '>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        // width={80}
        // height={80}
        className='w-full h-full'
        ref={svgRef}
      >
        <path
            ref={pathRef}
          fill="currentColor"
          d={rightArrow}
        ></path>
      </svg>
      </div>
      
    </div>
    </div>
  );
};

export default TrailingButton;