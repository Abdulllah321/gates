import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Pickets = ({
  isOpen,
  setIsOpen,
  width,
  selectedPicket: selectedMaterial,
  setSelectedPicket: setSelectedMaterial,
}) => {
  const handleMaterialSelection = (value) => {
    setSelectedMaterial({
      value,
      selected: value,
    });
  };

  const calculateValue = (selected, width) => {
    let value;
    let max, min;
    if (selected === 1) {
      value = 140;
      min = 140;
      max = 1020;
    } else if (selected === 2) {
      value = 175;
      min = 175;
      max = 1275;
    } else if (selected === 3) {
      value = 210;
      min = 210;
      max = 1530;
    } else {
      return (value = 0);
    }

    const adjustedVal = value + ((max - min) * (width - 36)) / (256 - 36);
    return Math.round(adjustedVal);
  };

  return (
    <div>
      {/* Existing Picket Options */}
      <div className="relative mb-1 text-center mt-9">
        <div className="absolute top-1.5 left-2 font-medium text-c-green">
          +{calculateValue(selectedMaterial.selected, width)}
        </div>
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">4</span>
          Fill Material & Patterns
        </div>
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
            onClick={() => setIsOpen({ ...isOpen, pickets: !isOpen.pickets })}
          >
            <div
              className={`${
                isOpen.pickets ? "!bg-c-blue" : ""
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
                  isOpen.pickets ? "text-c-0" : "text-c-blue"
                } h-[1.6rem] w-[1.6rem]  transition-colors md:hover:text-c-0`}
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
      </div>

      <div className="grid grid-cols-4">
        {/* Material Options */}
        {[
          "Cedar Wood",
          "Treated Pine White",
          "Redwood",
          "Hardwood Southern",
        ].map((material, index) => (
          <label
            key={index}
            className={`${
              selectedMaterial.selected === index + 1
                ? "selected"
                : "unselected"
            } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all whitespace-nowrap`}
          >
            <input
              type="radio"
              name="material"
              value={index + 1}
              checked={selectedMaterial.selected === index + 1}
              onChange={() => handleMaterialSelection(index + 1)}
            />
            {material}
          </label>
        ))}
      </div>

      {/* Sub-category Options */}
      <AnimatePresence>
        {isOpen.pickets && (
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
            className="pl-4 pr-1 text-left rounded-b-md bg-c-50 md:mx-2"
            style={{}}
          >
            <div className="pb-2">
              <ul className="mt-2">
                <li>
                  <div className="marker">
                    <strong>Space or no space:</strong> Decide whether to have
                    spacing between material or flush fit.
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <strong>Tongue or Groove:</strong> Available for wood
                    options.
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <strong>Non-Wood Options:</strong>
                    <ul>
                      <li>Stainless steel wire @ 4”</li>
                      <li>Acrylic panels with/without privacy tint</li>
                      <li>Tempered glass with/without privacy tint</li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <strong>Metal Frame:</strong> Mandatory for all selections.
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <strong>Finish:</strong> Choose between paint or powder
                    coat.
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

export default Pickets;
