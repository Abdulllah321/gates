"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GatesContext } from "../GatesContext";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";

function FirstSvg() {
  const { width } = useContext(GatesContext);
  const [mainPath, setMainPath] = useState("");
  const [picketsPath, setPicketsPath] = useState("");
  const [finalPath, setFinalPath] = useState("");
  const [isMounted, setIsMounted] = useState(false); // Tracks if the component has been mounted
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku").split("-");

  useEffect(() => {
    const currentWidth = width - 36;
    const increment = currentWidth * 0.5;

    // Update path data based on the current width
    const newMainPath = `
      M ${142 + increment},12 
      ${142 + increment},82 
      ${106 - increment},82 
      ${106 - increment},12 
      C ${115 - currentWidth * 0.25},12 
      ${133 + currentWidth * 0.25},12 
      ${142 + increment},12 Z`;

    const newPicketsPath = `
      M ${142 + increment},12 
      ${142 + increment},82 
      ${106 - increment},82 
      ${106 - increment},12 
      C ${115 - currentWidth * 0.25},12 
      ${133 + currentWidth * 0.25},12 
      ${142 + increment},12 Z`;

    const newFinalPath = `
      M ${142 + increment},12 C 
      ${133 + currentWidth * 0.25},12 
      ${115 - currentWidth * 0.25},12 
      ${106 - increment},12`;

    // Set the new paths
    setMainPath(newMainPath);
    setPicketsPath(newPicketsPath);
    setFinalPath(newFinalPath);
  }, [width]);

  // Trigger GSAP animation after Framer Motion animation and only after the first render
  const triggerGsapAnimation = () => {
    if (isMounted) {
      // Animate main path with GSAP
      gsap.to("#mainPath", {
        attr: { d: mainPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });

      // Animate pickets path with GSAP
      gsap.to("#picketsPath", {
        attr: { d: picketsPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });

      // Animate final path with GSAP
      gsap.to("#finalPath", {
        attr: { d: finalPath },
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });

      // Animate the picket horizontal path with GSAP
      gsap.to("#picketPath", {
        attr: {
          d: `M ${142 + (width - 36) * 0.5},66 ${106 - (width - 36) * 0.5},66`,
        },
        duration: 1.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  // Set isMounted to true after the initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    isMounted ? triggerGsapAnimation() : undefined;
  });
  return (
    <motion.svg
      viewBox="-1 -1 250 96"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <mask id="finialMask" x={0} y={0} />
      <mask id="picketMask" x={0} y={0}>
        <motion.path
          id="picketPath"
          d={`M ${142 + (width - 36) * 0.5},66 ${106 - (width - 36) * 0.5},66`}
          strokeWidth={2}
          fill="none"
          stroke="white"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
            },
          }}
        />
        {width > 119 && (
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
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
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
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
            },
          }}
        />
      </g>

      <motion.path
        id="finalPath"
        d={`M ${142 + (width - 36) * 0.5},12 C ${
          133 + (width - 36) * 0.25
        },12 ${115 - (width - 36) * 0.25},12 ${106 - (width - 36) * 0.5},12`}
        mask="url(#finialMask)"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
      />

      <motion.path
        id="picketsPath"
        d={picketsPath}
        className="stroke-current text-c-1000"
        fillOpacity={0}
        strokeWidth={2}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" },
          },
        }}
      />

   
    </motion.svg>
  );
}

export default FirstSvg;
