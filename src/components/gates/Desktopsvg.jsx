import React from "react";
import FirstSvg from "./FirstSvg";
import AutoManIcon from "./AutomanIcon";

const Desktopsvg = () => {
  return (
    <div className="hidden col-span-2 row-span-1 mb-8 md:col-span-1 md:mt-0 md:mb-0 md:block md:pr-3 lg:pr-4">
      <div className="sticky top-14 md:top-28">
        <div className="h-40 sm:h-72 md:h-auto">
          <div className="relative mx-auto" id="sketch-main">
            <div id="sketch-scan">
              <FirstSvg weight={44} />
              <div className="-mt-3 md:-mt-4">
                <div className="mb-1" style={{}}></div>
              </div>

              <AutoManIcon />
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Desktopsvg;
