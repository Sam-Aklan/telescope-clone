import { useGSAP } from '@gsap/react';
import  React, { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import TrialingButton from './TrailingButton';
import {SplitText} from 'gsap/SplitText'
import useWindowSize from '../../lib/useWindowSize';
import { useResponsiveMatrix } from '../../lib/useResposiveTranslation';
import MobileCarouselBtns from './MobileCarouselBtns';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(useGSAP,SplitText,ScrollTrigger);
const slides = [
  "./pics/leonardo.jpg",
  "./pics/Mari-curl.jpg",
  "./pics/albert-einstein.jpg",
  "./pics/Mozart.jpg",
  "./pics/frida-kahlo.jpg",
];

const slidesPara = [
  { 
    personname: "Leonardo da Vinci", 
    description1: "Renaissance polymath and universal genius.\nWhose extraordinary intellect spanned multiple.", 
    description2: "Mona Lisa & Last.\nSupper artist." 
  },
  { 
    personname: "Marie Curie", 
    description1: "Groundbreaking physicist and chemist.\nOnly person to win Nobel Prizes in two fields.", 
    description2: "Pioneer in.\nRadioactivity research." 
  },
  { 
    personname: "Albert Einstein", 
    description1: "Revolutionary theoretical physicist.\nAnd time, one of history's most influential scientists.", 
    description2: "Developed theory.\nof relativity." 
  },
  { 
    personname: "Mozart", 
    description1: "Began composing at age five.\nProduced over 600 defining works.", 
    description2: "Child prodigy.\nMusical genius." 
  },
  { 
    personname: "Frida Kahlo", 
    description1: "Mexican surrealist painter known.\nExplored identity, pain, and Mexican culture.", 
    description2: "Iconic self-portrait.\nartist and feminist icon." 
  }
];

const slidesBoxes = [
  [
    { from: "#cccddd", to: "#aaabbb", y: 0 },
    { from: "#92a32e", to: "#aaabbb", y: 8 },
    { from: "#5ba192", to: "#7b82e9", y: 16 },
    { from: "#c94ba9", to: "#aaabbb", y: 32 },
  ],
  [
    { from: "#ff5733", to: "#ffc300", y: 0 },
    { from: "#33ff57", to: "#33fff6", y: 8 },
    { from: "#3357ff", to: "#b833ff", y: 16 },
    { from: "#ff33a8", to: "#33ffa8", y: 32 },
  ],
  [
    { from: "#e67e22", to: "#f1c40f", y: 0 },
    { from: "#27ae60", to: "#2ecc71", y: 8 },
    { from: "#2980b9", to: "#3498db", y: 16 },
    { from: "#8e44ad", to: "#9b59b6", y: 32 },
  ],
  [
    { from: "#d35400", to: "#e67e22", y: 0 },
    { from: "#16a085", to: "#1abc9c", y: 8 },
    { from: "#c0392b", to: "#e74c3c", y: 16 },
    { from: "#2c3e50", to: "#34495e", y: 32 },
  ],
  [
    { from: "#f39c12", to: "#f1c40f", y: 0 },
    { from: "#8e44ad", to: "#9b59b6", y: 8 },
    { from: "#27ae60", to: "#2ecc71", y: 16 },
    { from: "#e74c3c", to: "#c0392b", y: 32 },
  ]
];
  
  

const CarousselThumbPara = () => {

  
  const [current, setCurrent] = useState(0);
  const leftCircleRef= useRef<SVGCircleElement>(null)
  const rightCircleRef= useRef<SVGCircleElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])
  const maskContainerRef=useRef<HTMLDivElement>(null)

 const {contextSafe}= useGSAP(()=>{
    if(!slideRefs.current.length  || !leftCircleRef.current || !rightCircleRef.current) return

  slideRefs.current.forEach((el, i) => {

    if(i === current)el.classList.add("is-active")

  });
  if (leftCircleRef.current && rightCircleRef.current) {
    leftCircleRef.current.setAttribute("stroke-dashoffset","0%")
    rightCircleRef.current.setAttribute("stroke-dashoffset","0%")
  }
 })

