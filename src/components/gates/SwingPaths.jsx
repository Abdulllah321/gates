import { motion } from "framer-motion";
import { useEffect } from "react";
import { createTimeline, GsapAnimation } from "../triggerGsapAnimation";

const SwingPaths = ({
  isSwing,
  width,
  isMounted,
  isDual,
  isArch,
  isCpeak,
  direction,
}) => {
  const isLeft = direction === "Left to Right";

  const currentWidth = width - 36;
  const value = currentWidth * 0.5;

  const archOffset = isCpeak ? 10 : 0;

  const swingLeft = `M ${105 - value},${(isArch||isCpeak) ? 22.5 + archOffset : 10.5} ${
    107 - value
  },${(isArch||isCpeak) ? 21.5 + archOffset : 9.5} ${109 - value},${
    (isArch||isCpeak) ? 22.5 + archOffset : 10.5
  } ${109 - value},84 ${105 - value},84 Z`;

  const swingRight = `M ${139 + value},${(isArch||isCpeak) ? 22.5 + archOffset : 10.5} ${
    141 + value
  },${(isArch||isCpeak) ? 21.5 + archOffset : 9.5} ${143 + value},${
    (isArch||isCpeak) ? 22.5 + archOffset : 10.5
  } ${143 + value},84 ${139 + value},84 Z`;

  const topHookLeft = `M ${109 - value},${(isArch||isCpeak) ? 32 + archOffset : 20} ${
    113 - value
  },${(isArch||isCpeak) ? 32 + archOffset : 20} ${113 - value},${
    (isArch||isCpeak) ? 27 + archOffset : 15
  } ${111.5 - value},${(isArch||isCpeak) ? 27 + archOffset : 15} ${111.5 - value},${
    (isArch||isCpeak) ? 31 + archOffset : 19
  } ${109 - value},${(isArch||isCpeak) ? 31 + archOffset : 19} Z`;

  const bottomHookLeft = `M ${109 - value},64 ${113 - value},64 ${
    113 - value
  },59 ${111.5 - value},59 ${111.5 - value},63 ${109 - value},63 Z`;

  const topHookRight = `M
        ${139 + value},${(isArch||isCpeak) ? 32 + archOffset : 20}
        ${135 + value},${(isArch||isCpeak) ? 32 + archOffset : 20}
        ${135 + value},${(isArch||isCpeak) ? 27 + archOffset : 15}
        ${136.5 + value},${(isArch||isCpeak) ? 27 + archOffset : 15}
        ${136.5 + value},${(isArch||isCpeak) ? 31 + archOffset : 19}
        ${139 + value},${(isArch||isCpeak) ? 31 + archOffset : 19}
     Z`;

  const bottomHookRight = `M
        ${139 + value},${(isArch||isCpeak) ? 76 + archOffset : 64}
        ${135 + value},${(isArch||isCpeak) ? 76 + archOffset : 64}
        ${135 + value},${(isArch||isCpeak) ? 71 + archOffset : 59}
        ${136.5 + value},${(isArch||isCpeak) ? 71 + archOffset : 59}
        ${136.5 + value},${(isArch||isCpeak) ? 75 + archOffset : 63}
        ${139 + value},${(isArch||isCpeak) ? 75 + archOffset : 63}
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
    if (isMounted) triggerGsapAnimation();
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
      {(isDual || isLeft) && (
        <>
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
        </>
      )}
      {(isDual || !isLeft) && (
        <>
          <motion.path
            id="topHookRight"
            fill="black"
            stroke="none"
            strokeWidth={0}
            d={topHookRight}
          />

          <motion.path
            id="bottomHookRight"
            fill="black"
            stroke="none"
            strokeWidth={0}
            d={bottomHookRight}
          />
        </>
      )}
    </>
  );
};

export default SwingPaths;
