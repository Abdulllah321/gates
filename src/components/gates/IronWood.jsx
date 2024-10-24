import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IronWood = ({ selectedIronWood, setSelectedIronWood }) => {
  const [isOpen, setIsOpen] = useState({ ironWood: false });

  const handleSelection = (value) => {
    setSelectedIronWood({
      ...selectedIronWood,
      selected: value,
      subOption: null,
      color: null,
      finish: null,
    });
  };

  const handleSubOptionSelection = (subOption) => {
    setSelectedIronWood({
      ...selectedIronWood,
      subOption,
      color: null,
      finish: null,
    });
  };

  const handleColorSelection = (color) => {
    setSelectedIronWood({ ...selectedIronWood, color });
  };

  const handleFinishSelection = (finish) => {
    setSelectedIronWood({ ...selectedIronWood, finish });
  };
  console.log(selectedIronWood);
  return (
    <div className="mt-9">
      <div className="relative mb-4 text-center">
        <div className="text-2xl font-bold">
          {" "}
          <span className="pr-2.5 text-lg font-semibold text-c-blue">5</span>
          IronWood Options
        </div>
        <button
          type="button"
          className="absolute top-1.5 right-0 px-2 text-xl"
          onClick={() => setIsOpen({ ...isOpen, ironWood: !isOpen.ironWood })}
        >
          <div
            className={`inline-block transition-colors ${
              isOpen.ironWood ? "bg-blue-500" : ""
            }`}
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-6 w-6 transition-colors ${
                isOpen.ironWood ? "text-white" : "text-blue-500"
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

      {/* Main Option Selection (Metal Frame or Fill Material) */}
      <div className="grid grid-cols-2 gap-4">
        {["Metal Frame", "Fill Material"].map((type, idx) => (
          <label
            key={type}
            className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
              selectedIronWood.selected === idx ? "selected" : "unselected"
            }`}
          >
            <input
              type="radio"
              name="ironWood"
              value={idx}
              checked={selectedIronWood.selected === idx}
              onChange={() => handleSelection(idx)}
            />{" "}
            {type}
          </label>
        ))}
      </div>

      {/* Sub Option for Metal Frame (Paint or Powder Coat) */}
      <AnimatePresence>
        {selectedIronWood.selected === 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-4"
          >
            <div className="mb-2 font-medium text-center">
              Select Finish for Metal Frame:
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Paint", "Powder Coat"].map((option) => (
                <label
                  key={option}
                  className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                    selectedIronWood.subOption === option
                      ? "selected"
                      : "unselected"
                  }`}
                >
                  <input
                    type="radio"
                    name="metalFrameOption"
                    value={option}
                    checked={selectedIronWood.subOption === option}
                    onChange={() => handleSubOptionSelection(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Color and Finish Options for Metal Frame */}
            {selectedIronWood.subOption && (
              <div className="mt-4">
                <div className="mb-2 text-xl font-medium text-center">
                  Select Color:
                </div>
                <div className="grid grid-cols-5 gap-4 place-items-stretch">
                  {[
                    "Black",
                    "White",
                    "Gray",
                    "Silver",
                    "Bronze",
                    "Copper",
                    "Blue",
                    "Green",
                    "Red",
                  ].map((color) => (
                    <label
                      key={color}
                      style={{
                        backgroundColor:
                          selectedIronWood.color === color
                            ? color.toLowerCase() + "!important"
                            : "",
                      }}
                      className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                        selectedIronWood.color === color
                          ? "selected"
                          : "unselected"
                      }`}
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color}
                        checked={selectedIronWood.color === color}
                        onChange={() => handleColorSelection(color)}
                      />
                      {color}
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="mb-2 text-xl font-medium text-center">
                    Select Finish:
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {["Flat", "Glossy"].map((finish) => (
                      <label
                        key={finish}
                        className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                          selectedIronWood.finish === finish
                            ? "selected"
                            : "unselected"
                        }`}
                      >
                        <input
                          type="radio"
                          name="finish"
                          value={finish}
                          checked={selectedIronWood.finish === finish}
                          onChange={() => handleFinishSelection(finish)}
                        />
                        {finish}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedIronWood.selected === 1 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-4"
          >
            <div className="mb-2 font-medium text-center">
              Select Color for Fill Material:
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Wood", "Oak"].map((color) => (
                <label
                  key={color}
                  style={{
                    backgroundColor:
                      selectedIronWood.color === color
                        ? `${color.toLowerCase()} !important`
                        : "",
                  }}
                  className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                    selectedIronWood.color === color ? "selected" : "unselected"
                  }`}
                >
                  <input
                    type="radio"
                    name="fillMaterialColor"
                    value={color}
                    checked={selectedIronWood.color === color}
                    onChange={() => handleColorSelection(color)}
                  />
                  {color}
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IronWood;
