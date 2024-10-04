import { useEffect } from "react";
import { createTimeline, GsapAnimation } from "../triggerGsapAnimation";

const SlidePaths = ({ isSlide, width, isMounted,isDual }) => {
  const currentWidth = width - 36;
  const value = currentWidth * 0.5;
  if (!isSlide) return null;

  const leftRod = `M
        ${105 - value},10.5
        ${107 - value},9.5
        ${109 - value},10.5
        ${109 - value},86
        ${105 - value},86
      Z`;
  const rightRod = `M 
        ${139 + value},10.5
        ${141 + value},9.5
        ${143 + value},10.5
        ${143 + value},86
        ${139 + value},86
      Z`;
  const circleLeftTop = `M
        ${116 - value},84
        ${120 - value},84
        ${120 - value},82
        ${116 - value},82
        Z`;
  const circleLeft = 118 - value;
  const circleRightTop = `M
        ${132 + value},84
        ${128 + value},84
        ${128 + value},82
        ${132 + value},82
        Z`;
  const circleRight = 130 + value;

  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#leftRod", { d: leftRod });
      GsapAnimation("#rightRod", { d: rightRod });
      GsapAnimation("#circleLeftTop", { d: circleLeftTop });
      GsapAnimation("#circleLeft", { cx: circleLeft });
      GsapAnimation("#circleRightTop", { d: circleRightTop });
      GsapAnimation("#circleRight", { cx: circleRight });
    }
  };

  useEffect(() => {
    isMounted ? triggerGsapAnimation() : null;
  });
  return (
    <>
      <path
        id="leftRod"
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={leftRod}
        style={{}}
      />

      <path
        id="rightRod"
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={rightRod}
        style={{}}
      />

      <path
        id="circleLeftTop"
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={circleLeftTop}
        style={{}}
      />

      <circle
        id="circleLeft"
        cx={circleLeft}
        cy={84}
        r="1.5"
        stroke="none"
        strokeWidth={0}
        fill="black"
        style={{}}
      />

      <path
        fill="black"
        stroke="none"
        strokeWidth={0}
        d={circleRightTop}
        style={{}}
      />

      <circle
        cx={circleRight}
        cy={84}
        r="1.5"
        stroke="none"
        strokeWidth={0}
        fill="black"
        style={{}}
      />

      {isDual && (
        <>
          <path
            fill="black"
            stroke="none"
            strokeWidth={0}
            d="M

          134,84

          138,84

          138,82

          134,82

        Z"
            style={{}}
          />

          <circle
            cx={136}
            cy={84}
            r="1.5"
            stroke="none"
            strokeWidth={0}
            fill="black"
            style={{}}
          />

          <path
            fill="black"
            stroke="none"
            strokeWidth={0}
            d="M

        114,84

        110,84

        110,82

        114,82

        Z"
            style={{}}
          />

          <circle
            cx={112}
            cy={84}
            r="1.5"
            stroke="none"
            strokeWidth={0}
            fill="black"
            style={{}}
          />
        </>
      )}
    </>
  );
};

export default SlidePaths;
