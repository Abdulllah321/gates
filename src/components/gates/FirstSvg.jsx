import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GatesContext } from "../GatesContext";
import { gsap } from "gsap";

function FirstSvg() {
  const { width } = useContext(GatesContext);
  const [mainPath, setMainPath] = useState("");
  const [picketsPath, setPicketsPath] = useState("");

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

    // Set the new paths
    setMainPath(newMainPath);
    setPicketsPath(newPicketsPath);
  }, [width]);

  // Animate the SVG paths with GSAP
  useEffect(() => {
    gsap.to("#mainPath", {
      attr: { d: mainPath },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });

    gsap.to("#picketsPath", {
      attr: { d: picketsPath },
      duration: 1.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, [mainPath, picketsPath]);

  return (
    <motion.svg
      viewBox="-1 -1 250 96"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
    >
      <mask id="finialMask" x={0} y={0} />
      <mask id="picketMask" x={0} y={0}>
        <motion.path
          id="picketPath" // Set id for GSAP animation
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
      </mask>
      <mask id="ironwoodMask" x={0} y={0} />

      <g mask="url(#ironwoodMask)">
        <motion.path
          id="mainPath" // Set id for GSAP animation
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
          id="picketsPath" // Set id for GSAP animation
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