const goToSlide = contextSafe((nextIndex:number)=>{

  const next = (nextIndex + slides.length) % slides.length;
  const currentIndex = (current + slides.length) % slides.length;

  const nextSlide = slideRefs.current[next];
  const currentSlide = slideRefs.current[currentIndex];

  if (!nextSlide || !currentSlide || !leftCircleRef.current || !rightCircleRef.current) return;


    const tl = gsap.timeline({
      onComplete: () => {
        currentSlide.classList.remove("is-active")
        setCurrent(next);
        slideRefs.current.forEach((el, i) => {
          gsap.set(el, { zIndex: i === next ? 3 : i ===currentIndex?2:0 });
          if(i === next) el.classList.add("is-active")
        });
        
        gsap.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" });
      }
    });

    tl.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" })
      .set(nextSlide, { zIndex: 3})
      .set(currentSlide, { zIndex: 4 })
      .to(leftCircleRef.current, {
        strokeDashoffset: "-314%",
        duration: 1.5,
        ease:"power3"
      })
      .to(
        rightCircleRef.current,
        {
          strokeDashoffset: "-314%",
          duration: 1.5,
          ease:"power3"
        },
        0.3
      );

})




const {debouncedWindowSize,isMobile,isDesktop,isTablet}=useWindowSize()


const leftMatrix = useResponsiveMatrix(
  {
  containerRef:maskContainerRef,
  xPercent: debouncedWindowSize.width < 1024 ? .5 : .25,
  yPercent: debouncedWindowSize.width < 1024 ? .25: .5,
  rotationDegree:debouncedWindowSize.width>=1024?45:135,
  },
)

const rightMatrix = useResponsiveMatrix(
  {
  containerRef:maskContainerRef,
  xPercent: debouncedWindowSize.width < 1024 ? .5 : .25,
  yPercent: debouncedWindowSize.width < 1024 ? .25: .5,
  rotationDegree:debouncedWindowSize.width >=1024?-45:45
  },
 
)


  return (
    <div className='absolute top-0 left-0 w-full h-screen '>
    <div id="mask-container" className="w-full h-screen relative overflow-hidden" ref={maskContainerRef}>
      
    <Stakes isMobile ={isMobile || isTablet} sectionRef={maskContainerRef}/>

      {slides.map((src, i) => (
        <div
        key={i}>

        <div
          
          ref={(el)=>{
            if(el) slideRefs.current[i] = el
          }}
          className="bg-item absolute w-full h-full overflow-hidden"
        >
          {/* First half */}
          <div className="img w-full h-screen absolute">
            {/* <img
              src={src}
              alt="pic"
              className="object-cover w-full max-w-[1080px] h-full absolute"
            /> */}
            <img
              src={src}
              alt="pic"
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>

          {/* Second half */}
          <div className="img w-full h-screen">
            {/* <img
              src={src}
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            /> */}
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>
        </div>
        
          <Paragraphs person={slidesPara[i]} isActive={ i === current} />
        
          {debouncedWindowSize.width>=1024?<ThumbnailBoxes boxes={slidesBoxes[i]} isActive={i === current} isDesktop isTablet isMobile />:undefined}
        
        </div>
        
      ))}
    <div className='absolute w-full h-screen'>

    {isDesktop?<TrialingButton goToSlide={goToSlide} currentIndex={current}/>: <MobileCarouselBtns currentIndex={current} goToSlide={goToSlide}/>}
    </div>
    </div>



    {/* SVG Masks */}
    <div className='svg-container-masks '>

 {/* SVG Masks */}
    <svg width="0" height="0" viewBox={`0 0 ${Math.min(1440,debouncedWindowSize.width)} ${debouncedWindowSize.height}`}>
      <defs>
        <mask id="radial-mask-left">
          <circle
            ref={leftCircleRef}
            r="50%"
            fill="none"
            stroke="white"
            strokeWidth="100%"
            strokeDasharray="314%"
            strokeDashoffset="314%"
            strokeLinecap="butt"
            cx={debouncedWindowSize.width>=1024?"25%":"50%"}
            cy={debouncedWindowSize.width>=1024?"50%":"25%"}
            transform={leftMatrix !==''?leftMatrix:undefined}
          ></circle>
        </mask>
        <mask id="radial-mask-right">
          <circle
            ref={rightCircleRef}
            r="50%"
            fill="none"
            stroke="white"
            strokeWidth="100%"
            strokeDasharray="314%"
            strokeDashoffset="314%"
            strokeLinecap="butt"
            cx={debouncedWindowSize.width>=1024?"25%":"50%"}
            cy={debouncedWindowSize.width>=1024?"50%":"25%"}
            transform={rightMatrix !==''?rightMatrix:undefined}
          ></circle>
        </mask>
      </defs>
    </svg>
    </div>
  </div>
  )
}

