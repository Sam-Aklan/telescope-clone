const BaseIdea = () => {
  return (
    <>
      <div className="w-full h-screen relative">

        <div className="bg-item  absolute w-full h-full">
          <div className="img w-full  h-screen absolute ">
            <img
              src="./pics/tel-1.jpg"
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src="./pics/tel-1.jpg"
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>

          <div className="img w-full  h-screen ">
            <img
              src="./pics/tel-1.jpg"
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src="./pics/tel-1.jpg"
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>
        </div>

        <div className="bg-item is-active absolute w-full h-full">
          <div className="img w-full  h-screen absolute ">
            <img
              src="./pics/tel-2.jpg"
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src="./pics/tel-2.jpg"
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>

          <div className="img w-full  h-screen ">
            <img
              src="./pics/tel-2.jpg"
              alt=""
              className="object-cover w-full max-w-[1080px] h-full absolute"
            />
            <img
              src="./pics/tel-2.jpg"
              alt=""
              className="object-cover w-full max-w-full h-full absolute"
            />
          </div>
        </div>

      </div>

      <div className="relative">
        <svg width="0" height="0" viewBox="0 0 1440 1276">
          <defs data-v-5a2fb63a="">
            <mask id="radial-mask-left" data-v-5a2fb63a="">
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
                style={{
                  transformOrigin: "0px 0px",
                  scale: "none",
                  rotate: "none",
                  translate: "none",
                  strokeDashoffset: "314%",
                }}
                transform="matrix(0.70711,0.70711,-0.70711,0.70711,456.57658,-67.69578)" 
              ></circle>
            </mask>
            <mask id="radial-mask-right" data-v-5a2fb63a="">
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
            </mask>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default BaseIdea;
