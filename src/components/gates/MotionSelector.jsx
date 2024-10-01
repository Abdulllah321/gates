import React, { useState } from "react";

const MotionSelector = ({ selectedMotion, setSelectedMotion }) => {
  const handleSelection = (value) => {
    setSelectedMotion({
      ...selectedMotion, // Spread the current state to keep other properties
      selected: value, // Update only the `selected` property
    });
  };

  return (
    <>
      {" "}
      <div className="relative mb-1 text-center mt-9">
        <div className="absolute top-1.5 left-2 font-medium text-c-green">
          +{selectedMotion.value}
        </div>{" "}
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">2</span>
          Kit
        </div>{" "}
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
          >
            <div className="false mb-[-3px] inline-block rounded-full transition-colors md:hover:bg-c-blue">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                className="false h-[1.6rem] w-[1.6rem] text-c-blue transition-colors md:hover:text-c-0"
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
        className="grid grid-cols-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 10%, rgb(243, 244, 246) 90%, rgba(243, 244, 246, 0) 100%)",
        }}
      >
        {/* None Option */}
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
        </label>

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
    </>
  );
};

export default MotionSelector;
