import React, { useState, useRef, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { GatesContext } from "./GatesContext";

const ToggleGateFence = () => {
  const { selectedType, setSelectedType } = useContext(GatesContext);
  const [dimensions, setDimensions] = useState({
    width: 0,
    left: 0,
    height: 0,
  });

  const gateRef = useRef(null);
  const fenceRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      const ref = selectedType === "gate" ? gateRef.current : fenceRef.current;
      const container = containerRef.current;
      if (ref && container) {
        const { width, left, height } = ref.getBoundingClientRect();
        const containerLeft = container.getBoundingClientRect().left;
        setDimensions({ width, left: left - containerLeft, height });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selectedType]);

  const handleToggle = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Container for buttons */}
      <div
        className="relative flex items-center justify-center p-4"
        ref={containerRef}
      >
        {/* Moveable background div */}
        <motion.div
          className="absolute rounded-md bg-c-prime-light"
          style={{
            width: dimensions.width,
            left: dimensions.left,
            height: dimensions.height,
          }}
          initial={false}
          animate={{
            left: dimensions.left,
            width: dimensions.width,
            height: dimensions.height,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />

        {/* Gate Button */}
        <button
          ref={gateRef}
          onClick={() => handleToggle("gate")}
          className={`relative z-10 px-24 py-2 text-lg font-semibold transition-all duration-300 transform ${
            selectedType === "gate"
              ? "bg-c-prime shadow-lg scale-105"
              : "bg-transparent  hover:scale-105"
          }`}
        >
          Gate
        </button>

        {/* Fence Button */}
        <button
          ref={fenceRef}
          onClick={() => handleToggle("fence")}
          className={`relative z-10 px-24 py-2 text-lg font-semibold transition-all duration-300 transform ${
            selectedType === "fence"
              ? "bg-c-prime shadow-lg scale-105"
              : "bg-transparent  hover:scale-105"
          }`}
        >
          Fence
        </button>
      </div>
    </div>
  );
};

export default ToggleGateFence;
