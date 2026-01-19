import "./App.css";
import CurateSection from "./components/Curation";

import CarousselThumbPara from "./components/ShutterSection/CarouselThumbPara";

function App() {
  return (
    <>
    <div className="w-full h-screen bg-amber-200"/>
      <CarousselThumbPara />
    <div className="w-full h-screen bg-amber-200"/>

    <div className="w-full h-screen bg-blue-600"></div>

    <CurateSection/>
   
    <div className="w-full h-screen bg-green-700"></div>
    </>
  );
}

export default App;
