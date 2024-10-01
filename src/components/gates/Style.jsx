import React, { useState } from "react";

const Style = ({ selectedStyle, setSelectedStyle }) => {
  const handleSelection = (value) => {
    setSelectedStyle({
      ...selectedStyle, // Retain the current state
      selected: value, // Update the selected property
    });
  };

  return (
    <div>
      <div className="relative mb-1 text-center mt-9">
        <div className="absolute top-1.5 left-2 font-medium text-c-green">
          +972
        </div>
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">4</span>
          Style
        </div>
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
          None
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

        {/* Finials Option */}
        <label
          className={`${
            selectedStyle.selected === 2 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={2}
            checked={selectedStyle.selected === 2}
            onChange={() => handleSelection(2)}
          />
          Finials
        </label>

        {/* Both Option */}
        <label
          className={`${
            selectedStyle.selected === 3 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="style"
            value={3}
            checked={selectedStyle.selected === 3}
            onChange={() => handleSelection(3)}
          />
          Both
        </label>
      </div>

      <style jsx>{`
        .selected {
          background-color: #e0f7fa;
          border-color: #00bcd4;
        }
        .unselected {
          background-color: transparent;
          border-color: #e0e0e0;
        }
      `}</style>
    </div>
  );
};

export default Style;
