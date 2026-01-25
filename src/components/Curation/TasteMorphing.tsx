import gsap from "gsap";
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin'
import { drawshapes } from "../../utils/morphShapes";
import {  useRef } from "react";
import { motionPathReverse } from "../../utils/morphShapes";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

const TasteMorphing = () => {
  const morphingLineRef = useRef<SVGPathElement>(null)
  const motionPathRef = useRef<SVGPathElement>(null)
  const wrapperGRef = useRef<SVGGraphicsElement>(null)

  useGSAP(() => {
    if (!morphingLineRef.current || !motionPathRef.current || !wrapperGRef.current) return

    const pathLength = motionPathRef.current.getTotalLength()
    const curvePath = motionPathRef.current

    const duration = 8.

    let currentLineLength = 50
let currentSampleCount = 30

gsap.set(".path-stroke", { drawSVG: "0%" })
      gsap.set(morphingLineRef.current,{
        strokeOpacity:0,
      })
      const tl = gsap.timeline({ defaults: { ease: "none" },repeat:-1 ,paused:true})

      const updateLineMorph = () => {
       
  const timeElapsed = tl.time() % duration

  // Convert to path length
  const currentLength = (timeElapsed / duration) * pathLength
        // --- define target values based on ranges ---
        let targetLineLength = 50
        let targetSampleCount = 30
      
        if (timeElapsed >= 0.0 && timeElapsed < 1.03) {
          targetSampleCount = 90
          targetLineLength = 550
        } else if (timeElapsed >= 1.05 && timeElapsed < 3.6) {
          targetSampleCount = 40
          targetLineLength = 250
        } else if (timeElapsed >= 3.6 && timeElapsed < 5.3) {
          targetSampleCount = 25
          targetLineLength = 130
        } else if (timeElapsed >= 5.3 && timeElapsed < 6.75) {
          targetSampleCount = 40
          targetLineLength = 300
        } else if (timeElapsed >= 6.75 && timeElapsed<7.5) {
          targetSampleCount = 55
          targetLineLength = 380
        }else if(timeElapsed >=7.5){
          targetSampleCount = 30
          targetLineLength = 280
        }
      
        // --- smooth interpolation (lerp) ---
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t
        currentLineLength = lerp(currentLineLength, targetLineLength, 0.2) // smoothing factor
        currentSampleCount = Math.round(lerp(currentSampleCount, targetSampleCount, 0.2))
      
         // --- wrap segment around path ---
  let startLength = currentLength - currentLineLength / 2
  let endLength = currentLength + currentLineLength / 2

        let pathData = ""
        for (let i = 0; i <= currentSampleCount; i++) {
          let sampleLength = startLength + (endLength - startLength) * (i / currentSampleCount)
           // -- wrap around instead of cutting off --
    if (sampleLength < 0) sampleLength += pathLength
    if (sampleLength > pathLength) sampleLength -= pathLength


          const point = curvePath.getPointAtLength(sampleLength)
          pathData += i === 0 ? `M ${point.x},${point.y}` : ` L ${point.x},${point.y}`
        }

        morphingLineRef.current?.setAttribute("d", pathData)


      }

      tl.to({}, {
        duration,
        onUpdate: updateLineMorph,
        ease:"none",
      })

      // Insert pauses at given times
      const pauseTimes = [0.43, 2.13, 3.92, 5.40, 7.]
      pauseTimes.forEach(time => {
        tl.call(() => {
          tl.pause()
          // console.log("Paused at", time)

          // Resume automatically after 1 second (optional)
          gsap.delayedCall(1, () => tl.resume())
        }, [], time)
      })

    
      tl.to(".path-1",{
        duration:1,
        onStart: () => {
          gsap.to(".path-1", { duration: 1, drawSVG: "0% 100%" });
        },
        onComplete: () => {
          gsap.to(".path-1", { duration: 1, drawSVG: "0% 0%" });}
      },.3)
        .to(".path-2",{
        duration:1,
        onStart: () => {
            gsap.to(".path-2", { duration: 1, drawSVG: "0% 100%" });
          },
          onComplete: () => {
            gsap.to(".path-2", { duration: .9, drawSVG: "0% 0%" });
        }
       },1.9)
       .to({},{
        duration:1,
        onStart: () => {
            gsap.to(".path-3", { duration: 1, drawSVG: "0% 100%" });
          },
          onComplete: () => {
            gsap.to(".path-3", { duration: .9, drawSVG: "0% 0%" });
        }
      },3.85)
        .to({},{
        duration:1,
        onStart: () => {
            gsap.to(".path-4", { duration: 1, drawSVG: "0% 100%" });
          },
          onComplete: () => {
            gsap.to(".path-4", { duration: 1, drawSVG: "0% 0%" });
        }
      },5.4)

      .to({},{
        duration:1,
        onStart: () => {
            gsap.to(".path-4", { duration: 1, drawSVG: "0% 100%" });
          },
          onComplete: () => {
            gsap.to(".path-4", { duration: 1, drawSVG: "0% 0%" });
        }
      },5.08)
      .to({},{
        duration:1,
        onStart: () => {
            gsap.to(".path-5", { duration: 1, drawSVG: "0% 100%" });
          },
          onComplete: () => {
            gsap.to(".path-5", { duration: 1, drawSVG: "0% 0%" });
        }
      },6.32)

       ScrollTrigger.create({
      trigger:"#carousel-curation",
      start:"+=120%",
      end:"+=95%",
       onEnter: () => {
        console.log("taste morphing is entered")
    tl.play(); // Start the timeline when element comes into view
    gsap.set(morphingLineRef.current,{
      strokeOpacity:1,
    })
  },
  onEnterBack: () => {
    tl.resume(); // Also play when scrolling back up
  },
  onLeave: () => {
    tl.pause(); // Pause when leaving view
  },
  onLeaveBack: () => {
    tl.pause(); // Pause when scrolling back up and leaving view
  }
    })

    // const ctx = gsap.context(() => {
      


    // })

   

    // return () => ctx.revert()
  }, [])
  return (
    <div className="lottie section">
     <div className="curate-inner">
      <div className="curation-text">
        tast
      </div>
     </div>
      
      <div >

    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 773 414" width="773" height="414" preserveAspectRatio="xMidYMid meet"
    style={{width:"100%", height:"100%",transform:"translate3d(0px, 0px, 0px)", contentVisibility:"visible"}}
     >
    <defs>
    <clipPath id="__lottie_element_10">
    <rect width="773" height="414" x="0" y="0">
    
    </rect>
    </clipPath>
    </defs>
    <path id='motionPath'
    ref={motionPathRef}
    d={motionPathReverse}
fill="none" stroke="none" strokeWidth="2"/>

<path ref={morphingLineRef} strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(35,31,32)" strokeOpacity="1" strokeWidth="2" id='morphing-line' d=" M 50,150 L 100,150">
</path>
    <g clipPath="url(#__lottie_element_10)">

    <g id="morph-wraper" transform="matrix(1,0,0,1,37.44500732421875,5.1360015869140625)" opacity="1" style={{display:"block"}} ref={wrapperGRef}>
    <g opacity="1" transform="matrix(1,0,0,1,339.91400146484375,178.26499938964844)" id='inside-wraper' >
  
    </g>
    </g>

      <g
              id="165"
              transform="matrix(1,0,0,1,263.1789855957031,82.45999908447266)"
              opacity="1"
              style={{ display: "block" }}
            >
              <g
                opacity="1"
                transform="matrix(1,0,0,1,12.743000030517578,10.984000205993652)"
              >
                <path
                  className="path-stroke path-1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fillOpacity="0"
                  stroke="rgb(35,31,32)"
                  strokeOpacity="1"
                  strokeWidth="2"
                  d={drawshapes.firstShape.path}
                ></path>
              </g>
            </g>


<g
          id="164"
          transform="matrix(1,0,0,1,456.68902587890625,16.43999481201172)"
          opacity="1"
          style={{ display: "block" }}
        >
          <g
            opacity="1"
            transform="matrix(1,0,0,1,76.20700073242188,40.02000045776367)"
          >
            <path
              className="path-stroke path-2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.secondShape.path1}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,25.594999313354492,26.125999450683594)"
          >
            <path
              className="path-stroke path-2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.secondShape.path2}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,65.68800354003906,87.78800201416016)"
          >
            <path
              className="path-stroke path-2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.secondShape.path3}
            ></path>
          </g>
        </g>

     {/* third svg */}

     <g
          id="163"
          transform="matrix(1,0,0,1,62.836002349853516,110.89900207519531)"
          opacity="1"
          style={{ display: "block" }}
        >
          <g
            opacity="1"
            transform="matrix(1,0,0,1,46.112998962402344,57.637001037597656)"
          >
            <path
              className="path-stroke path-3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.thirdShape.path1}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,27.23900032043457,48.59000015258789)"
          >
            <path
              className="path-stroke path-3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.thirdShape.path2}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,43.04100036621094,124.37100219726562)"
          >
            <path
              className="path-stroke path-3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.thirdShape.path3}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,53.31800079345703,107.79000091552734)"
          >
            <path
              className="path-stroke path-3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.thirdShape.path4}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,49.70899963378906,119.73999786376953)"
          >
            <path
              className="path-stroke path-3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.thirdShape.path5}
            ></path>
          </g>
        </g>        
            
         {/* fourth svg */}

         <g
          id="167"
          transform="matrix(1,0,0,1,610.1909790039062,140.78099060058594)"
          opacity="1"
          style={{ display: "block" }}
        >
          <g
            opacity="1"
            transform="matrix(1,0,0,1,26.874000549316406,22.52899932861328)"
          >
            <path
              className="path-stroke path-4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fourthShape.path1}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,8.755000114440918,13.105999946594238)"
          >
            <path
              className="path-stroke path-4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fourthShape.path2}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,44.48099899291992,7.308000087738037)"
          >
            <path
              className="path-stroke path-4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fourthShape.path3}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,49.534000396728516,34.152000427246094)"
          >
            <path
              className="path-stroke path-4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fourthShape.path4}
            ></path>
          </g>
        </g>

        <g
          id="166"
          transform="matrix(1,0,0,1,335.1889953613281,286.9859924316406)"
          opacity="1"
          style={{ display: "block" }}
        >
          <g
            opacity="1"
            transform="matrix(1,0,0,1,19.05299949645996,68.53600311279297)"
          >
            <path
              className="path-stroke path-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fifthShape.path1}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,61.97600173950195,30.402999877929688)"
          >
            <path
              className="path-stroke path-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fifthShape.path2}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,60.07600021362305,78.89199829101562)"
          >
            <path
              className="path-stroke path-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fifthShape.path3}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,75.43399810791016,81.72899627685547)"
          >
            <path
              className="path-stroke path-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fifthShape.path4}
            ></path>
          </g>
          <g
            opacity="1"
            transform="matrix(1,0,0,1,111.93599700927734,77.60900115966797)"
          >
            <path
              className="path-stroke path-5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fillOpacity="0"
              stroke="rgb(35,31,32)"
              strokeOpacity="1"
              strokeWidth="2"
              d={drawshapes.fifthShape.path5}
            ></path>
          </g>
        </g>
    
    </g>
    </svg>
      </div>
    </div>
  )
}

export default TasteMorphing