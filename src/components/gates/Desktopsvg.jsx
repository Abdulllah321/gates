import React, { Suspense, useContext, useEffect } from "react";
import FirstSvg from "./FirstSvg";
import AutoManIcon from "./AutomanIcon";
import { GatesContext } from "../GatesContext";
import { GsapAnimation } from "../triggerGsapAnimation";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

const Desktopsvg = () => {
  const { width, ft, inch } = useContext(GatesContext);
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const currentWidth = width - 36;
  const direction = searchParams.get("direction");
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  const isLeft = direction === "Left to Right";
  const isSolo = sku && sku[2] === "0";

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

    GsapAnimation("#arrow path:nth-child(1)", {
      d: `M${150 - width / 2} 50 L${150 + width / 2} 50`,
    });
    GsapAnimation("#arrow path:nth-child(2)", {
      d: isLeft
        ? `M${150 + width / 2 - 20} 40 L${150 + width / 2} 50 L${
            150 + width / 2 - 20
          } 60`
        : `M${150 - width / 2 + 20} 40 L${150 - width / 2} 50 L${
            150 - width / 2 + 20
          } 60`,
    });
  }, [currentWidth, isSwing]);

  useEffect(() => {
    GsapAnimation(
      "#arrow path:nth-child(2)",
      {
        d: isLeft
          ? `M${150 + width / 2 - 20} 40 L${150 + width / 2} 50 L${
              150 + width / 2 - 20
            } 60`
          : `M${150 - width / 2 + 20} 40 L${150 - width / 2} 50 L${
              150 - width / 2 + 20
            } 60`,
      },
      { duration: 0.3, ease: "power1.inOut" }
    );
  }, [isLeft]);

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
    <Suspense>
      <div className="hidden col-span-2 row-span-1 mb-8 md:col-span-1 md:mt-0 md:mb-0 md:block md:pr-3 lg:pr-4">
        <div className="sticky top-14 md:top-28">
          <div className="h-40 sm:h-72 md:h-auto">
            <div className="relative mx-auto" id="sketch-main">
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
                            <path
                              d={`M ${143 + currentWidth * 0.5} 3, 139.5 3`}
                            />
                            <path
                              d={`M 107 3, ${104 - currentWidth * 0.5} 3`}
                            />
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
                </svg>{" "}
                <div className="relative">
                  <AnimatePresence>
                    {(isSolo && (isSwing || isSlide)) && (
                      <svg
                        viewBox="0 0 300 90"
                        xmlns="http://www.w3.org/2000/svg"
                        id="arrow"
                        className="absolute -top-[80px]"
                      >
                        {/* Horizontal Line centered on the x-axis */}
                        <motion.path
                          d={`M${150 - width / 2} 50 L${150 + width / 2} 50`}
                          stroke="black"
                          strokeWidth="1"
                          fill="none"
                          initial={{ pathLength: 0 }} // Start with no length
                          animate={{
                            pathLength: 1,
                            d: `M${150 - width / 2} 50 L${150 + width / 2} 50`,
                          }} // Animate to full length
                          exit={{ pathLength: 0 }} // Animate to full length
                          // transition={{ duration: 0.5, ease: "easeInOut" }} // Set the duration and easing
                        />

                        {/* Greater Than Arrow at the end of the line */}
                        <motion.path
                          d={
                            isLeft
                              ? `M${150 + width / 2 - 20} 40 L${
                                  150 + width / 2
                                } 50 L${150 + width / 2 - 20} 60`
                              : `M${150 - width / 2 + 20} 40 L${
                                  150 - width / 2
                                } 50 L${150 - width / 2 + 20} 60`
                          }
                          stroke="black"
                          strokeWidth="1"
                          fill="none"
                          initial={{ pathLength: 0 }} // Start with no length
                          animate={{
                            pathLength: 1,
                            d: isLeft
                              ? `M${150 + width / 2 - 20} 40 L${
                                  150 + width / 2
                                } 50 L${150 + width / 2 - 20} 60`
                              : `M${150 - width / 2 + 20} 40 L${
                                  150 - width / 2
                                } 50 L${150 - width / 2 + 20} 60`,
                          }} // Animate to full length
                          exit={{ pathLength: 0 }} // Start with no length
                        />
                      </svg>
                    )}
                  </AnimatePresence>
                </div>
                <AutoManIcon />
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Desktopsvg;