export default CarousselThumbPara


const ThumbnailBoxes = ({
  boxes,
  isActive,
  isMobile,
  isDesktop,
  isTablet
}: {
  boxes: typeof slidesBoxes[0];
  isActive: boolean;
  isMobile:boolean,
  isTablet:boolean,
  isDesktop:boolean,
}) => {
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const initialPositions = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [boxWidth, setboxWidth] = useState(3.75)
  const [expandedWidth, setexpandedWidth] = useState(7.5)

  useEffect(()=>{
    if(isMobile) {
      setboxWidth(1.875)
      setexpandedWidth(3.75)
      return
    }
    if(isTablet){
       setboxWidth(2.5)
      setexpandedWidth(5)
      return
    }
    if(isDesktop){
       setboxWidth(3.75)
      setexpandedWidth(7.5)
      return
    }
  },[isMobile,isDesktop,isTablet])
 
  // console.log("box width",boxWidth)

  const { contextSafe } = useGSAP(
    () => {
      boxes.forEach((_, i) => {
        initialPositions.current[i] = i * boxWidth;
      });

      if (isActive) {

        gsap.set(boxesRef.current, {
          opacity: 1,
          x: (index) => `${initialPositions.current[index]}rem`,
          zIndex: 20,
          pointerEvents: "auto",   
        });

        const tl = gsap.timeline();
       
        tl.fromTo(
          boxesRef.current,
          { opacity: 0, pointerEvents: "none" },
          {
            y: 0,
            opacity: 1,
            pointerEvents: "auto",
            stagger: 0.2,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2,
          }
        ).to(boxesRef.current, {
          
          width:`${boxWidth}rem`,
          x: (index) => `${initialPositions.current[index]}rem`,
          zIndex: 20,
          stagger: 0.2,
        });
      } else {
        
        gsap.set(boxesRef.current, {
          opacity: 0,
          pointerEvents: "none",   
          zIndex: 0,
        });
      }
    },
    { dependencies: [isActive,boxWidth], revertOnUpdate: true }
  );

  // expand on hover
  const expandBox = contextSafe((index: number) => {
    
    const tl = gsap.timeline();

    tl.to(boxesRef.current[index], {
      width: `${expandedWidth}rem`, // expand relative to original width
      transformOrigin: "right center", // expand from center
      zIndex: 50,
      duration: 0.3,
    });

    // Shift boxes AFTER hovered one
  boxesRef.current.forEach((box, i) => {
    if (i > index ) {
      tl.to(
        box,
        {
          x: `${initialPositions.current[i] + boxWidth}rem`,
          duration: 0.3,
          ease: "power2.out",
        },
        "<" // sync with width animation
      );
    }
  });

    setActiveIndex(index);
  });

  // shrink on mouse leave
  const shrinkBox = contextSafe((index: number) => {
    if(activeIndex !==index) return
    const tl = gsap.timeline();

  // Reset width
  tl.to(boxesRef.current[index], {
    width: `${boxWidth}rem`,
    zIndex: 20,
    duration: 0.3,
    ease: "power2.inOut",
  });

  // Reset positions
  boxesRef.current.forEach((box, i) => {
    if(index !==i){

      tl.to(
        box,
        {
          x: `${initialPositions.current[i]}rem`,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
    }
  });
    setActiveIndex(null);
  },);

  const handleMouseEnter = (index: number) => () => {
    expandBox(index);
  };

  const handleMouseLeave = (index: number) => () => {
    shrinkBox(index);
  };

  return (
    <div className={`absolute -bottom-30 md:-bottom-8  -right-32 ${isActive? "z-30":"z-25"}`}>
      <div className="relative h-50 w-100 overflow-hidden">
        {boxes.map((box, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="absolute rounded-2xl shadow-lg w-15 h-15 md:w-20 md:h-20 xl:w-30 xl:h-30"
            style={{
              zIndex: 0,
              background: `linear-gradient(to top left, ${box.from}, ${box.to})`,
              transform: `translateY(${box.y}rem)`,
            }}
            onMouseEnter={handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave(i)}
          />
        ))}
      </div>
    </div>
  );
};


  const Paragraphs = ({ person, isActive }: { person: typeof slidesPara[0]; isActive: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
  
    useGSAP(() => {
      if (!containerRef.current) return;
  
      const nameEl = containerRef.current!.querySelector(".person-name");
      const descEls = containerRef.current!.querySelectorAll(".person-description");
  
     
     // Split each description into lines
  descEls.forEach((descEl) => {
    const split = new SplitText(descEl, { type: "lines", linesClass: "line" });
    // Wrap each line in a span for stagger
    split.lines.forEach((line) => {
      line.innerHTML = `<span>${line.innerHTML}</span>`;
    });
  });
  
      if (isActive) {
        gsap.fromTo(
          nameEl,
          { opacity: 0, y: "100%" },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay:.5 }
        );
  
        gsap.fromTo(
          containerRef.current!.querySelectorAll(".person-description .line > span"),
          { opacity: 0, y: "100%" },
          { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(nameEl, { opacity: 0, y: "100%", duration: 0.3 });
        gsap.to(containerRef.current!.querySelectorAll(".person-description .line > span"), {
          opacity: 0,
          y: "100%",
          stagger: 0.1,
          duration: 0.3,
        });
      }
  
      
    }, { dependencies: [isActive],scope:containerRef,revertOnUpdate:true });
  
    return (
      <div ref={containerRef} className={`absolute w-full h-screen flex flex-col justify-center items-center ${isActive?"z-20":"z-0"}`}>
        <div className="person-name text-sm xl:text-6xl font-bold mb-4 text-white">{person.personname}</div>
        <div className="person-description ">{person.description1}</div>
        <div className="person-description ">{person.description2}</div>
      </div>
    );
  };

  



const Stakes = ({isMobile}:{isMobile:boolean,sectionRef:React.RefObject<HTMLDivElement|null>}) => {

  const rotateDegree= useMemo(()=>{

    if(isMobile) return {startDeg:90,firstEnd:45,lastEnd:135,}
    return {startDeg:0,firstEnd:45,lastEnd:-45,}

  },[isMobile])
  
    useGSAP(()=>{

     const tl = gsap.timeline({paused:true})

    //  tl.clear().progress(0)

        tl.fromTo(".stake.line",
          {
            rotate:rotateDegree.startDeg
          },
          {
            rotate:(index)=>{ 
             return index / 2 === 0 ?rotateDegree.lastEnd:rotateDegree.firstEnd
             
            }
              ,
            duration:1,
        })

        console.log("is Mobile", isMobile)


        ScrollTrigger.create({
          trigger:"#carousel-curation",
          start:"top center",
          end:"bottom top",
          markers:true,
          onEnter:()=>{
            tl.play()
          },
          onEnterBack:()=>{
            tl.play(0)
          },
          animation:tl,
          // toggleActions:"play none none reset"
        })

        ScrollTrigger.refresh()

    },{dependencies:[rotateDegree]})

    return (
     
      <>
          <div className="stake line absolute top-1/4 left-[49%] w-[70%] h-0.5 -translate-y-1/4  bg-white  lg:top-[47.5%] lg:left-1/4 lg:-translate-y-1/2  origin-top-left z-6 "
        >

        </div>
        <div className="stake line absolute top-1/4 -translate-y-1/4 left-[52%] z-6  w-[70%] h-0.5 origin-top-left  bg-white lg:top-[50.5%] lg:left-1/4">
        </div>
      </>
    );
  };
  
  
  

