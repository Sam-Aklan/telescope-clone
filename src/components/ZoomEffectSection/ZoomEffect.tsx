
const ZoomEffect = () => {
  
  return (
    <div className="banner w-full  h-[100svh] max-h-255 relative">
      <div className="flex flex-col w-full gap-4  overflow-hidden absolute top-1/2 left-1/2 -translate-1/2 z-5">
        <div className="text-3xl shrink text-center whitespace-nowrap line first-line">
          Real Recommendation
        </div>

      <div className="flex items-center justify-center gap-4 overflow-hidden w-full">
        <div className="text-3xl shrink  whitespace-nowrap  w-fit left-text line">

        by Real
        </div>
        <div className="text-3xl shrink  whitespace-nowrap  w-fit right-text line">
          People
        </div>
      </div>
      </div>

      <div className="banner-img-container w-full h-[100svh] absolute z-3">
        <div className=" w-full h-full  max-h-255 overflow-hidden relative ">
          <div className="image absolute w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask  w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask  w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask  w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask  w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
          <div className="image mask  w-full h-full">
            <img src="./pics/zoom/stefan-moertl.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomEffect;
