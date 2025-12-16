import { useEffect, useState } from "react"
import useWindowSize from "./useWindowSize"

interface Matrix {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

export function useResponsiveMatrix(
  matrix: Matrix,
  designWidth = 1440,
  maxScale = 1
) {
    const {debouncedWindowSize} =useWindowSize()
  const compute = () => {
    const rawScale = window.innerWidth / designWidth
    const scale = Math.min(rawScale, maxScale)

    return `matrix(
      ${matrix.a},
      ${matrix.b},
      ${matrix.c},
      ${matrix.d},
      ${matrix.e * scale},
      ${matrix.f * scale}
    )`
  }

  const [transform, setTransform] = useState(
    typeof window === "undefined" ? "" : compute()
  )

  useEffect(() => {
   setTransform(compute())
  }, [debouncedWindowSize])

  return transform
}
