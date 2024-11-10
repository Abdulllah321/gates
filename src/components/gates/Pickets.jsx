import React, { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineTerminal } from "react-icons/md";

const types = [
  {
    name: "Spaced Small",
    options: ["Wide Plank", "Skinny Plank"],
  },
  {
    name: "Spaced Large",
    options: ["Wide Plank", "Skinny Plank"],
  },
  {
    name: "Filled Offset",
    options: ["Wide", "Skinny"],
  },
  {
    name: "Filled Even",
    options: ["Wide", "Skinny"],
  },
  { name: "Boxed", options: ["Large", "Small"] },
  { name: "Chevron", options: ["Wide", "Skinny"] },
  { name: "Attention", options: ["Wide", "Skinny"] },
  { name: "Vertical", options: ["Wide", "Skinny"] },
  { name: "Woven", options: ["Wide Only"] },
];
const Pickets = ({
  isOpen,
  setIsOpen,
  width,
  selectedPicket: selectedMaterial,
  setSelectedPicket: setSelectedMaterial,
}) => {
  const handleMaterialSelection = useCallback(
    (value) => {
      // Update selected material only if the value is different
      if (selectedMaterial.selected !== value) {
        setSelectedMaterial((prevState) => ({
          ...prevState,
          selected: value,
          material: 0, // Reset material selection when a new material is selected
        }));
      }
    },
    [selectedMaterial.selected, setSelectedMaterial]
  );

  const handleMaterialSelectionMaterial = useCallback(
    (value) => {
      // Update material only if it's different from the current selection
      if (selectedMaterial.material !== value) {
        setSelectedMaterial((prevState) => ({
          ...prevState,
          material: value,
        }));
      }
    },
    [selectedMaterial.material, setSelectedMaterial]
  );
  const handleMaterialSelectionType = useCallback(
    (value) => {
      if (selectedMaterial.type !== value) {
        setSelectedMaterial((prevState) => ({
          ...prevState,
          type: value,
        }));
      }
    },
    [selectedMaterial.type, setSelectedMaterial]
  );

  const handleMaterialSelectionOption = useCallback(
    (value) => {
      if (selectedMaterial.option !== value) {
        setSelectedMaterial((prevState) => ({
          ...prevState,
          option: value,
        }));
      }
    },
    [selectedMaterial.option, setSelectedMaterial]
  );

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

      <div className="flex flex-wrap w-full">
        {[
          "Pine",
          "Composite Board",
          "Hardwood",
          "Cedar",
          "Acrylic",
          "Tubing",
          "Wire55",
        ].map((material, index) => (
          <label
            key={index}
            className={`${
              selectedMaterial.selected === index + 1
                ? "selected"
                : "unselected"
            } cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all flex items-center justify-center flex-1`}
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

      {selectedMaterial?.selected !== 0 && (
        <div className="flex flex-wrap w-full mt-2 space-x-4">
          {["Inlay", "Flush"].map((material, index) => (
            <label
              key={index}
              className={`${
                selectedMaterial.material === index + 1
                  ? "selected"
                  : "unselected"
              } cursor-pointer select-none  border-2  border-c-300 px-0 transition-all flex items-center justify-center flex-1 rounded-md py-1`}
            >
              <input
                type="radio"
                name="material"
                value={index + 1}
                checked={selectedMaterial.material === index + 1}
                onChange={() => handleMaterialSelectionMaterial(index + 1)}
              />
              {material}
            </label>
          ))}
        </div>
      )}
      {(selectedMaterial?.material === 1 ||
        selectedMaterial?.material === 2) && (
        <>
          <hr className="my-2" />
          <div className="flex flex-wrap w-full mt-2 space-x-3">
            {types.map((material, index) => (
              <label
                key={index}
                className={`${
                  selectedMaterial.type === material.name
                    ? "selected"
                    : "unselected"
                } cursor-pointer select-none border-2  border-c-300  transition-all flex items-center justify-center flex-1 rounded-md !py-1 whitespace-nowrap px-2 mt-1`}
              >
                <input
                  type="radio"
                  name="material"
                  value={index + 1}
                  checked={selectedMaterial.type === material.name}
                  onChange={() => handleMaterialSelectionType(material.name)}
                />
                {material.name}
              </label>
            ))}
          </div>
          <hr className="my-2" />
        </>
      )}
      {(selectedMaterial?.material === 1 || selectedMaterial?.material === 2) &&
        selectedMaterial?.type && (
          <>
            <div className="flex flex-wrap w-full mt-2 space-x-3 space-y-2">
              {types
                .filter((type) => type.name === selectedMaterial.type)
                .map((material, index) => (
                  <div className="flex flex-wrap w-full ">
                    {material.options.map((option, index) => (
                      <label
                        key={index}
                        className={`${
                          selectedMaterial.option === option
                            ? "selected"
                            : "unselected"
                        } cursor-pointer select-none border-2  border-c-300  transition-all flex items-center justify-center flex-1 rounded-md!py-1 whitespace-nowrap px-2`}
                      >
                        <input
                          type="radio"
                          name="material"
                          value={index + 1}
                          checked={selectedMaterial.option === option}
                          onChange={() => handleMaterialSelectionOption(option)}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ))}
            </div>
            <hr className="my-2" />
          </>
        )}

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
          >
            <div className="pb-2">
              <ul className="mt-2">
                <li>
                  <strong>Space or no space:</strong> Decide whether to have
                  spacing between material or flush fit.
                </li>
                <li>
                  <strong>Tongue or Groove:</strong> Available for wood options.
                </li>
                <li>
                  <strong>Non-Wood Options:</strong> Stainless steel wire @ 4” /
                  Acrylic panels with/without privacy tint / Tempered glass
                  with/without privacy tint.
                </li>
                <li>
                  <strong>Metal Frame:</strong> Mandatory for all selections.
                </li>
                <li>
                  <strong>Finish:</strong> Choose between paint or powder coat.
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
