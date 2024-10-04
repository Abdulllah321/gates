import { motion } from "framer-motion";
import gsap from "gsap";
import { useEffect } from "react";
import { createTimeline, GsapAnimation } from "../triggerGsapAnimation";

const SwingPaths = ({ isSwing, width, isMounted }) => {
  const currentWidth = width - 36;
  const value = currentWidth * 0.5;
  if (!isSwing) return null;
  const swingLeft = `M ${105 - value},10.5 
        ${107 - value},9.5 
        ${109 - value},10.5 
        ${109 - value},84 
        ${105 - value},84 
        Z`;
  const swingRight = `M ${139 + value},10.5 ${141 + value},9.5 ${
    143 + value
  },10.5 ${143 + value},84 ${139 + value},84 Z`;
  const topHook = `M ${109 - value},20 ${113 - value},20 ${113 - value},15 ${
    111.5 - value
  },15 ${111.5 - value},19 ${109 - value},19 Z`;
  const bottomHook = `M ${109 - value},64 ${113 - value},64 ${113 - value},59 ${
    111.5 - value
  },59 ${111.5 - value},63 ${109 - value},63 Z`;

  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#swingLeft", { d: swingLeft });

      GsapAnimation("#swingRight", { d: swingRight });

      GsapAnimation("#topHook", { d: topHook });

      GsapAnimation("#bottomHook", { d: bottomHook });
    }
  };

  useEffect(() => {
    isMounted ? triggerGsapAnimation() : null;
  });

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
        id={`topHook`}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={topHook}
      />
      <motion.path
        id={"bottomHook"}
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={bottomHook}
      />
    </>
  );
};

export default SwingPaths;
