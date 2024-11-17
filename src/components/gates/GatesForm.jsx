import React, { useContext, useState, useEffect } from "react";
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
    selectedType,
    ft,
    inch,
    height,
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
  const [price, setPrice] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const searchParams = useSearchParams();
  const sku = searchParams.get("sku")?.split("-");
  const isAuto = sku && sku[6] === "2";
  const getKit = sku && sku[1] !== "0";
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  useEffect(() => {
    console.log(height);
    if (height == 4) {
      switch (ft) {
        case 3:
          setPrice(120);
          break;
        case 4:
          setPrice(160);
          break;
        case 5:
          setPrice(200);
          break;
        case 6:
          setPrice(200);
          break;
        case 7:
          setPrice(240);
          break;
        case 8:
          setPrice(240);
          break;
        case 9:
          setPrice(280);
          break;
        case 10:
          setPrice(280);
          break;
        case 11:
          setPrice(120);
          break;
        case 12:
          setPrice(120);
          break;
        default:
          setPrice(0);
      }
    } else if (height === 4 || height === "4") {
      switch (ft) {
        case 3:
          setPrice(450);
          break;
        case 4:
          setPrice(600);
          break;
        case 5:
          setPrice(750);
          break;
        case 6:
          setPrice(950);
          break;
        case 7:
          setPrice(1150);
          break;
        case 8:
          setPrice(1350);
          break;
        case 9:
          setPrice(1550);
          break;
        case 10:
          setPrice(1750);
          break;
        case 11:
          setPrice(1950);
          break;
        case 12:
          setPrice(1950);
          break;
        default:
          setPrice(0);
      }
    } else if (height == 5) {
      switch (ft) {
        case 3:
          setPrice(450 + 70);
          break;
        case 4:
          setPrice(600 + 70);
          break;
        case 5:
          setPrice(750 + 70);
          break;
        case 6:
          setPrice(950 + 140);
          break;
        case 7:
          setPrice(1150 + 140);
          break;
        case 8:
          setPrice(1350 + 140);
          break;
        case 9:
          setPrice(1550 + 280);
          break;
        case 10:
          setPrice(1750 + 280);
          break;
        case 11:
          setPrice(1950 + 280);
          break;
        case 12:
          setPrice(1950 + 280);
          break;
        default:
          setPrice(0);
      }
    } else if (height == 6) {
      switch (ft) {
        case 3:
          setPrice(590);
          break;
        case 4:
          setPrice(740);
          break;
        case 5:
          setPrice(890);
          break;
        case 6:
          setPrice(1230);
          break;
        case 7:
          setPrice(1430);
          break;
        case 8:
          setPrice(1630);
          break;
        case 9:
          setPrice(2110);
          break;
        case 10:
          setPrice(2310);
          break;
        case 11:
          setPrice(2510);
          break;
        case 12:
          setPrice(2510);
          break;
        default:
          setPrice(0);
      }
    } else if (height == 7) {
      switch (ft) {
        case 3:
          setPrice(450 + 70 + 70);
          break;
        case 4:
          setPrice(600 + 70 + 70);
          break;
        case 5:
          setPrice(750 + 70 + 70);
          break;
        case 6:
          setPrice(950 + 140 + 140);
          break;
        case 7:
          setPrice(1150 + 140 + 140);
          break;
        case 8:
          setPrice(1350 + 140 + 140);
          break;
        case 9:
          setPrice(1550 + 280 + 280);
          break;
        case 10:
          setPrice(1750 + 280 + 280);
          break;
        case 11:
          setPrice(1950 + 280 + 280);
          break;
        case 12:
          setPrice(1950 + 280 + 280);
          break;
        default:
          setPrice(0);
      }
    } else if (height == 7) {
      switch (ft) {
        case 3:
          setPrice(450 + 70 + 70);
          break;
        case 4:
          setPrice(600 + 70 + 70);
          break;
        case 5:
          setPrice(750 + 70 + 70);
          break;
        case 6:
          setPrice(950 + 140 + 140);
          break;
        case 7:
          setPrice(1150 + 140 + 140);
          break;
        case 8:
          setPrice(1350 + 140 + 140);
          break;
        case 9:
          setPrice(1550 + 280 + 280);
          break;
        case 10:
          setPrice(1750 + 280 + 280);
          break;
        case 11:
          setPrice(1950 + 280 + 280);
          break;
        case 12:
          setPrice(1950 + 280 + 280);
          break;
        default:
          setPrice(0);
      }
    } else if (height == 5) {
      switch (ft) {
        case 3:
          setPrice(450 + 70 + 70 + 70);
          break;
        case 4:
          setPrice(600 + 70 + 70 + 70);
          break;
        case 5:
          setPrice(750 + 70 + 70 + 70);
          break;
        case 6:
          setPrice(950 + 140 + 140 + 140);
          break;
        case 7:
          setPrice(1150 + 140 + 140 + 140);
          break;
        case 8:
          setPrice(1350 + 140 + 140 + 140);
          break;
        case 9:
          setPrice(1550 + 280 + 280 + 280);
          break;
        case 10:
          setPrice(1750 + 280 + 280 + 280);
          break;
        case 11:
          setPrice(1950 + 280 + 280 + 280);
          break;
        case 12:
          setPrice(1950 + 280 + 280 + 280);
          break;
        default:
          setPrice(0);
      }
    }
  }, [ft, height]);

  const handleAddToCart = () => {
    const generateUniqueId = () => {
      return `cart_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    };

    const cartItem = {
      _id: generateUniqueId(),
      width,
      kitValue,
      panelValue,
      selectedStyle,
      selectedPicket,
      selectedIronWood,
      selectedAccess,
      ft,
      inch,
      price: price,
      type: selectedType,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
  };
  return (
    <div className="col-span-2 mt-2 md:col-span-1 md:pl-3 lg:pl-4">
      <form>
        <MotionSelector
          selectedMotion={kitValue}
          setSelectedMotion={setKitValue}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          width={width}
          selectedType={selectedType}
        />{" "}
        <Panel
          panelValue={panelValue}
          setPanelValue={setPanelValue}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          isSwing={isSwing}
          isSlide={isSlide}
        />
        <Style
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          width={width}
        />{" "}
        <div className="relative mb-1 text-center mt-9">
          <div className="col-span-1 mt-1.5 mb-1 text-2xl font-bold">
            <span className="pr-2.5 text-lg font-semibold text-c-blue">3</span>
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
                background-color: #94a836;
                border: 2px solid #eab308;
                box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
                cursor: col-resize;
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
        <Pickets
          selectedPicket={selectedPicket}
          setSelectedPicket={setSelectedPicket}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          width={width}
        />
        <IronWood
          selectedIronWood={selectedIronWood}
          setSelectedIronWood={setSelectedIronWood}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          width={width}
        />
        <div />
        <Access
          selectedPostSystem={selectedAccess}
          setSelectedPostSystem={setSelectedAccess}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        <div />{" "}
        <div>
          <div className="flex w-11/12 mx-auto mt-9 md:w-full lg:w-9/12 xl:w-7/12">
            <button
              className={`btn h-12 flex-grow rounded-full border-[3px] ${
                isDisabled ? "!bg-c-500" : "!bg-c-prime"
              } relative`}
              type="button" // Use button type instead of submit to avoid form submission
              onClick={handleAddToCart} // Call the add to cart function
            >
              <div className="z-5 absolute inset-x-5 top-[9px] text-left">
                <div className="-mt-0.5 text-xl text-c-900">Add To Cart</div>
                <div className="absolute -top-[5px] -right-2 rounded-full bg-c-0 px-3 pb-1 pt-1 font-semibold text-c-green">
                  <span className={`px-0.5  text-c-500`}>${price}</span>{" "}
                </div>
              </div>
            </button>{" "}
            <div
              className="self-center pl-2 cursor-pointer"
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: "Check this out!",
                      text: "Here is something interesting for you to check out!",
                      url: window.location.href, // Shares the current page URL
                    });
                    console.log("Content shared successfully");
                  } catch (error) {
                    console.error("Error sharing content:", error);
                  }
                } else {
                  console.log("Share API not supported on this browser");
                }
              }}
            >
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
        </div>
      </form>
    </div>
  );
};

export default GatesForm;
