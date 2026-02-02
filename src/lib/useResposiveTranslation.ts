import React, { useEffect, useState } from "react";
interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

interface ResponsiveMatrixOptions {
 
  containerRef: React.RefObject<HTMLElement | null>;

  /** Desired horizontal anchor as a percentage of the container */
  xPercent: number; // e.g. 0.2 → 20% from left

  
  rotationDegree :number
  yPercent?: number; // optional vertical anchor (default 0.5 = center)
}

export function useResponsiveMatrix({
  containerRef,
  xPercent,
  yPercent = 0.5,
  rotationDegree,
  
}: ResponsiveMatrixOptions) {
  const [transform, setTransform] = useState("");

  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entries[0].contentRect;


     const angleRad = (rotationDegree * Math.PI) / 180;
     
       const cos = Math.cos(angleRad);
      const sin = Math.sin(angleRad);

      const rotationMatrix: Matrix = {
        a: cos,
        b: sin,
        c: -sin,
        d: cos,
      };
      
      // SVG scales from center → left edge shifts right as width shrinks
      if (width >= 1024) {
        const x = xPercent * width;
      const y = yPercent * height;
      const targetX = x
      const targetY = y
      const e = targetX - (rotationMatrix.a * x + rotationMatrix.c * y);
      const f = targetY - (rotationMatrix.b * x + rotationMatrix.d * y);

      setTransform(
        `matrix(${rotationMatrix.a},${rotationMatrix.b},${rotationMatrix.c},${rotationMatrix.d},${e},${f})`
      );

        return;
      }

      

      // local circle center (cx=50%, cy=25%)
      const x = 0.5 * width;
      const y = 0.25 * height;

      // target screen position (50%, 25%)
      const targetX = 0.5 * width;
      const targetY = 0.25 * height;

      // 🔑 exact solution for translation
      const e = targetX - (cos * x + -sin * y);
      const f = targetY - (sin * x + cos * y);

      setTransform(
        `matrix(${rotationMatrix.a},${rotationMatrix.b},${rotationMatrix.c},${rotationMatrix.d},${e},${f})`
      )

     
  });

  ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef,  xPercent,yPercent]);
  return transform;
}
