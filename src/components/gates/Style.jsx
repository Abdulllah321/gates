import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Style = ({
  selectedStyle,
  setSelectedStyle,
  isOpen,
  setIsOpen,
  width,
}) => {
  const handleSelection = (value) => {
    setSelectedStyle({
      selected: value,
    });
  };

 

  const handlePositionSelection = (position) => {
    setSelectedStyle({ ...selectedStyle, position });
  };

  return (
    <div>
      <div className="relative mb-1 text-center mt-9">
        
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">2</span>
          Style
        </div>
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
            onClick={() => setIsOpen({ ...isOpen, style: !isOpen.style })}
          >
            <div
              className={`${
                isOpen.style ? "!bg-c-blue" : ""
              } mb-[-3px] inline-block rounded-full transition-colors md:hover:bg-c-blue`}
            >
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                className={`${
                  isOpen.style ? "text-c-0" : "text-c-blue"
                } h-[1.6rem] w-[1.6rem]  transition-colors md:hover:text-c-0`}
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-4"
        style={{
          background:
            "linear-gradient(90deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 10%, rgb(243, 244, 246) 90%, rgba(243, 244, 246, 0) 100%)",
        }}
      >
        {/* None Option */}
        <label
          className={`${
            selectedStyle.selected === 0 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={0}
            checked={selectedStyle.selected === 0}
            onChange={() => handleSelection(0)}
          />
          Rectangular
        </label>

        {/* Arch Option */}
        <label
          className={`${
            selectedStyle.selected === 1 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={1}
            checked={selectedStyle.selected === 1}
            onChange={() => handleSelection(1)}
          />
          Arch
        </label>

        {/* Center Peak Option */}
        <label
          className={`${
            selectedStyle.selected === 4 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={4}
            checked={selectedStyle.selected === 4}
            onChange={() => handleSelection(4)}
          />
          Center Peak
        </label>

        {/* Sectional Option */}
        <label
          className={`${
            selectedStyle.selected === 5 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-500 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={5}
            checked={selectedStyle.selected === 5}
            onChange={() => handleSelection(5)}
          />
          Sectional
        </label>
      </div>

      <AnimatePresence>
        {/* Direction Selection (Only for Solo) */}
        {selectedStyle.selected === 5 && (
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
            <div className="mb-2 font-medium">Select Position Sectional:</div>
            <div className="grid grid-cols-2 gap-4">
              {["top", "bottom"].map((position) => (
                <label
                  key={position}
                  className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                    selectedStyle.position === position
                      ? "selected"
                      : "unselected"
                  }`}
                >
                  <input
                    type="radio"
                    name="position"
                    value={position}
                    checked={selectedStyle.position === position}
                    onChange={() => handlePositionSelection(position)}
                    className="capitalize"
                  />
                  {position}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen.style && (
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
            style={{}}
          >
            <div className="pb-2">
              <div className="py-2 text-lg font-semibold text-center capitalize">
                Classic styles on modern gates
              </div>{" "}
              <hr />{" "}
              <ul className="mt-2">
                <li>
                  <div className="marker">
                    <p>
                      <strong>None:</strong> Sometimes a flat top is all you
                      need.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Arch:</strong> Rounds the shoulders of your gate
                      down approximately 1ft for a luxurious sunrise shape.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Finials:</strong> Makes your gate even more
                      intimidating. Adds 2 inches to the total height.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Both:</strong> There&aspos;s nothing more stylish
                      than an arch with finials.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Style;
