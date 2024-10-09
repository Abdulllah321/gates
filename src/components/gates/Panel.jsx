import React from "react";
import { AnimatePresence, motion } from "framer-motion";

// Panel Component
const Panel = ({ panelValue, setPanelValue, isOpen, setIsOpen, isSwing , isSlide}) => {
  const handlePanelSelection = (value) => {
    setPanelValue({ ...panelValue, selected: value });
  };

  const handleDirectionSelection = (direction) => {
    setPanelValue({ ...panelValue, direction });
  };

  return (
    <>
      {(isSwing || isSlide) && (
        <div className="mt-9">
          {/* Panel Header */}
          <div className="relative mb-1 text-center">
            <div className="absolute top-1.5 left-2 font-medium text-c-green">
              +{panelValue?.selected}
            </div>
            <div className="text-2xl font-bold">
              <span className="pr-2.5 text-lg font-semibold text-c-blue">
                3
              </span>
              Panels
            </div>
            <button
              type="button"
              className="absolute top-1.5 right-0 rounded-full px-2 text-xl font-bold"
              onClick={() => setIsOpen({ ...isOpen, panel: !isOpen.panel })}
            >
              <div
                className={`inline-block rounded-full transition-colors ${
                  isOpen.panel && "bg-c-blue"
                }`}
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-[1.6rem] w-[1.6rem] transition-colors ${
                    isOpen.panel ? "text-c-0" : "text-c-blue"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>

          {/* Panel Selection */}
          <div
            className="grid grid-cols-2 "
            style={{
              background:
                "linear-gradient(90deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 10%, rgb(243, 244, 246) 90%, rgba(243, 244, 246, 0) 100%)",
            }}
          >
            {["Single", "Dual"].map((type, idx) => (
              <label
                key={type}
                className={`cursor-pointer h-9 px-0 transition-all ${
                  panelValue.selected === idx ? "selected" : "unselected"
                } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
              >
                <input
                  type="radio"
                  name="panels"
                  value={idx}
                  checked={panelValue.selected === idx}
                  onChange={() => handlePanelSelection(idx)}
                />{" "}
                {type} {isSwing ? "Swing" : isSlide ? "Slide" : ""}
              </label>
            ))}
          </div>
          <AnimatePresence>
            {/* Direction Selection (Only for Solo) */}
            {panelValue.selected === 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                transition={{
                  duration: 3,
                  type: "spring",
                  stiffness: 100,
                  damping: 5,
                }}
                className="mt-4 text-center"
              >
                <div className="mb-2 font-medium">
                  Select Direction for Solo Panel:
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["Left to Right", "Right to Left"].map((direction, idx) => (
                    <label
                      key={direction}
                      className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                        panelValue.direction === direction
                          ? "selected"
                          : "unselected"
                      }`}
                    >
                      <input
                        type="radio"
                        name="direction"
                        value={direction.toLowerCase().replace(/\s+/g, "-")}
                        checked={panelValue.direction === direction}
                        onChange={() => handleDirectionSelection(direction)}
                      />
                      {direction}
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Info */}
          <AnimatePresence>
            {isOpen.panel && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                }}
                transition={{
                  duration: 3,
                  type: "spring",
                  stiffness: 100,
                  damping: 5,
                }}
                className="pl-4 pr-1 overflow-hidden text-left rounded-b-md bg-c-50 md:mx-2"
              >
                <div className="pb-2">
                  <div className="py-2 text-lg font-semibold text-center">
                    Steel thick enough to screw into
                  </div>
                  <hr />
                  <ul className="mt-2">
                    <li>
                      <strong>Solo:</strong> Gate opens from the side. 10ft+
                      wide panels ship in 2 bolt connectable sections.
                    </li>
                    <li>
                      <strong>Dual:</strong> Gate opens from the center.
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Panel;
