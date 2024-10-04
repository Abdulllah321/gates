import React, { Suspense, useContext } from "react";
import { GatesContext } from "../GatesContext";
import { useSearchParams } from "next/navigation";

const Head = () => {
  const { width } = useContext(GatesContext);
  const searchParams = useSearchParams();

  const sku = searchParams.get("sku")?.split("-");

  // Kit
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  // Panel
  const isDual = sku && sku[2] === "1";
  // Style
  const isArch = sku && (sku[3] === "1" || sku[3] === "3");
  const isFinials = sku && sku[3] === "2";
  const isBoth = sku && sku[3] === "3";
  // Pickets
  const isSingle = sku && sku[4] === "1";
  const isPuppy = sku && sku[4] === "2";
  const isDouble = sku && sku[4] === "3";
  // Wood Options
  const isVWood = sku && sku[5] === "1";
  const isHWood = sku && sku[5] === "2";
  const isDiy = sku && sku[5] === "3";
  //access
  const isMan = sku && sku[6] === "1";
  const isAuto = sku && sku[6] === "2";

  function calculateDimensions(width, kit = null, isDual = false) {
    const minWidth = 36;
    const maxWidth = 256;

    const minFeet = 3; // 3ft 0in at 36 width
    const minInches = 0;
    const maxFeet = 21; // 21ft 4in at 256 width
    const maxInches = 4;

    // Calculate the total inches for the min and max width
    const totalMinInches = minFeet * 12 + minInches;
    const totalMaxInches = maxFeet * 12 + maxInches;

    // Interpolate the inches based on width
    const totalInches = Math.round(
      totalMinInches +
        ((width - minWidth) * (totalMaxInches - totalMinInches)) /
          (maxWidth - minWidth)
    );

    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    const baseMinWeight = isDiy ? 44 : 44; // Assuming 3lbs for base
    const baseMaxWeight = isDiy ? 188 : 188; // Same for DIY

    const ironwoodMinWeight = isVWood || isHWood ? 106 : baseMinWeight;
    const ironwoodMaxWeight = isVWood ? 626 : isHWood ? 638 : baseMaxWeight;

    let weight;

    if (isVWood || isHWood) {
      weight = Math.round(
        ironwoodMinWeight +
          ((width - minWidth) * (ironwoodMaxWeight - ironwoodMinWeight)) /
            (maxWidth - minWidth)
      );
    } else {
      weight = Math.round(
        baseMinWeight +
          ((width - minWidth) * (baseMaxWeight - baseMinWeight)) /
            (maxWidth - minWidth)
      );
    }

    // Apply additional weight logic based on existing conditions
    const increment =
      Math.round(((width - minWidth) / (maxWidth - minWidth)) * 3) + 1;

    if (isFinials || isBoth) {
      weight += increment;
    }
    if (isAuto) {
      weight += 39;
    }
    if (isSingle) {
      weight = Math.round(
        65 + ((width - minWidth) / (maxWidth - minWidth)) * (339 - 65)
      );
    } else if (isPuppy) {
      weight = Math.round(
        71 + ((width - minWidth) / (maxWidth - minWidth)) * (378 - 71)
      );
    } else if (isDouble) {
      weight = Math.round(
        86 + ((width - minWidth) / (maxWidth - minWidth)) * (490 - 86)
      );
    }

    const panelType = isDual ? "Dual Panels" : "Solo Panel";
    const style = isArch
      ? "Arch Style,"
      : isFinials
      ? "Finials Style,"
      : isBoth
      ? "Both Style,"
      : "";
    const pickets = isSingle
      ? "Single Pickets,"
      : isPuppy
      ? "Puppy Pickets,"
      : isDouble
      ? "Double Pickets,"
      : "";
    const ironWood =
      isVWood || isHWood
        ? "Vertical Ironwood"
        : isHWood
        ? "Horizontal Ironwood"
        : isDiy
        ? "DIY Wood"
        : "";
    const access = isAuto ? "Automatic Access," : isMan ? "Manual Access," : "";
    return `${feet}ft ${inches}in Wide, ${
      kit ? kit + " Kit, " : ""
    }${panelType}, ${style} ${pickets} ${ironWood} ${access} ~${weight}lbs`;
  }

  // Determine the kit
  const kit = isSwing ? "Swing" : isSlide ? "Slide" : null;

  return (
    <Suspense>
      <header className="px-1 pt-40 md:-mb-3 md:block md:pt-[7.6rem]">
        <h1 className="text-4xl font-bold text-center md:text-5xl">
          <div className="uppercase inline-block px-1.5">
            <span className="text-6xl md:text-7xl">c</span>
            <span className="text-5xl md:text-6xl">ustom</span>
          </div>
          <div className="uppercase inline-block px-1.5">
            <span className="text-6xl md:text-7xl">G</span>
            <span className="text-5xl md:text-6xl">ate</span>
          </div>
        </h1>

        <div className="mx-auto flex min-h-[4.5rem] items-center justify-center px-2 md:min-h-[3rem] md:py-6 md:text-lg lg:max-w-[70%]">
          <h2>{calculateDimensions(width, kit, isDual)}</h2>
        </div>
      </header>
    </Suspense>
  );
};

export default Head;
