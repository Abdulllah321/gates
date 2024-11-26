import React, { Suspense, useContext, useEffect } from "react";
import { GatesContext } from "../GatesContext";
import { useSearchParams } from "next/navigation";

const Head = () => {
  const {
    width,
    setFt,
    setInch,
    selectedType,
    selectedPicket,
    panelValue,
    selectedStyle,
    selectedIronWood,
  } = useContext(GatesContext);
  const searchParams = useSearchParams();

  const sku = searchParams.get("sku")?.split("-");

  // Kit
  const isSwing = sku && sku[1] === "1";
  const isSlide = sku && sku[1] === "2";
  // Panel
  const isDual = sku && sku[2] === "1";
  const direction = (panelValue.selected === 0 && panelValue?.direction) || "";
  // Style
  const isRectangular = sku && sku[3] === "0";
  const isArch = sku && (sku[3] === "1" || sku[3] === "3");
  const isFinials = sku && sku[3] === "2";
  const isBoth = sku && sku[3] === "3";
  const isCPeak = sku && sku[3] === "4";
  const isSectional = sku && sku[3] === "5";
  const ssPosition =
    selectedStyle.selected === 5 ? selectedStyle?.position : "";
  // Pickets
  const isPine = sku && sku[4] === "1";
  const isCBoard = sku && sku[4] === "2";
  const isHardwood = sku && sku[4] === "3";
  const isCedar = sku && sku[4] === "4";
  const isAcrylic = sku && sku[4] === "5";
  const isTubing = sku && sku[4] === "6";
  const isWire55 = sku && sku[4] === "7";
  const selectedPickets = isPine
    ? "Pine"
    : isCBoard
    ? "Composite Board"
    : isHardwood
    ? "Hardwood"
    : isCedar
    ? "Cedar"
    : isAcrylic
    ? "Acrylic"
    : isTubing
    ? "Tubing"
    : isWire55
    ? "Wire 55"
    : "";
  const picketMaterial =
    selectedPicket?.material === 1
      ? "Inlay"
      : selectedPicket?.material === 2
      ? "Flush"
      : "";
  const picketType = selectedPicket?.type || "";
  const picketOption = selectedPicket?.option || "";

  // Wood Options
  const isDiy = sku && sku[5] === "3";
  //access
  const isNoPost = sku && sku[6] === "0";
  const isPostgate = sku && sku[6] === "1";
  const isRetrofit = sku && sku[6] === "2";

  function calculateDimensions(width, kit = null, isDual = false) {
    // Define width limits for different types
    const maxFenceWidth = 120; // Fence panels up to 10 ft (120 inches)
    const maxSingleSlideWidth = 144; // Single sliding gates up to 12 ft (144 inches)
    const maxDoubleSlideWidth = 288; // Double sliding gates up to 24 ft (288 inches)
    const maxSingleSwingWidth = 288; // Single swing gates up to 24 ft (288 inches)
    const maxDoubleSwingWidth = 288; // Double swing gates up to 24 ft (288 inches)

    // Adjust maxWidth based on gate type
    let adjustedMaxWidth = maxSingleSwingWidth; // Default for single swing
    if (isSlide && !isDual) adjustedMaxWidth = maxSingleSlideWidth;
    if (isSlide && isDual) adjustedMaxWidth = maxDoubleSlideWidth;
    if (isSwing && isDual) adjustedMaxWidth = maxDoubleSwingWidth;
    if (!isSwing && !isSlide) adjustedMaxWidth = maxFenceWidth;

    // Constrain the width to the calculated adjustedMaxWidth
    width = Math.min(width, adjustedMaxWidth);

    const minWidth = 36; // Minimum width in inches

    const minFeet = 3; // 3ft 0in at 36 width
    const minInches = 0;
    const maxFeet = Math.floor(adjustedMaxWidth / 12);
    const maxInches = adjustedMaxWidth % 12;

    // Calculate the total inches for the min and max width
    const totalMinInches = minFeet * 12 + minInches;
    const totalMaxInches = maxFeet * 12 + maxInches;

    // Interpolate the inches based on width
    const totalInches = Math.round(
      totalMinInches +
        ((width - minWidth) * (totalMaxInches - totalMinInches)) /
          (adjustedMaxWidth - minWidth)
    );

    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;

    // Base weight calculations
    const baseMinWeight = isDiy ? 44 : 44;
    const baseMaxWeight = isDiy ? 188 : 188;

    let weight = Math.round(
      baseMinWeight +
        ((width - minWidth) * (baseMaxWeight - baseMinWeight)) /
          (adjustedMaxWidth - minWidth)
    );

    // Additional weight adjustments
    const increment =
      Math.round(((width - minWidth) / (adjustedMaxWidth - minWidth)) * 3) + 1;

    if (isFinials || isBoth) {
      weight += increment;
    }
    if (isRetrofit) {
      weight += 39;
    }

    const gateType = isSwing ? "Swing" : isSlide ? "Slide" : "";
    const panelType =
      gateType !== "" ? (isDual ? "Dual Panels" : "Solo Panel") : "";
    const direction =
      gateType !== "" && panelType === "Solo Panel" ? panelValue.direction : "";
    const style = [
      isArch ? "Arch Style" : "",
      isFinials ? "Finials Style" : "",
      isBoth ? "Both Style" : "",
      isCPeak ? "Center Peak Style" : "",
      isSectional ? "Sectional Style" : "",
      isRectangular ? "Rectangular Style" : "",
      selectedStyle.selected === 5 ? ssPosition : "", // Add ssPosition when style is 5
    ]
      .filter(Boolean) // Remove any empty strings from the array
      .join(", "); // Join all valid styles with commas

    const access = isNoPost
      ? "No Post or Hinges,"
      : isPostgate
      ? "Posts for Gates in"
      : isRetrofit
      ? "Retrofit"
      : "";
    const picketsText = [
      selectedPickets,
      picketMaterial,
      picketType,
      picketOption,
    ]
      .filter(Boolean)
      .join(", ");
    const ironWoodText = generateIronWoodText();
    return {
      feet,
      inches,
      weight,
      gateType,
      panelType,
      pickets: picketsText,
      style,
      ironWood: ironWoodText,
      access,
      direction,
    };
  }

  function generateIronWoodText() {
    const selectIronWood =
      selectedIronWood.selected === 0
        ? "Metal Frame"
        : selectedIronWood.selected === 1
        ? "Fill Material"
        : "";
    const material = selectedIronWood.subOption;
    const color = selectedIronWood.color;
    const weather =
      selectedIronWood.subOption === "Weather Proof"
        ? selectedIronWood.finish
          ? "No Finish"
          : "Finished"
        : "";
    const painted =
      selectedIronWood.subOption === "Weather Proof" &&
      selectedIronWood.finish &&
      selectedIronWood.painted
        ? "Painted"
        : "";

    const ironWoodText = [selectIronWood, material, weather, painted, color]
      .filter(Boolean)
      .join(", ");
    return ironWoodText;
  }

  useEffect(() => {
    const { feet, inches } = calculateDimensions(width, null, isDual);
    setFt(feet);
    setInch(inches);
  }, [
    width,
    isDual,
    isSwing,
    isSlide,
    setFt,
    setInch,
    selectedPickets,
    picketMaterial,
    picketType,
    picketOption,
    direction,
    selectedIronWood,
  ]);

  const kit = isSwing ? "Swing" : isSlide ? "Slide" : null;
  const dimensions = calculateDimensions(width, kit, isDual);

  return (
    <Suspense>
      <header className="px-1 pt-40 md:-mb-3 md:block md:pt-[7.6rem]">
        <h1 className="text-4xl font-bold text-center md:text-5xl">
          <div className="uppercase inline-block px-1.5">
            <span className="text-6xl md:text-7xl">c</span>
            <span className="text-5xl md:text-6xl">ustom</span>
          </div>
          <div className="uppercase inline-block px-1.5">
            <span className="text-6xl md:text-7xl">
              {selectedType.split("")[0]}
            </span>
            <span className="text-5xl md:text-6xl">
              {selectedType.slice(1)}
            </span>
          </div>
        </h1>

        <div className="mx-auto flex min-h-[4.5rem] items-center justify-center px-2 md:min-h-[3rem] md:py-6 md:text-lg lg:max-w-[70%]">
          <h2>
            {dimensions.feet}ft {dimensions.inches}in Wide
            {dimensions.panelType && `, ${dimensions.panelType}`}
            {dimensions.direction && `, ${dimensions.direction}`}
            {dimensions.pickets && `, ${dimensions.pickets}`}
            {dimensions.style && `, ${dimensions.style}`}
            {dimensions.ironWood && `, ${dimensions.ironWood}`}
            {dimensions.access && `, ${dimensions.access}`}
          </h2>
        </div>
      </header>
    </Suspense>
  );
};

export default Head;
