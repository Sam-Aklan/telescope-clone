
const CarouselThumbnails = ({thumbNailsImages}:{thumbNailsImages:string[]}) => {

  return (
    
    <div className=' w-full h-full  overflow-y-hidden absolute z-6'>

      <div className="thumbNails-container ">
        {thumbNailsImages.map((thumb,i)=><div
        key={i}
      className="thumbNail"

        >
         <img src={`./pics/intro/${thumb}`} alt="" className='w-full h-full' loading='lazy' />
        </div>)}
      </div>


<svg
   viewBox="0 0 219.10413 1084.304"
   xmlns="http://www.w3.org/2000/svg"
   className='w-full h-screen absolute top-0 left-0  overflow-visible '
   visibility="hidden"
   >
  <defs
     id="defs132" />
  <g
     id="layer1"
     transform="translate(-800.0682,-5.6721163)">
    <path
      fill='none'
    stroke='#000'
    strokeWidth={.5}
       d="m 1344.958,7.5618811 c 388.5954,551.1922789 164.5085,801.2152089 0,1080.5244189"
       id="curve" />
  </g>
</svg>

    </div>
  )
}

export default CarouselThumbnails