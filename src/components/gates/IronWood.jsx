import React from "react";import { AnimatePresence, motion } from "framer-motion";


const IronWood = ({
  selectedIronWood,
  setSelectedIronWood,
  isOpen,
  setIsOpen,
}) => {
  const handleSelection = (value) => {
    setSelectedIronWood({
      ...selectedIronWood, // Preserve the existing state properties
      selected: value, // Update only the selected option
    });
  };

  return (
    <div>
      <div className="relative mb-1 text-center mt-9">
        <div className="absolute top-1.5 left-2 font-medium text-c-green">
          +95
        </div>{" "}
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">6</span>
          Ironwood
        </div>{" "}
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
            onClick={() => setIsOpen({ ...isOpen, ironWood: !isOpen.ironWood })}
          >
            <div
              className={`${
                isOpen.ironWood ? "!bg-c-blue" : ""
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
                  isOpen.ironWood ? "text-c-0" : "text-c-blue"
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
      </div>{" "}
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
            selectedIronWood.selected === 0 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="ironwood"
            value={0}
            checked={selectedIronWood.selected === 0}
            onChange={() => handleSelection(0)}
          />
          None
        </label>

        {/* Vertical Option */}
        <label
          className={`${
            selectedIronWood.selected === 1 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="ironwood"
            value={1}
            checked={selectedIronWood.selected === 1}
            onChange={() => handleSelection(1)}
          />
          Vertical
        </label>

        {/* Horizontal Option */}
        <label
          className={`${
            selectedIronWood.selected === 2 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="ironwood"
            value={2}
            checked={selectedIronWood.selected === 2}
            onChange={() => handleSelection(2)}
          />
          Horizontal
        </label>

        {/* DIY Option */}
        <label
          className={`${
            selectedIronWood.selected === 3 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="ironwood"
            value={3}
            checked={selectedIronWood.selected === 3}
            onChange={() => handleSelection(3)}
          />
          DIY
        </label>
      </div>
   <AnimatePresence>
        {isOpen.ironWood && (
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
            }}          className="pl-4 pr-1 text-left rounded-b-md bg-c-50 md:mx-2"
          style={{}}
        >
          <div className="pb-2">
            <div className="py-2 text-lg font-semibold text-center capitalize">
              The perfect wood for any gate
            </div>{" "}
            <hr />{" "}
            <ul className="mt-2">
              <li>
                <div className="marker">
                  <p>
                    <strong>None:</strong> A light weight timeless option.
                  </p>
                </div>
              </li>
              <li>
                <div className="marker">
                  <p>
                    <strong>Vertical:</strong> Match-all sustainable hardwood
                    vertically attached to the face of each ironWood.
                  </p>
                </div>
              </li>
              <li>
                <div className="marker">
                  <p>
                    <strong>Horizontal:</strong> Match-all sustainable hardwood
                    horizontally attached to the face of each ironWood.
                  </p>
                </div>
              </li>
              <li>
                <div className="marker">
                  <p>
                    <strong>DIY:</strong> Do it yourself. Perfect if you plan on
                    adding your own wood.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>)}
      </AnimatePresence>
    </div>
  );
};

export default IronWood;
