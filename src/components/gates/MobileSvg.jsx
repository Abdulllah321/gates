import React, { useContext, useEffect } from "react";
import FirstSvg from "./FirstSvg";
import { motion, AnimatePresence } from "framer-motion";
import { GatesContext } from "../GatesContext";
import { useSearchParams } from "next/navigation";
import AutoManIcon from "./AutomanIcon";
import { GsapAnimation } from "../triggerGsapAnimation";

const MobileSvg = () => {
  const { width, ft, inch } = useContext(GatesContext);
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const currentWidth = width - 36;

  const isSwing = sku && sku[1] === "1";

  useEffect(() => {
    GsapAnimation("#HDim path:nth-child(1)", {
      d: `M ${95 - currentWidth * 0.5} 40, ${95 - currentWidth * 0.5} 11`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#HDim path:nth-child(2)", {
      d: `M ${95 - currentWidth * 0.5} 84, ${95 - currentWidth * 0.5} 55`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#HDim path:nth-child(3)", {
      d: `M ${92 - currentWidth * 0.5} 11, ${98 - currentWidth * 0.5} 11`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#HDim path:nth-child(4)", {
      d: `M ${92 - currentWidth * 0.5} 84, ${98 - currentWidth * 0.5} 84`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#HDim text", {
      x: 95 - currentWidth * 0.5,
      ease: "power1.inOut",
      duration: 1,
    });

    GsapAnimation("#VMD path:nth-child(1)", {
      d: isSwing
        ? `M ${138 + currentWidth * 0.5} 3, 139.5 3`
        : `M ${143 + currentWidth * 0.5} 3, 139.5 3`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMD path:nth-child(2)", {
      d: isSwing
        ? `M 107 3, ${113 - currentWidth * 0.5} 3`
        : `M 107 3, ${104 - currentWidth * 0.5} 3`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMD path:nth-child(3)", {
      d: isSwing
        ? `M ${113 - currentWidth * 0.5} 0, ${113 - currentWidth * 0.5} 6`
        : `M ${104 - currentWidth * 0.5} 0, ${104 - currentWidth * 0.5} 6`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMD path:nth-child(4)", {
      d: isSwing
        ? `M ${138 + currentWidth * 0.5} 0, ${138 + currentWidth * 0.5} 6`
        : `M ${143 + currentWidth * 0.5} 0, ${143 + currentWidth * 0.5} 6`,
      ease: "power1.inOut",
      duration: 1,
    });

    GsapAnimation("#VMT path:nth-child(1)", {
      d: `M ${143 + currentWidth * 0.5} 3, 139.5 3`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMT path:nth-child(2)", {
      d: `M 107 3, ${104 - currentWidth * 0.5} 3`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMT path:nth-child(3)", {
      d: `M ${104 - currentWidth * 0.5} 0, ${104 - currentWidth * 0.5} 6`,
      ease: "power1.inOut",
      duration: 1,
    });
    GsapAnimation("#VMT path:nth-child(4)", {
      d: `M ${143 + currentWidth * 0.5} 0, ${143 + currentWidth * 0.5} 6`,
      ease: "power1.inOut",
      duration: 1,
    });
  }, [currentWidth, isSwing]);

  function calculateDimensions(width) {
    // Minimum and maximum width
    const minWidth = 36;
    const maxWidth = 256;

    // Ensure the width is in the valid range
    if (width < minWidth || width > maxWidth) {
      throw new Error(`Width must be between ${minWidth} and ${maxWidth}`);
    }

    // Conversion factor for feet per inch based on the range
    const totalInchesAtMax = 20 * 12 + 3; // 20 feet 3 inches at 256 width
    const totalInchesAtMin = 1 * 12 + 11; // 1 foot 11 inches at 36 width

    // Calculate total inches for the given width based on linear interpolation
    const totalInches =
      totalInchesAtMin +
      ((width - minWidth) / (maxWidth - minWidth)) *
        (totalInchesAtMax - totalInchesAtMin);

    // Convert total inches back to feet and inches
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    return `${feet}' ${inches}"`;
  }

  return (
    <div
      className="sticky top-[45px] z-[9] rounded-br-lg rounded-bl-lg pb-1 backdrop-blur md:hidden"
      style={{ backgroundColor: "rgba(255,255,255,.6)" }}
    >
      <div className="relative mx-auto" id="sketch-main-2">
        <div id="sketch-scan">
          <FirstSvg />
          <div className="-mt-3 md:-mt-4">
            <AnimatePresence>
              {isSwing && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="mb-1"
                >
                  <svg
                    viewBox="-1 -1 250 8"
                    xmlns="http://www.w3.org/2000/svg"
                    id="VMT"
                  >
                    <g
                      className="stroke-current text-c-1000"
                      fill="none"
                      strokeWidth="0.75"
                    >
                      {/* Using dynamic width */}
                      <path d={`M ${143 + currentWidth * 0.5} 3, 139.5 3`} />
                      <path d={`M 107 3, ${104 - currentWidth * 0.5} 3`} />
                      <path
                        d={`M ${104 - currentWidth * 0.5} 0, ${
                          104 - currentWidth * 0.5
                        } 6`}
                        strokeLinecap="round"
                      />
                      <path
                        d={`M ${143 + currentWidth * 0.5} 0, ${
                          143 + currentWidth * 0.5
                        } 6`}
                        strokeLinecap="round"
                      />
                    </g>
                    <text
                      className="text-[9px] font-medium text-c-1000 md:text-[6px]"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      x="49.6%"
                      y={4}
                    >
                      {ft}&apos; {inch}&quot;
                    </text>
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
            <svg
              viewBox="-1 -1 250 8"
              xmlns="http://www.w3.org/2000/svg"
              id="VMD"
            >
              <g
                className="stroke-current text-c-1000"
                fill="none"
                strokeWidth="0.75"
              >
                <path d={`M ${138 + currentWidth * 0.5} 3, 139.5 3`} />
                <path d={`M 107 3, ${113 - currentWidth * 0.5} 3`} />
                <path
                  d={`M ${113 - currentWidth * 0.5} 0, ${
                    113 - currentWidth * 0.5
                  } 6`}
                  strokeLinecap="round"
                />
                <path
                  d={`M ${138 + currentWidth * 0.5} 0, ${
                    138 + currentWidth * 0.5
                  } 6`}
                  strokeLinecap="round"
                />
              </g>
              <text
                className="text-[9px] font-medium text-c-1000 md:text-[6px]"
                dominantBaseline="middle"
                textAnchor="middle"
                x="49.6%"
                y={4}
              >
                {isSwing ? calculateDimensions(width) : `${ft}' ${inch}"`}
              </text>
            </svg>
          </div>
          <svg
            viewBox="-1 -1 248 96"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0"
            id="HDim"
          >
            <g
              className="stroke-current text-c-1000"
              fill="none"
              strokeWidth="0.75"
            >
              <path
                d={`M ${95 - currentWidth * 0.5} 40, ${
                  95 - currentWidth * 0.5
                } 11`}
              />
              <path
                d={`M ${95 - currentWidth * 0.5} 84, ${
                  95 - currentWidth * 0.5
                } 55`}
              />
              <path
                d={`M ${92 - currentWidth * 0.5} 11, ${
                  98 - currentWidth * 0.5
                } 11`}
                strokeLinecap="round"
              />
              <path
                d={`M ${92 - currentWidth * 0.5} 84, ${
                  98 - currentWidth * 0.5
                } 84`}
                strokeLinecap="round"
              />
            </g>
            <text
              className="text-[9px] font-medium text-c-1000 md:text-[6px]"
              dominantBaseline="middle"
              textAnchor="middle"
              x={95 - currentWidth * 0.5}
              y="50%"
            >
              6&apos;
            </text>
          </svg>
          <AutoManIcon />
        </div>
      </div>
    </div>
  );
};

export default MobileSvg;
