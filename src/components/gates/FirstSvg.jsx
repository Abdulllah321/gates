"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GatesContext } from "../GatesContext";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import SwingPaths from "./SwingPaths";
import SlidePaths from "./SlidePaths";
import { createTimeline, GsapAnimation } from "../triggerGsapAnimation";

function FirstSvg() {
  const { width } = useContext(GatesContext);
  const [mainPath, setMainPath] = useState("");
  const [picketsPath, setPicketsPath] = useState("");
  const [finalPath, setFinalPath] = useState("");
  const [bgPath, setBgPath] = useState("");
  const [isMounted, setIsMounted] = useState(false); // Tracks if the component has been mounted
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const currentWidth = width - 36;
  const direction = searchParams.get("direction");
  const position = searchParams.get("position");

  // Kit
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  //panel
  const isDual = sku && sku[2] === "1";
  //style
  const isArch = sku && (sku[3] === "1" || sku[3] === "3");
  const isFinials = sku && sku[3] === "2";
  const isBoth = sku && sku[3] === "3";
  const isCPeak = sku && sku[3] === "4";
  const isSectional = sku && sku[3] === "5";
  const isRec = sku && sku[3] === "0";
  //pickets
  const isSingal = sku && sku[8] === "1";
  const isPuppy = sku && sku[8] === "2";
  const isDouble = sku && sku[8] === "3";
  //pickets
  const isVWood = sku && sku[5] === "1";
  const isHWood = sku && sku[5] === "2";
  const isDiy = sku && sku[5] === "3";
  //Fill meterial
  const isCWood = sku && sku[4] === "1";
  const isTWhite = sku && sku[4] === "2";
  const isRedWood = sku && sku[4] === "3";
  const isHardWood = sku && sku[4] === "4";

  const isLeft = direction === "Left to Right";
  const isRight = direction === "Right to Left";

  const isPositionTop = position === "top";

  const increment = currentWidth * 0.5;

  let adjusted142 = 142 + increment;
  let adjusted106 = 106 - increment;
  let adjusted115 = 115 - currentWidth * 0.25;
  let adjusted133 = 133 + currentWidth * 0.25;

  useEffect(() => {
    if (isSwing && isLeft) {
      adjusted142 -= 5;
      adjusted106 += 8;
      adjusted115 += 4.5;
      adjusted133 -= 1.5;
    }
    if (isSwing && isRight) {
      adjusted142 -= 5;
      adjusted106 += 5;
      adjusted115 += 4.5;
      adjusted133 -= 1.5;
    }
    if (isDual || isSlide) {
      adjusted142 -= 8;
      adjusted106 += 8;
    }
    if (isSwing && isRight) {
      adjusted142 -= 3;
    }

    const newMainPath = isCPeak
      ? `
    M ${adjusted142},${isCPeak ? 30 : 12} 
    ${adjusted142},82 
    ${adjusted106},82 
     ${adjusted106},${isCPeak ? 30 : 12} 
    ${125},${isCPeak ? 12 : 12} 
    C ${125},${isCPeak ? 12 : 12} 
    ${125},${isCPeak ? 12 : 12}
    ${
      (isSwing && !isLeft) || isSlide
        ? 134 + increment
        : isSwing && isLeft
        ? 137 + increment
        : 142 + increment
    },${isCPeak && isSwing ? 30.5 : isCPeak ? 31 : 12}
    ${adjusted142},${isCPeak ? 30 : 12} 
    Z`
      : `
    M ${adjusted142},${isArch ? 24 : 12} 
    ${adjusted142},82 
    ${adjusted106},82 
    ${adjusted106},${isArch ? 24 : 12} 
    C ${adjusted115},${isArch ? 8 : 12} 
    ${adjusted133},${isArch ? 8 : 12} 
    ${adjusted142},${isArch ? 24 : 12} Z`;

    const newPicketsPath = newMainPath;

    const newBgPath = ` 
  M ${adjusted106},90 
  L ${adjusted106},12 
  Q ${(adjusted106 + adjusted142) / 2},0 ${adjusted142},12
  L ${adjusted142},90 
  Z`;

    const newFinalPath = `M
      ${adjusted142},${isFinials ? 8 : isArch ? 20 : 12}
      ${adjusted142},${isArch ? 24 : 12}
      C ${adjusted133},${isArch ? 8 : 12}
      ${adjusted115},${isArch ? 8 : 12}
      ${adjusted106},${isArch ? 24 : 12}
      ${adjusted106},${isArch ? 24 : 12}
      ${adjusted106},${isArch ? 24 : 12}
      ${adjusted106},${isFinials ? 8 : isArch ? 24 : 12}
      C ${adjusted115},${isFinials ? 8 : isArch ? 8 : 12}
      ${adjusted133},${isFinials ? 8 : isArch ? 8 : 12}
      ${adjusted142},${isFinials ? 8 : isArch ? 20 : 12}
      Z
      `;
    const bothFinialPath = `M
      ${adjusted142},20
      ${adjusted142},24
      C ${adjusted133},8
      ${adjusted115},8
      ${adjusted106},24
      ${adjusted106},24
      ${adjusted106},24
      ${adjusted106},20
      C ${adjusted115},4
      ${adjusted133},4
      ${adjusted142},20
      Z`;

    setBgPath(newBgPath);
    setMainPath(newMainPath);
    setPicketsPath(newPicketsPath);
    setFinalPath(isBoth ? bothFinialPath : newFinalPath);
  }, [width, sku]);

  // Trigger Gsap animation after Framer Motion animation and only after the first render
  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#mainPath", { d: mainPath });
      GsapAnimation("#picketsPath", { d: picketsPath });
      GsapAnimation("#finialPath", { d: finalPath });
      GsapAnimation("#picketPath", {
        d: `M ${adjusted142},${isPositionTop ? 33 : 66} ${adjusted106},${
          isPositionTop ? 33 : 66
        }`,
      });
      GsapAnimation("#diyleft", {
        d: `M ${94 - (width - 120) * 0.25},12 ${94 - (width - 120) * 0.25},96`,
      });
      GsapAnimation("#diyRight", {
        d: `M ${154 + (width - 120) * 0.25},12 ${
          154 + (width - 120) * 0.25
        },96`,
      });
    }
  };

  // Set isMounted to true after the initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    isMounted ? triggerGsapAnimation() : null;
  });

  return (
    <Suspense>
      {/* <div className="scale-80"> */}
        <motion.svg
          viewBox="-1 -1 250 96"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <mask id="finialMasks" x={0} y={0}>
            {(isFinials || isBoth) && (
              <>
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d={`M ${isDual ? 122.175 : 124.3},48 0,48`}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d={`M ${isDual ? 125.825 : 123.7},48 248,48`}
                />
              </>
            )}
          </mask>
          <mask id="picketMask" x={0} y={0}>
            <AnimatePresence>
              {!isRec && isSectional && (
                <motion.path
                  id="picketPath"
                  d={`M ${142 + (width - 36) * 0.5},66 ${
                    106 - (width - 36) * 0.5
                  },66`}
                  strokeWidth={2}
                  fill="none"
                  stroke="white"
                  initial="hidden"
                  animate="visible"
                  exit={"hidden"}
                  variants={{
                    hidden: { pathLength: 0 },
                    visible: {
                      pathLength: 1,
                      transition: { duration: 1, ease: "easeInOut" },
                    },
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isDiy && width > 60 && width < 119 && (
                <>
                  <motion.path
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    d="M 124,12 124,96"
                    initial="hidden"
                    animate="visible"
                    exit={"hidden"}
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: {
                        pathLength: 1,
                        transition: { duration: 1, ease: "easeInOut" },
                      },
                    }}
                  />
                </>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {isDiy && width > 119 && (
                <>
                  <motion.path
                    id={"diyleft"}
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    d={`M ${94 - (width - 120) * 0.25},12 ${
                      94 - (width - 120) * 0.25
                    },96`}
                    initial="hidden"
                    animate="visible"
                    exit={"hidden"}
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: {
                        pathLength: 1,
                        transition: { duration: 1, ease: "easeInOut" },
                      },
                    }}
                  />
                  <motion.path
                    id={"diyRight"}
                    fill="none"
                    stroke="white"
                    strokeWidth={2}
                    d={`M ${154 + (width - 120) * 0.25},12 ${
                      154 + (width - 120) * 0.25
                    },96`}
                    initial="hidden"
                    animate="visible"
                    exit={"hidden"}
                    variants={{
                      hidden: { pathLength: 0 },
                      visible: {
                        pathLength: 1,
                        transition: { duration: 1, ease: "easeInOut" },
                      },
                    }}
                  />
                </>
              )}
            </AnimatePresence>

            {width > 119 && !isDual && (
              <>
                <path
                  d="M 125,12 125,96"
                  strokeWidth={2}
                  fill="none"
                  stroke="white"
                />
                <path
                  d="M 123,12 123,96"
                  strokeWidth={2}
                  fill="none"
                  stroke="white"
                />
              </>
            )}
            {isDual && (
              <>
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  d={`M 125.5,12 125.5,96`}
                />

                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  d="M 122.5,12 122.5,96"
                />
              </>
            )}
            {isSingal && (
              <>
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d={`M ${isDual ? 122.175 : 124.3},48 0,48`}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d={`M ${isDual ? 125.875 : 123.7},48 248,48`}
                />
              </>
            )}

            <path
              fill="none"
              stroke="white"
              strokeWidth={96}
              strokeDasharray="0.75,4.75"
              d={`M ${isDual ? 122.175 : 124.3},48 0,48`}
              style={{}}
            />

            <path
              fill="none"
              stroke="white"
              strokeWidth={96}
              strokeDasharray="0.75,4.75"
              d={`M ${isDual ? 125.875 : 123.7},48 248,48`}
              style={{}}
            />

            {isDouble && (
              <>
                {" "}
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  d="M 125,12 125,96"
                  style={{}}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  d="M 123,12 123,96"
                  style={{}}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d="M 124.3,48 0,48"
                  style={{}}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d="M 123.7,48 248,48"
                  style={{}}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d="M 121.55,48 0,48"
                  style={{}}
                />
                <path
                  fill="none"
                  stroke="white"
                  strokeWidth={96}
                  strokeDasharray="0.75,4.75"
                  d="M 126.45,48 248,48"
                  style={{}}
                />
              </>
            )}
          </mask>
          <mask id="ironwoodMask" x={0} y={0}>
            {isVWood && (
              <>
                <path
                  fill="none"
                  stroke="gray"
                  strokeWidth={96}
                  strokeDasharray="0.125,5.5"
                  d="M 0.25,48 248,48"
                  style={{}}
                />
              </>
            )}
            {isHWood && (
              <>
                {" "}
                <rect fill="white" className="w-full h-full" style={{}} />
                <path
                  fill="none"
                  stroke="gray"
                  strokeWidth={width}
                  strokeDasharray="0.125,5.5"
                  d="M 124.2,0 124.2,96"
                  style={{}}
                />
              </>
            )}{" "}
          </mask>
          <g transform="translate(0,-7)">
            <path fill="url(#img1)" d={bgPath} />
          </g>

          {/* <defs>
          <pattern
            id="img1"
            patternUnits="userSpaceOnUse"
            width="120"
            height="120"
          >
            <image
              href={
                isCWood
                  ? `/cedar-wood.png`
                  : isTWhite
                  ? "/treated-pine-white.png"
                  : isRedWood
                  ? "/red-wood.png"
                  : isHardWood
                  ? "hard-wood.png"
                  : "/cedar-wood.png"
              }
              x="0"
              y="0"
              width="120"
              height="120"
            />
          </pattern>
        </defs> */}

          <g mask="url(#ironwoodMask)" fill="url(#img1)">
            <motion.path
              id="mainPath"
              d={finalPath}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 1, ease: "easeInOut" },
                },
              }}
            />
          </g>

          <g mask="url(#picketMask)">
            <motion.path
              id="picketsPath"
              d={picketsPath}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { pathLength: 0 },
                visible: {
                  pathLength: 1,
                  transition: { duration: 1, ease: "easeInOut" },
                },
              }}
            />
          </g>

          <path d={finalPath} mask="url(#finialMasks)" id="finialPath" />

          <motion.path
            id="picketsPath"
            d={picketsPath}
            className="stroke-current text-c-1000"
            fillOpacity={0}
            strokeWidth={2}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 1, ease: "easeInOut" },
              },
            }}
          />
          {isDual && (
            <path
              fill="none"
              stroke="white"
              strokeWidth="1.1"
              d="M 123.95,10 123.95,84"
              style={{}}
            />
          )}

          {/* ------------- swing paths ------------- */}
          <SwingPaths
            isSwing={isSwing}
            width={width}
            isMounted={isMounted}
            isDual={isDual}
            direction={direction}
            isCPeak={isCPeak}
            isArch={isArch || isBoth}
          />
          {/* ------------- Slide paths ------------- */}
          <SlidePaths
            isSlide={isSlide}
            width={width}
            isMounted={isMounted}
            isDual={isDual}
          />
        </motion.svg>
      {/* </div> */}
    </Suspense>
  );
}

export default FirstSvg;
