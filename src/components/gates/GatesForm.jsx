import React, { useState } from "react";
import MotionSelector from "./MotionSelector";
import Panel from "./Panel";
import Style from "./Style";
import Pickets from "./Pickets";
import IronWood from "./IronWood";
import Access from "./Access";

const GatesForm = () => {
  const [width, setWidth] = useState(36);
  const [kitValue, setKitValue] = useState({
    value: 0,
    selected: 0,
  });
  const [panelValue, setPanelValue] = useState({
    value: 0,
    selected: 0,
  });
  const [selectedStyle, setSelectedStyle] = useState({
    value: 0,
    selected: 0,
  });
  const [selectedPicket, setSelectedPicket] = useState({
    value: 0,
    selected: 0,
  });
  const [selectedIronWood, setSelectedIronWood] = useState({
    value: 0,
    selected: 0,
  });
  const [selectedAccess, setSelectedAccess] = useState({
    value: 0,
    selected: 0,
  });
  // Calculate price dynamically based on width
  const calculatePrice = (width) => {
    const baseWidth = 44; // Starting point for pricing (44 lbs corresponds to $1316)
    const basePrice = 1316; // Price for baseWidth
    const pricePerUnit = 12; // Incremental price per width unit

    if (width < baseWidth)
      return basePrice - (baseWidth - width) * pricePerUnit;
    return basePrice + (width - baseWidth) * pricePerUnit;
  };

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
          <div
            className="pl-4 pr-1 text-left rounded-md rounded-b-md bg-c-50 md:mx-2"
            style={{}}
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
                      <strong>Size:</strong> If the size you need isn't shown,
                      let us know. Unless requested otherwise, all gates are 6ft
                      tall when set on v-track (slide) or 2 inches above the
                      ground (swing).
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <MotionSelector
          selectedMotion={kitValue}
          setSelectedMotion={setKitValue}
        />
        <div />
        <Panel panelValue={panelValue} setPanelValue={setPanelValue} />
        <div />
        <Style
          selectedStyle={selectedStyle}
          setSelectedStyle={setSelectedStyle}
        />{" "}
        <div />
        <Pickets
          selectedPicket={selectedPicket}
          setSelectedPicket={setSelectedPicket}
        />
        <div />
        <IronWood
          selectedIronWood={selectedIronWood}
          setSelectedIronWood={setSelectedIronWood}
        />
        <div />
        <Access
          selectedAccess={selectedAccess}
          setSelectedAccess={setSelectedAccess}
        />
        <div />{" "}
        <div>
          <div
            className="px-4 py-4 mt-3 mb-1 font-semibold capitalize rounded-lg shadow-sm bg-c-red text-c-0"
            style={{}}
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
              Solo panel swing kit gates with ironwood cannot be wider than
              13ft.
            </div>
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
              Solo panel swing kit gates cannot be wider than 15ft.
            </div>{" "}
            <a className="inline-block" href="tel:800-879-8793">
              Confused? Call Us (800) 879-8793
            </a>
          </div>{" "}
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