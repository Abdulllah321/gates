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
  const [isMounted, setIsMounted] = useState(false); // Tracks if the component has been mounted
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const currentWidth = width - 36;

  // Kit
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  //panel
  const isDual = sku && sku[2] === "1";
  //style
  const isArch = sku && (sku[3] === "1" || sku[3] === "3");
  const isFinials = sku && sku[3] === "2";
  const isBoth = sku && sku[3] === "3";
  //pickets
  const isSingal = sku && sku[4] === "1";
  const isPuppy = sku && sku[4] === "2";
  const isDouble = sku && sku[4] === "3";
  //pickets
  const isVWood = sku && sku[5] === "1";
  const isHWood = sku && sku[5] === "2";
  const isDiy = sku && sku[5] === "3";

  const increment = currentWidth * 0.5;

  let adjusted142 = 142 + increment;
  let adjusted106 = 106 - increment;
  let adjusted115 = 115 - currentWidth * 0.25;
  let adjusted133 = 133 + currentWidth * 0.25;
  useEffect(() => {
    if (isSwing) {
      adjusted142 -= 5;
      adjusted106 += 8;
      adjusted115 += 4.5;
      adjusted133 -= 1.5;
    }

    const newMainPath = `
    M ${adjusted142},${isArch ? 24 : 12} 
    ${adjusted142},82 
    ${adjusted106},82 
    ${adjusted106},${isArch ? 24 : 12} 
    C ${adjusted115},${isArch ? 8 : 12} 
    ${adjusted133},${isArch ? 8 : 12} 
    ${adjusted142},${isArch ? 24 : 12} Z`;

    const newPicketsPath = newMainPath;

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
    setMainPath(newMainPath);
    setPicketsPath(newPicketsPath);
    setFinalPath(isBoth ? bothFinialPath : newFinalPath);
  }, [width, sku]);

  // Trigger GSAP animation after Framer Motion animation and only after the first render
  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#mainPath", { d: mainPath });
      GsapAnimation("#picketsPath", { d: picketsPath });
      GsapAnimation("#finialPath", { d: finalPath });
      GsapAnimation("#picketPath", {
        d: `M ${adjusted142},66 ${adjusted106},66`,
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
            {!isSlide && (
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

          {isPuppy && (
            <>
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

              <path
                fill="none"
                stroke="white"
                strokeWidth={16}
                strokeDasharray="0.75,4.75"
                d={`M ${isDual ? 119.125 : 121.55},74 0,74`}
                style={{}}
              />

              <path
                fill="none"
                stroke="white"
                strokeWidth={16}
                strokeDasharray="0.75,4.75"
                d={`M ${isDual ? 128.575 : 126.45},74 248,74`}
                style={{}}
              />
            </>
          )}
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
              {" "}
              <rect fill="white" className="w-full h-full" style={{}} />
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
          )}
        </mask>

        <g mask="url(#ironwoodMask)">
          <motion.path
            id="mainPath"
            d={mainPath}
            className="fill-current text-c-brown"
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
        />
        {/* ------------- Slide paths ------------- */}
        <SlidePaths isSlide={isSlide} width={width} isMounted={isMounted} />
      </motion.svg>
    </Suspense>
  );
}

export default FirstSvg;
