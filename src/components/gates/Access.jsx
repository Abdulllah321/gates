import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const PostSystem = ({
  selectedPostSystem,
  setSelectedPostSystem,
  isOpen,
  setIsOpen,
}) => {
  const handleSelection = (value) => {
    setSelectedPostSystem({
      value: calculateValue(),
      selected: value,
    });
  };

  function calculateValue() {
    let value = 0;
    if (selectedPostSystem.selected === 1) {
      value = 150;
    }
    if (selectedPostSystem.selected === 2) {
      value = 300;
    }
    return value;
  }

  return (
    <div>
      <div className="relative mb-1 text-center mt-9">
        <div className="absolute top-1.5 left-2 font-medium text-c-green">
          +{calculateValue()}
        </div>
        <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
          <span className="pr-2.5 text-lg font-semibold text-c-blue">6</span>
          Post System
        </div>
        <div className="absolute top-1.5 right-0">
          <button
            type="button"
            className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
            onClick={() =>
              setIsOpen({ ...isOpen, postSystem: !isOpen.postSystem })
            }
          >
            <div
              className={`${
                isOpen.postSystem ? "!bg-c-blue" : ""
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
                  isOpen.postSystem ? "text-c-0" : "text-c-blue"
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
        className="grid grid-cols-3"
        style={{
          background:
            "linear-gradient(90deg, rgba(243, 244, 246, 0) 0%, rgb(243, 244, 246) 10%, rgb(243, 244, 246) 90%, rgba(243, 244, 246, 0) 100%)",
        }}
      >
        {/* New Post */}
        <label
          className={`${
            selectedPostSystem.selected === 0 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="postSystem"
            value={0}
            checked={selectedPostSystem.selected === 0}
            onChange={() => handleSelection(0)}
          />
          New Post
        </label>

        {/* In House Post System */}
        <label
          className={`${
            selectedPostSystem.selected === 1 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="postSystem"
            value={1}
            checked={selectedPostSystem.selected === 1}
            onChange={() => handleSelection(1)}
          />
          In-House Post System
        </label>

        {/* Retrofit */}
        <label
          className={`${
            selectedPostSystem.selected === 2 ? "selected" : "unselected"
          } h-9 cursor-pointer select-none divide-x rounded-none border-b-2 border-t-2 border-c-300 px-0 transition-all`}
        >
          <input
            type="radio"
            name="postSystem"
            value={2}
            checked={selectedPostSystem.selected === 2}
            onChange={() => handleSelection(2)}
          />
          Retrofit
        </label>
      </div>

      <AnimatePresence>
        {isOpen.postSystem && (
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
              <div className="py-2 text-lg font-semibold text-center capitalize">
                Post System Details
              </div>
              <hr />
              <ul className="mt-2">
                <li>
                  <div className="marker">
                    <p>
                      <strong>Post Types:</strong> 4 bolt base bracket or buried
                      in concrete.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Size:</strong> 2.5” square for corners/gate posts;
                      2” square for standard fence posts.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="marker">
                    <p>
                      <strong>Mounting Brackets for:</strong> Chainlink, 4x4
                      wood, existing tubing.
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

export default PostSystem;
