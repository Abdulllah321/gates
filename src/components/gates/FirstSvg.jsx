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
  // Kit
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  //panel
  const isDual = sku && sku[2] === "1";
  //style
  const isArch = sku && (sku[3] === "1" || sku[3] === "3");
  const isFinials = sku && sku[3] === "2";
  const isBoth = sku && sku[3] === "3";

  useEffect(() => {
    const currentWidth = width - 36;
    const increment = currentWidth * 0.5;

    let adjusted142 = 142 + increment;
    let adjusted106 = 106 - increment;
    let adjusted115 = 115 - currentWidth * 0.25;
    let adjusted133 = 133 + currentWidth * 0.25;

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
      ${adjusted142},${isFinials ? 8 : isArch ? 20 : isBoth ? 20 : 12}
      ${adjusted142},${isArch ? 24 : isBoth ? 24 : 12}
      C ${adjusted133},${isArch ? 8 : isBoth ? 8 : 12}
      ${adjusted115},${isArch ? 8 : isBoth ? 8 : 12}
      ${adjusted106},${isArch ? 24 : isBoth ? 24 : 12}
      ${adjusted106},${isArch ? 24 : isBoth ? 24 : 12}
      ${adjusted106},${isArch ? 24 : isBoth ? 24 : 12}
      ${adjusted106},${isFinials ? 8 : isArch ? 24 : isBoth ? 20 : 12}
      C ${adjusted115},${isFinials ? 8 : isArch ? 8 : isBoth ? 4 : 12}
      ${adjusted133},${isFinials ? 8 : isArch ? 8 : isBoth ? 4 : 12}
      ${adjusted142},${isFinials ? 8 : isArch ? 20 : isBoth ? 20 : 12}
      Z
      `;
    const bothFinialPath = ``;
    setMainPath(isBoth ? bothFinialPath : newMainPath);
    setPicketsPath(newPicketsPath);
    setFinalPath(newFinalPath);
  }, [width, sku]);

  // Trigger GSAP animation after Framer Motion animation and only after the first render
  const triggerGsapAnimation = () => {
    createTimeline();
    if (isMounted) {
      GsapAnimation("#mainPath", { d: mainPath });
      GsapAnimation("#picketsPath", { d: picketsPath });
      GsapAnimation("#finialPath", { d: finalPath });
      GsapAnimation("#picketPath", {
        d: `M ${142 + (width - 36) * 0.5},66 ${106 - (width - 36) * 0.5},66`,
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
                d="M 124.3,48 0,48"
              />
              <path
                fill="none"
                stroke="white"
                strokeWidth={96}
                strokeDasharray="0.75,4.75"
                d="M 123.7,48 248,48"
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
                d="M 125.5,12 125.5,96"
                style={{}}
              />

              <path
                fill="none"
                stroke="white"
                strokeWidth={2}
                d="M 122.5,12 122.5,96"
                style={{}}
              />
            </>
          )}
        </mask>
        <mask id="ironwoodMask" x={0} y={0} />

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

        {/* ------------- swing paths ------------- */}
        <SwingPaths isSwing={isSwing} width={width} isMounted={isMounted} />
        {/* ------------- Slide paths ------------- */}
        <SlidePaths isSlide={isSlide} width={width} isMounted={isMounted} />
      </motion.svg>
    </Suspense>
  );
}

export default FirstSvg;
