

import { RoundKeyboardArrowLeft } from '../svgs/ArrowLeft';
import { RoundKeyboardArrowRight } from '../svgs/ArrowRight';


const MobileCarouselBtns = ({goToSlide,currentIndex}:{goToSlide:(nextIndex:number)=>void,currentIndex:number}) => {
  
  return (
    <div className=' absolute top-2/3 left-1/2 -translate-x-1/2 translate-y-2/3 w-fit h-fit p-2 flex justify-center items-center gap-4 z-20'>

    <div className='w-15 h-15 rounded-full bg-green-400'
    onClick={()=>goToSlide(currentIndex + 1)}>
        <RoundKeyboardArrowLeft className='w-full h-full'/>
    </div>
    <div className='w-15 h-15 rounded-full bg-green-400'
    onClick={()=> goToSlide(currentIndex - 1)}>
        <RoundKeyboardArrowRight className='w-full h-full'/>
    </div>
    </div>
  );
};

export default MobileCarouselBtns;