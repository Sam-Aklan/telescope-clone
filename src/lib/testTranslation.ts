import React, { useEffect, useState } from "react";
import useWindowSize from "./useWindowSize";

interface Matrix {
  a: number;
  b: number;
  c: number;
  d: number;
}

interface Breakpoint {
  width: number;
  height: number;
  e: number;
  f: number;
}

interface ResponsiveMatrixOptions {
  matrix: Matrix;
  containerRef: React.RefObject<HTMLElement | null>;

  /** SVG design reference size (viewBox) */
  baseWidth: number; // e.g. 1440
  baseHeight: number; // e.g. 928

  /** Desired horizontal anchor as a percentage of the container */
  xPercent: number; // e.g. 0.2 → 20% from left

  /** Horizontal design offset (design-space translation at base width) */
  baseE: number; // e.g. 506.57658 (left) or -395.69578 (right)

  /** Vertical design offsets */
  baseF: number; // vertical translation at design height
  baseYPercent?: number; // optional vertical anchor (default 0.5 = center)
}

export function useResponsiveMatrix({
  matrix,
  containerRef,
  baseHeight,
  baseF,
  baseE,
  baseWidth,
  xPercent,
  baseYPercent = 0.5,
}: ResponsiveMatrixOptions) {
  const [transform, setTransform] = useState("");
  const { debouncedWindowSize } = useWindowSize();
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entries[0].contentRect;

      // ============================== 
      // SCALE (how SVG shrinks/grows) 
      // ==============================
      console.log("xpercent",xPercent, "ypercent",baseYPercent, "ref",containerRef.current)
      
      const scaleX = width / baseWidth;
      const scaleY = height / baseHeight;

      // ==============================
      // HORIZONTAL — CENTER SCALE
     //  ==============================
      
      // SVG scales from center → left edge shifts right as width shrinks
      if (debouncedWindowSize.width >= 1024) {
        const svgCenterShiftX = (baseWidth * (1 - scaleX)) / 8;
        const e = baseE - svgCenterShiftX;
        // --- Y AXIS --- // Anchor vertically (default center) + design offset
        const anchorY = height * baseYPercent;
        const f = anchorY - baseHeight * baseYPercent + baseF;
        setTransform(
          ` matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${e},${f})`
        );
        return;
      }

     // ==============================
// TABLET + MOBILE MODE
// Rotate FIRST, then translate
// ==============================

// Compute translation in DESIGN SPACE (unrotated)
const svgCenterShiftX = (baseWidth * (1 - scaleX)) / 8;

const extraOffset =
  255 - 265 * Math.min(1, Math.max(0, (1023 - width) / 703));

const tx = baseE - svgCenterShiftX + extraOffset;

const anchorY = height * baseYPercent;
const ty = anchorY - baseHeight * baseYPercent + baseF;

//  Rotate the translation vector by -90°
// matrix = [0 -1 1 0]
const e = ty;
const f = -tx;

// 3️⃣ Apply matrix
setTransform(
  `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${e - 100},${f + 500})`
);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef, matrix, baseWidth, baseHeight, xPercent, baseE, baseF]);
  return transform;
}
