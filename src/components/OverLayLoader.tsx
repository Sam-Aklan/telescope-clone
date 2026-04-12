
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