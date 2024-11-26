import React, { useContext, useState } from "react";
import { GatesContext } from "../GatesContext";

const VerticalRangeInput = ( { className , style}) => {
  const { height, setHeight } = useContext(GatesContext);

  return (
    <label
      className={`relative top-[70px] left-0 z-50 flex items-center h-full md:-top-[80px]  ${className}`}
      style={style}
    >
      {/* Custom Vertical Range Input */}
      <div className="relative flex flex-col items-center -rotate-90">
        <input
          type="range"
          name="height"
          min={4}
          max={8}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="border-t border-b border-gray-400 w-full !h-3 bg-gray-100 outline-none appearance-none range-slider focus:ring-2 focus:ring-c-prime-light hover:bg-c-prime relative"
        />
        {/* Custom Thumb */}
        <style jsx>{`
          .range-slider::-webkit-slider-thumb {
            appearance: none;
            width: 30px;
            height: 26px;
            border-radius: 4px;
            background-color: #94a836;
            border: 2px solid #94a836;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            cursor: row-resize;
            transition: background-color 0.3s ease;
          }

          .range-slider::-moz-range-thumb {
            appearance: none;
            width: 24px;
            height: 24px;
            background-color: #94a836;
            border: 2px solid #94a836;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
        `}</style>
      </div>
    </label>
  );
};

export default VerticalRangeInput;