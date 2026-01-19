import { useMemo } from "react"
import { getPosition } from "../../utils/zoomEffect"

const introImages = [
    {img:"albert-dera.jpg",z:"z-4",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"charlie-green.jpg",z:"z-1",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"christian-buehner.jpg",z:"z-1",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"abubakr-palestine.jpg",z:"z-4",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"dad-palstine.jpg",z:"z-4",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"clint-maliq.jpg",z:"z-1",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"dajana-reci.jpg",z:"z-1",size:"w-25 h-25 lg:w-40 lg:h-40 xl:w-45 xl:h-45"},
    {img:"jean-daniel.jpg",z:"z-1",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"kevinbidwell.jpg",z:"z-1",size:"w-20 h-20 lg:w-35 lg:h-35 xl:w-40 xl:h-40"},
    {img:"old-palestain.jpg",z:"z-1",size:"w-15 h-15 lg:w-20 lg:h-20 xl:w-30 h-30"},
    {img:"sara-palestine.jpg",z:"z-4",size:"w-25 h-25 lg:w-40 lg:h-40 xl:w-45 xl:h-45"},
    {img:"pexels-hk.jpg",z:"z-2",size:"w-20 h-20 xl:w-30 h-30"},
    
]

const Intro = () => {

   const isMobile = useMemo(()=>window.innerWidth <1024,[window.innerWidth])

  const imagesScliecs= useMemo(()=>isMobile?[
    {start:0,end:3},
    {start:3,end:4},
    {start:4,end:7},
    {start:7,end:9},
    {start:9,},
    
]:[
   {start:0,end:2},
    {start:2,end:4},
    {start:4,end:6},
    {start:6,end:7},
    {start:7,end:9},
    {start:9}, 
],[isMobile])



  return (
    <div className='intro w-full h-screen perspective-near relative'>
        {/* group 0 left */}

        
        {introImages.slice(imagesScliecs[0].start,imagesScliecs[0].end).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            ...getPosition(0,i,isMobile)
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        

        {/* group 1 middle top left */}
        
            {introImages.slice(imagesScliecs[1].start,imagesScliecs[1].end).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            ...getPosition(1,i,isMobile)
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        

        {/* group 2 middle bottom left */}
        
               {introImages.slice(imagesScliecs[2].start,imagesScliecs[2].end).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            ...getPosition(2,i,isMobile)
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        
        
        {/* group 3 middle top right */}

           {introImages.slice(imagesScliecs[3].start,imagesScliecs[3].end).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            ...getPosition(3,i,isMobile)
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}


        {/* group 4 middle bottom right */}

{introImages.slice(imagesScliecs[4].start,imagesScliecs[4].end).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            ...getPosition(4,i,isMobile)
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}


        {/* group 5 right */}
            {isMobile?undefined:introImages.slice(imagesScliecs[5].start).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
            style={{
            position:"absolute",
            ...getPosition(5,i,isMobile)
        }}> 
                <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
            </div>)}
        

    </div>
  )
}

export default Intro