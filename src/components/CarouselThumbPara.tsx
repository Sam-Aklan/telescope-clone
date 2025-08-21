import { useGSAP } from '@gsap/react';
import  { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import TestButton from './Test_Button';
import {SplitText} from 'gsap/SplitText'
gsap.registerPlugin(useGSAP,SplitText);
const slides = [
  "./pics/tel-1.jpg",
  "./pics/tel-2.jpg",
  "./pics/tel-3.jpg",
  "./pics/tel-4.jpg",
  "./pics/tel-5.jpg",
];

const slidesPara = [
  { 
    personname: "Leonardo da Vinci", 
    description1: "Renaissance polymath and universal genius.\nWhose extraordinary intellect spanned multiple.\ndisciplines including art, science, engineering.", 
    description2: "Mona Lisa & Last.\nSupper artist." 
  },
  { 
    personname: "Marie Curie", 
    description1: "Groundbreaking physicist and chemist.\nFirst woman to win a Nobel Prize.\nOnly person to win Nobel Prizes in two fields.", 
    description2: "Pioneer in.\nRadioactivity research." 
  },
  { 
    personname: "Albert Einstein", 
    description1: "Revolutionary theoretical physicist.\nTransformed our understanding of space.\nAnd time, one of history's most influential scientists.", 
    description2: "Developed theory.\nof relativity." 
  },
  { 
    personname: "Mozart", 
    description1: "Prolific Classical era composer.\nBegan composing at age five.\nProduced over 600 defining works.", 
    description2: "Child prodigy.\nMusical genius." 
  },
  { 
    personname: "Frida Kahlo", 
    description1: "Mexican surrealist painter known.\nFor vibrant, personal self-portraits.\nExplored identity, pain, and Mexican culture.", 
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
  
  const boxWidth = 3.75;
  const expandedWidth = 7.5;

const CarousselThumbPara = () => {

  
  const [current, setCurrent] = useState(0);
  const leftCircleRef= useRef<SVGCircleElement>(null)
  const rightCircleRef= useRef<SVGCircleElement>(null)
  const slideRefs = useRef<HTMLDivElement[]>([])
 const {contextSafe}= useGSAP()

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



useEffect(()=>{

const ctx =gsap.context(()=>{

  if(!slideRefs.current.length  || !leftCircleRef.current || !rightCircleRef.current) return

  slideRefs.current.forEach((el, i) => {
    // gsap.set(el, { zIndex: i === current ? 2 : 0 });
    if(i === current)el.classList.add("is-active")
  });
  if (leftCircleRef.current && rightCircleRef.current) {
    leftCircleRef.current.setAttribute("stroke-dashoffset","0%")
    rightCircleRef.current.setAttribute("stroke-dashoffset","0%")
    // gsap.set([leftCircleRef.current, rightCircleRef.current], { strokeDashoffset: "0%" });
  }
})

return ()=> ctx.revert()

},[])

  return (
    <>
    <div className="w-full h-screen relative overflow-hidden">

    <Stakes/>
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
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>

          {/* Second half */}
          <div className="img w-full h-screen">
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src={src}
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>
        </div>
        
        
          <Paragraphs person={slidesPara[i]} isActive={ i === current} />
        
        

          <ThumbnailBoxes boxes={slidesBoxes[i]} isActive={i === current} />
        
        </div>
        
      ))}
    <div className='absolute w-full h-screen'>

    <TestButton goToSlide={goToSlide} currentIndex={current}/>
    </div>
    </div>



    {/* SVG Masks */}
    <div className='svg-container'>

 <svg width="0" height="0" viewBox="0 0 1440 1276" className='absolute'>
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
            cx="25%"
            cy="50%"
            transform="matrix(0.70711,0.70711,-0.70711,0.70711,506.57658,-117.69578)"
            // transform="(translate(-20%, 0) rotate(45))"
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
            cx="25%"
            cy="50%"
            transform="matrix(0.70711,-0.70711,0.70711,0.70711,-395.69578,391.42342)" 
            // transform="(translate(20%, 0) rotate(-45))"
          ></circle>
        </mask>
      </defs>
    </svg>
    </div>
  </>
  )
}

export default CarousselThumbPara


const ThumbnailBoxes = ({
  boxes,
  isActive,
}: {
  boxes: typeof slidesBoxes[0];
  isActive: boolean;
}) => {
  const boxesRef = useRef<HTMLDivElement[]>([]);
  const initialPositions = useRef<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      boxes.forEach((_, i) => {
        initialPositions.current[i] = i * boxWidth;
      });

      if (isActive) {

        gsap.set(boxesRef.current, {
          opacity: 1,
          scaleX: 1,
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
          scaleX: 1, 
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
    { dependencies: [isActive], revertOnUpdate: true }
  );

  // expand on hover
  const expandBox = contextSafe((index: number) => {
    if (activeIndex !== null && activeIndex !== index) {
      // reset previously expanded
      gsap.to(boxesRef.current[activeIndex], {
        scaleX: 1,
        duration: 0.3,
      });
    }

    gsap.to(boxesRef.current[index], {
      scaleX: expandedWidth / boxWidth, // expand relative to original width
      transformOrigin: "left center", // expand from center
      zIndex: 50,
      duration: 0.3,
    });

    setActiveIndex(index);
  });

  // shrink on mouse leave
  const shrinkBox = contextSafe((index: number) => {
    if (activeIndex === index) {
      gsap.to(boxesRef.current[index], {
        scaleX: 1,
        zIndex: 20,
        duration: 0.3,
      });
      setActiveIndex(null);
    }
  });

  const handleMouseEnter = (index: number) => () => {
    expandBox(index);
  };

  const handleMouseLeave = (index: number) => () => {
    shrinkBox(index);
  };

  return (
    <div className={`absolute -bottom-8 -right-32 ${isActive? "z-20":"z-15"}`}>
      <div className="relative h-50 w-100 overflow-hidden">
        {boxes.map((box, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) boxesRef.current[i] = el;
            }}
            className="absolute rounded-2xl shadow-lg w-30 h-30"
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
  
      
    }, { dependencies: [isActive],scope:containerRef });
  
    return (
      <div ref={containerRef} className={`absolute w-full h-screen flex flex-col justify-center items-center ${isActive?"z-20":"z-0"}`}>
        <div className="person-name text-6xl font-bold mb-4 text-white">{person.personname}</div>
        <div className="person-description ">{person.description1}</div>
        <div className="person-description ">{person.description2}</div>
      </div>
    );
  };

  



const Stakes = () => {
    useGSAP(()=>{
        gsap.fromTo(".line",
          {
            rotate:0
          },
          {
            rotate:(index)=> index / 2 ===0?-45:45,
            duration:1,
        })
    })
    return (
      <>
      
        <div className="line"
        style={{
            position:"absolute",
            top:"45%",
            left:"40%",
            transform:`translate(-25%,-45%)`,
            transformOrigin:"left center",
            zIndex:6,
            
        }}>
          <svg
            height="6"
            viewBox="0 0 1426 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width:"100%"
            }}
          >
            <path
              d="M3 3H1423"
              stroke="#ddd8d8"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className=" line"
        style={{
            position:"absolute",
            bottom:"45%",
            left:"40%",
            transform:`translate(-25%,-45%)`,
            transformOrigin:"left center",
            zIndex:6,
            
        }}>
          <svg
            // className='line'
            height="6"
            viewBox="0 0 1426 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                width:"100%"
            }}
          >
            <path
              d="M3 3H1423"
              stroke="#ddd8d8"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </>
     
    );
  };
  
  
  

