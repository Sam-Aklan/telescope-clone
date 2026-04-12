import React from 'react'
 const images =["./pics/leonardo.jpg",
  "./pics/Mari-curl.jpg",
  "./pics/albert-einstein.jpg",
  "./pics/Mozart.jpg",
  "./pics/frida-kahlo.jpg",
  "./intro/albert-dera.jpg",
"./intro/charlie-green.jpg",
"./intro/christian-buehner.jpg",
"./intro/abubakr-palestine.jpg",
"./intro/dad-palstine.jpg",
"./intro/clint-maliq.jpg",
"./intro/dajana-reci.jpg",
"./intro/jean-daniel.jpg",
"./intro/kevinbidwell.jpg",
"./intro/old-palestain.jpg",
"./intro/sara-palestine.jpg",
"./intro/pexels-hk.jpg",
"./zoom/stefan-moertl.jpg",
"./zoom/stefan-moertl.png",
]
const OverLayLoader = ({progress}:{progress:number}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="mb-4 text-lg">Loading...</p>
        <div className="w-64 h-2 bg-gray-700 rounded">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm">{Math.floor(progress)}%</p>
      </div>
    </div>
  )
}

export default OverLayLoader