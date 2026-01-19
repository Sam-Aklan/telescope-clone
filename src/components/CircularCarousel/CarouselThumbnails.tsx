import { useCallback, useMemo } from "react"

const CarouselThumbnails = ({thumbNailsImages}:{thumbNailsImages:string[]}) => {
  const svgWidth =  219.10413 
  const svehight = 1084.304

  const mapRangs = useCallback(()=>{
    const newValue = ((window.innerWidth - 320) / (768 - 320)) * (800 - 300) + (300)
    return `translate(${-newValue},-437.6721163)`
  },[])

  const transfomMatrix = useMemo(()=>{
    if(window.innerWidth <=768){
      return mapRangs()
    }
    return `translate(-800.0682,-5.6721163)`
  },[mapRangs])

  return (
    
    <div className=' w-full h-full  overflow-hidden absolute z-6'>

      <div className="thumbNails-container ">
        {thumbNailsImages.map((thumb,i)=><div
        key={i}
      className="thumbNail"

        >
         <img src={`./pics/intro/${thumb}`} alt="" className='w-full h-full' loading='lazy' />
        </div>)}
      </div>


<svg
   viewBox={`0 0 ${window.innerWidth >= 1024?svgWidth:svehight} ${window.innerWidth >= 1024?svehight:svgWidth}`}
   xmlns="http://www.w3.org/2000/svg"
   className='w-full h-screen absolute top-0 left-0  overflow-visible rotate-90 lg:rotate-0 '
   
   >
  <defs
     id="defs132" />
  <g
     id="layer1"
     //  transform="translate(-800.0682,-5.6721163)"
    //  transform="translate(-700.0682,-437.6721163) " 768 * 510
    //  transform={`${window.innerWidth>=1024?"translate(-800.0682,-5.6721163)":"translate(-300.0682,-437.6721163)"}`}
     transform={transfomMatrix}
     className="w-full h-auto"
     >
    <path
      fill='none'
    stroke='#000'
    strokeWidth={3}
    visibility={"hidden"}
       d="m 1344.958,7.5618811 c 388.5954,551.1922789 164.5085,801.2152089 0,1080.5244189"
       id="curve" />
  </g>
</svg>

    </div>
  )
}

export default CarouselThumbnails