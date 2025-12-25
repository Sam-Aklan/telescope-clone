import React from 'react'

const VisualizeSvg = () => {

    return (
    <div className='w-full h-screen relative'>
     
      <div
      className='absolute top-0 left-0 z-3 w-1/2 h-1/2'
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     pointerEvents: 'none',
    //     opacity: 0.7,
    //     zIndex: 3
    //   }}
      >
        {/* Extract and render mask content directly */}
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="green" />
          <circle
                id="mask-circle-left"
                r="50%"
                fill="none"
                stroke="white"
                strokeWidth="100%"
                strokeDasharray="314%"
                strokeDashoffset="0%"
                strokeLinecap="butt"
                data-v-5a2fb63a=""
                data-svg-origin="360 638"
                cx="25%"
                cy="50%"
                transform="matrix(0.70711,0.70711,-0.70711,0.70711,456.57658,-67.69578)" 
              ></circle>
        </svg>
      </div>

      <div 
      className='absolute top-0 left-0 z-4 w-full h-full'
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     pointerEvents: 'none',
    //     opacity: 0.7,
    //     zIndex: 4
    //   }}
      >
        {/* Extract and render mask content directly */}
        <svg width="100%" height="100%">
          <rect width="100%" height="100%" fill="blue" />
           <circle
                id="mask-circle-right"
                r="50%"
                fill="none"
                stroke="white"
                strokeWidth="100%"
                strokeDasharray="314%"
                strokeDashoffset="0%"
                strokeLinecap="butt"
                data-v-5a2fb63a=""
                data-svg-origin="360 638"
                cx="25%"
                cy="50%"
                style={{
                  transformOrigin: "0px 0px",
                  scale: "none",
                  rotate: "none",
                  translate: "none",
                  strokeDashoffset: "314%",
                }}
                transform="matrix(0.70711,-0.70711,0.70711,0.70711,-445.69578,441.42342)"
              ></circle>
        </svg>
      </div>
    </div>
  );
 
}

export default VisualizeSvg