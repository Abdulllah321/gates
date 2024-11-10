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
      finish: null, // Reset finish
      painted: null, // Reset painted
    });
  };

  const handleSubOptionSelection = (subOption) => {
    setSelectedIronWood({
      ...selectedIronWood,
      subOption,
      color: null,
      finish: null,
      painted: null, // Reset painted when subOption changes
    });
  };

  const handleColorSelection = (color) => {
    setSelectedIronWood({ ...selectedIronWood, color });
  };

  const handleFinishSelection = (finish) => {
    setSelectedIronWood({ ...selectedIronWood, finish });
  };

  const handlePaintedSelection = (painted) => {
    setSelectedIronWood({ ...selectedIronWood, painted });
  };

  return (
    <div className="mt-9">
      <div className="relative mb-4 text-center">
        <div className="text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">5</span>
          IronWood Options
        </div>
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
            />
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
              Select Fill Material Type:
            </div>
            <div className="grid grid-cols-2 gap-4">
              {["Stain", "Weather Proof"].map((option) => (
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
                    name="fillMaterialOption"
                    value={option}
                    checked={selectedIronWood.subOption === option}
                    onChange={() => handleSubOptionSelection(option)}
                  />
                  {option}
                </label>
              ))}
            </div>

            {/* Stain Color Options */}
            {selectedIronWood.subOption === "Stain" && (
              <div className="mt-4">
                <div className="mb-2 text-xl font-medium text-center">
                  Select Color for Stain:
                </div>
                <div className="grid grid-cols-5 gap-4 place-items-stretch">
                  {["Oak", "Cherry", "Walnut", "Mahogany", "Pine"].map(
                    (color) => (
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
                    )
                  )}
                </div>
              </div>
            )}

            {/* Weather Proof Finish Options */}
            {selectedIronWood.subOption === "Weather Proof" && (
              <div className="mt-4">
                <div className="mb-2 text-xl font-medium text-center">
                  Select Weather Proof Finish:
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {["No Finish", "Finish"].map((option, idx) => (
                    <label
                      key={option}
                      className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                        selectedIronWood.finish === (idx === 0)
                          ? "selected"
                          : "unselected"
                      }`}
                    >
                      <input
                        type="radio"
                        name="finish"
                        value={option}
                        checked={selectedIronWood.finish === (idx === 0)}
                        onChange={() => handleFinishSelection(idx === 0)}
                      />
                      {option}
                    </label>
                  ))}
                </div>

                {/* Additional Finish Option for Weather Proof */}
                {selectedIronWood.subOption === "Weather Proof" &&
                  selectedIronWood.finish && (
                    <div className="mt-4">
                      <div className="mb-2 font-medium text-center">
                        Is it Painted?
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {["Yes", "No"].map((option, idx) => (
                          <label
                            key={option}
                            className={`cursor-pointer px-4 py-2 border rounded-lg transition-all ${
                              selectedIronWood.painted === (idx === 0)
                                ? "selected"
                                : "unselected"
                            }`}
                          >
                            <input
                              type="radio"
                              name="painted"
                              value={idx === 0}
                              checked={selectedIronWood.painted === (idx === 0)}
                              onChange={() => handlePaintedSelection(idx === 0)}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                {selectedIronWood.subOption === "Weather Proof" &&
                  selectedIronWood.finish &&
                  selectedIronWood.painted && (
                    <div className="mt-4">
                      <div className="mb-2 font-medium text-center">
                        Please Choose Color
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
                          "Brown"
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
                    </div>
                  )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IronWood;
