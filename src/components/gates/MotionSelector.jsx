import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const MotionSelector = ({
  selectedMotion,
  setSelectedMotion,
  setIsOpen,
  isOpen,
  width,
  selectedType,
}) => {
  const handleSelection = (value) => {
    setSelectedMotion({
      selected: value,
    });
  };


  return (
    <>
      {" "}
      <div className="relative mb-1 text-center mt-9">
     
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold capitalize">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">1</span>
          Select {selectedType} Type
        </div>{" "}
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
            onClick={() =>
              setIsOpen({ ...isOpen, motionSelector: !isOpen.motionSelector })
            }
          >
            <div
              className={`${
                isOpen.motionSelector ? "!bg-c-blue" : ""
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
                  isOpen.motionSelector ? "text-c-0" : "text-c-blue"
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
        className="grid grid-cols-2"
        style={{
          background:
            "linear-gradient(90deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 10%, rgb(243, 244, 246) 90%, rgba(243, 244, 246, 0) 100%)",
        }}
      >
        {/* None Option
        <label
          className={`${
            selectedMotion.selected === 0 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="motion"
            value={0}
            checked={selectedMotion.selected === 0}
            onChange={() => handleSelection(0)}
          />{" "}
          None
        </label> */}

        {/* Swing Option */}
        <label
          className={`${
            selectedMotion.selected === 1 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="motion"
            value={1}
            checked={selectedMotion.selected === 1}
            onChange={() => handleSelection(1)}
          />{" "}
          Swing
        </label>

        {/* Slide Option */}
        <label
          className={`${
            selectedMotion.selected === 2 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="motion"
            value={2}
            checked={selectedMotion.selected === 2}
            onChange={() => handleSelection(2)}
          />{" "}
          Slide
        </label>
      </div>
      <AnimatePresence>
        {isOpen.motionSelector && (
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
                Our 2 most popular gate kits
              </div>{" "}
              <hr />{" "}
              <ul className="mt-2">
                <li>
                  <div className="marker">
                    <p>
                      <strong>Swing:</strong> Includes heavy duty hinges and 4x4
                      94 inch heavy/regular posts with caps. Swings open over
                      180 degrees without automation.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Slide:</strong> Includes V-wheels, V-track,
                      rollers, 4in posts, and stops. Arch/finial slide gates
                      will ship with one extra post per panel. Automatic slide
                      gates require 2ft/4ft of additional horizontal clearance
                      for gate tail(s).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MotionSelector;
