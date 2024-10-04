import React, { Suspense, useContext, useState } from "react";
import MotionSelector from "./MotionSelector";
import Panel from "./Panel";
import Style from "./Style";
import Pickets from "./Pickets";
import IronWood from "./IronWood";
import Access from "./Access";
import { GatesContext } from "../GatesContext";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

const GatesForm = () => {
  const {
    width,
    setWidth,
    kitValue,
    setKitValue,
    panelValue,
    setPanelValue,
    selectedStyle,
    setSelectedStyle,
    selectedPicket,
    setSelectedPicket,
    selectedIronWood,
    setSelectedIronWood,
    selectedAccess,
    setSelectedAccess,
  } = useContext(GatesContext);
  const [isOpen, setIsOpen] = useState({
    width: false,
    motionSelector: false,
    panel: false,
    style: false,
    pickets: false,
    ironWood: false,
    access: false,
  });

  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const isAuto = sku && sku[6] === "2";
  const getKit = sku && sku[1] !== "0";

  function calculatePrice(width) {
    const minWidth = 36;
    const maxWidth = 256;
    const minPrice = 1316;
    const maxPrice = 2986;

    if (width < minWidth || width > maxWidth) {
      throw new Error("Width must be between 36 and 256");
    }

    const pricePerUnit = (maxPrice - minPrice) / (maxWidth - minWidth);
    const price = minPrice + (width - minWidth) * pricePerUnit;

    return Math.round(price);
  }



  return (
    <div className="col-span-2 mt-2 md:col-span-1 md:pl-3 lg:pl-4">
      <form>
        <div className="relative mb-1 text-center mt-9">
          <div className="absolute top-1.5 left-2 font-medium text-c-green">
            ${calculatePrice(width)} {/* Display calculated price */}
          </div>
          <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
            <span className="pr-2.5 text-lg font-semibold text-c-blue">1</span>
            Width
          </div>
          <div className="absolute top-1.5 right-0">
            <button
              type="button"
              className="col-span-1 cursor-pointer rounded-full px-2 text-xl text-[1.3rem] font-bold"
              onClick={() => setIsOpen({ ...isOpen, width: !isOpen.width })}
            >
              <div
                className={`${
                  isOpen.width ? "!bg-c-blue" : ""
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
                    isOpen.width ? "text-c-0" : "text-c-blue"
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
        <label className="flex items-center">
          {/* Custom Range Input */}
          <div className="relative w-full">
            <input
              type="range"
              name="width"
              min={36}
              max={256}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="border-t border-b border-gray-400 w-full !h-3 bg-gray-100 outline-none appearance-none range-slider focus:ring-2 focus:ring-c-prime-light hover:bg-c-prime"
            />
            {/* Custom Thumb */}
            <style jsx>{`
              .range-slider::-webkit-slider-thumb {
                appearance: none;
                width: 30px;
                height: 26px;
                border-radius: 4px;
                background-color: #fbdb41;
                border: 2px solid #eab308;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
                cursor: col-resize;
                transition: background-color 0.3s ease;
              }

              .range-slider::-moz-range-thumb {
                appearance: none;
                width: 24px;
                height: 24px;
                background-color: #fbdb41;
                border: 2px solid #eab308;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
                cursor: pointer;
                transition: background-color 0.3s ease;
              }
            `}</style>
          </div>
        </label>
        <div className="pt-1">
          <AnimatePresence>
            {isOpen.width && (
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
                className="pl-4 pr-1 overflow-hidden text-left rounded-md rounded-b-md bg-c-50 md:mx-2"
              >
                <div className="pb-2">
                  <div className="py-2 text-lg font-semibold text-center capitalize">
                    See gate image for dimensions
                  </div>
                  <hr />
                  <ul className="mt-2">
                    <li>
                      <div className="marker">
                        <p>
                          <strong>Size:</strong> If the size you need isn&apos;t
                          shown, let us know. Unless requested otherwise, all
                          gates are 6ft tall when set on v-track (slide) or 2
                          inches above the ground (swing).
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <MotionSelector
          selectedMotion={kitValue}
          setSelectedMotion={setKitValue}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          width={width}
        />
        <Panel
          panelValue={panelValue}
          setPanelValue={setPanelValue}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <Style
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />{" "}
        <Pickets
          selectedPicket={selectedPicket}
          setSelectedPicket={setSelectedPicket}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <IronWood
          selectedIronWood={selectedIronWood}
          setSelectedIronWood={setSelectedIronWood}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <div />
        <Access
          selectedAccess={selectedAccess}
          setSelectedAccess={setSelectedAccess}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <div />{" "}
        <div>
          <Suspense>
            <AnimatePresence>
              {isAuto && !getKit && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="px-4 py-4 mt-3 mb-1 font-semibold capitalize origin-top rounded-lg shadow-sm bg-c-red text-c-0"
                >
                  <div>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      className="mt-[-2px] inline-block h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>{" "}
                    You do not have a Kit selected so we don't know what
                    automation you need. Please add automation through our Parts
                    page instead.
                  </div>{" "}
                  <a className="inline-block" href="tel:800-879-8793">
                    Confused? Call Us (800) 879-8793
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>

          <div className="flex w-11/12 mx-auto mt-9 md:w-full lg:w-9/12 xl:w-7/12">
            <button
              className="btn h-12 flex-grow rounded-full border-[3px] cursor-not-allowed !bg-c-500 !border-c-700"
              type="submit"
              disabled=""
            >
              <div className="z-5 absolute inset-x-5 top-[9px] text-left">
                <div className="-mt-0.5 text-xl text-c-900">Add To Cart</div>{" "}
                <div className="absolute -top-[5px] -right-2 rounded-full bg-c-0 px-3 pb-1 pt-1 font-semibold text-c-green">
                  <span className="px-0.5 text-c-500 line-through">$5547</span>{" "}
                  <span className="px-0.5 font-medium">$4991</span>
                </div>
              </div>
            </button>{" "}
            <div className="self-center pl-2 cursor-pointer">
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                className="w-6 h-6 text-c-1000 hover:text-c-prime-black"
              >
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </div>
          </div>
          <div className="mt-6 mb-2 text-c-800">
            <span className="text-lg font-bold text-c-1000">
              Est. Ships In: <span className="text-c-green">4 Weeks</span>{" "}
            </span>
            <br />
            Need your gate much sooner?
            <br className="block md:inline" />
            Select
            <span className="font-bold text-c-blue">Expedite</span> during
            checkout.
          </div>
        </div>
      </form>
    </div>
  );
};

export default GatesForm;
