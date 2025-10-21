
const introImages = [
    {img:"albert-dera.jpg",z:"z-4",size:"w-40 h-40"},
    {img:"charlie-green.jpg",z:"z-1",size:"w-40 h-40"},
    {img:"christian-buehner.jpg",z:"z-1",size:"w-40 h-40"},
    {img:"abubakr-palestine.jpg",z:"z-4",size:"w-40 h-40"},
    {img:"dad-palstine.jpg",z:"z-4",size:"w-40 h-40"},
    {img:"clint-maliq.jpg",z:"z-1",size:"w-40 h-40"},
    {img:"dajana-reci.jpg",z:"z-1",size:"w-50 h-50"},
    {img:"jean-daniel.jpg",z:"z-1",size:"w-40 h-40"},
    {img:"kevinbidwell.jpg",z:"z-1",size:"w-40 h-40"},
    {img:"old-palestain.jpg",z:"z-1",size:"w-30 h-30"},
    {img:"sara-palestine.jpg",z:"z-4",size:"w-50 h-50"},
    {img:"pexels-hk.jpg",z:"z-2",size:"w-30 h-30"},
    
]

const Intro = () => {



  return (
    <div className='intro w-full h-screen perspective-near relative'>
        {/* group 0 left */}

        
        {introImages.slice(0,2).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            top:`${20 + i*10}%`,
            left:`${-5+i*20}%`,
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        

        {/* group 1 middle top left */}
        
            {introImages.slice(2,4).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            top:`${5 + i*5}%`,
            left:`${30 - i*5}%`,
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        

        {/* group 2 middle bottom left */}
        
               {introImages.slice(4,6).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            bottom:`${1 + i*5}%`,
            left:`${20 + i*3}%`,
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}
        
        
        {/* group 3 middle top right */}

           {introImages.slice(6,7).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            top:`${10 + i*5}%`,
            right:`${30 + i*3}%`,
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}


        {/* group middle bottom right */}

{introImages.slice(7,9).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
        style={{
            position:"absolute",
            bottom:`${i*5*2}%`,
            right:`${40 - i*20}%`,
        }}> 
            <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
        </div>)}


       
            {introImages.slice(9).map((image,i)=><div key={i} className={`${image.size } pic ${image.z} `}
            style={{
            position:"absolute",
            top:`${8 + i*20*1.5}%`,
            right:`${15-((i+1)%2 * 5)}%`,
        }}> 
                <img src={`/pics/intro/${image.img}`} alt="" className='w-full h-full object-cover'/>
            </div>)}
        

    </div>
  )
}

export default Intro