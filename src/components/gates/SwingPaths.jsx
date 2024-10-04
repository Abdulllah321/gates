import { motion } from "framer-motion";
import { useEffect } from "react";
import { createTimeline, GsapAnimation } from "../triggerGsapAnimation";

const SwingPaths = ({ isSwing, width, isMounted, isDual, isArch }) => {
  const currentWidth = width - 36;
  const value = currentWidth * 0.5;
  const swingLeft = `M ${105 - value},${isArch ? 22.5 : 10.5} 
        ${107 - value},${isArch ? 21.5 : 9.5} 
        ${109 - value},${isArch ? 22.5 : 10.5} 
        ${109 - value},84 
        ${105 - value},84 
        Z`;

  const swingRight = `M ${139 + value},${isArch ? 22.5 : 10.5} ${141 + value},${
    isArch ? 21.5 : 9.5
  } ${143 + value},${isArch ? 22.5 : 10.5} ${143 + value},84 ${
    139 + value
  },84 Z`;

  const topHookLeft = `M ${109 - value},${isArch ? 32 : 20} ${113 - value},${
    isArch ? 32 : 20
  } ${113 - value},${isArch ? 27 : 15} ${111.5 - value},${isArch ? 27 : 15} ${
    111.5 - value
  },${isArch ? 31 : 19} ${109 - value},${isArch ? 31 : 19} Z`;

  const bottomHookLeft = `M ${109 - value},64 ${113 - value},64 ${
    113 - value
  },59 ${111.5 - value},59 ${111.5 - value},63 ${109 - value},63 Z`;

  const topHookRight = `M
        ${139 + value},${isArch ? 32 : 20}
        ${135 + value},${isArch ? 32 : 20}
        ${135 + value},${isArch ? 27 : 15}
        ${136.5 + value},${isArch ? 27 : 15}
        ${136.5 + value},${isArch ? 31 : 19}
        ${139 + value},${isArch ? 31 : 19}
     Z`;

  const bottomHookRight = `M
        ${139 + value},${isArch ? 76 : 64}
        ${135 + value},${isArch ? 76 : 64}
        ${135 + value},${isArch ? 71 : 59}
        ${136.5 + value},${isArch ? 71 : 59}
        ${136.5 + value},${isArch ? 75 : 63}
        ${139 + value},${isArch ? 75 : 63}
      Z`;

  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#swingLeft", { d: swingLeft });

      GsapAnimation("#swingRight", { d: swingRight });

      GsapAnimation("#topHookLeft", { d: topHookLeft });

      GsapAnimation("#bottomHookLeft", { d: bottomHookLeft });

      GsapAnimation("#topHookRight", { d: topHookRight });

      GsapAnimation("#bottomHookRight", { d: bottomHookRight });
    }
  };

  useEffect(() => {
    isMounted ? triggerGsapAnimation() : null;
  });

  if (!isSwing) return null;

  return (
    <>
      {/* Swing left */}
      <motion.path
        id={`swingLeft`}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={swingLeft}
      />
      {/* Swing Right */}
      <motion.path
        id={"swingRight"}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={swingRight}
      />

      {/* hook top */}
      <motion.path
        id={`topHookLeft`}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={topHookLeft}
      />
      <motion.path
        id={"bottomHookLeft"}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={bottomHookLeft}
      />

      {isDual && (
        <>
          <path
            id="topHookRight"
            fill="black"
            stroke="none"
            strokeWidth={0}
            d={topHookRight}
          />

          <path
            id="bottomHookRight"
            fill="black"
            stroke="none"
            strokeWidth={0}
            d={bottomHookRight}
            style={{}}
          />
        </>
      )}
    </>
  );
};

export default SwingPaths;
