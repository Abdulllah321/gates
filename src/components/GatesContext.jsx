"use client";
import React, { createContext, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Create the context
export const GatesContext = createContext();

export const GatesProvider = ({ children }) => {
  const searchParams = useSearchParams();

  // States
  const [width, setWidth] = useState(36);
  const [kitValue, setKitValue] = useState({ value: 0, selected: 0 });
  const [panelValue, setPanelValue] = useState({
    value: 0,
    selected: 0,
    direction: "Left to Right",
  });
  const [selectedStyle, setSelectedStyle] = useState({
    value: 0,
    selected: 0,
    position: "bottom",
  });
  const [selectedPicket, setSelectedPicket] = useState({
    value: 0,
    selected: 0,
  });
  const [selectedIronWood, setSelectedIronWood] = useState({
    selected: null, // Metal Frame or Fill Material
    subOption: null, // Paint or Powder Coat (for Metal Frame)
    color: null, // Color choice
    finish: null, // Flat or Glossy (for Paint and Powder Coat)
  });
  const [selectedAccess, setSelectedAccess] = useState({
    value: 0,
    selected: 0,
  });
  const [ft, setFt] = useState(3);
  const [inch, setInch] = useState(0);
  const [height, setHeight] = useState(4);
  const [selectedType, setSelectedType] = useState("gate");

  const buildSKU = () => {
    return `${width}-${kitValue.selected}-${panelValue.selected}-${selectedStyle.selected}-${selectedPicket.selected}-${selectedIronWood.selected}-${selectedAccess.selected}`;
  };

  // useEffect(() => {
  //   if (selectedType === "fence") {
  //     setSelectedStyle({ selected: 0 });
  //     setKitValue({ selected: 0 });
  //   }
  // }, [selectedType]); 

  useEffect(() => {
    const sku = searchParams.get("sku");
    const directionParam = searchParams.get("direction");
    const position = searchParams.get("position");
    const height = searchParams.get("height");
    const type = searchParams.get("type");
    if (sku) {
      const [
        widthParam,
        kitParam,
        panelParam,
        styleParam,
        picketParam,
        ironWoodParam,
        accessParam,
      ] = sku.split("-");

      setWidth(Number(widthParam) || 36); // Ensure default if parsing fails
      setKitValue((prev) => ({ ...prev, selected: Number(kitParam) || 0 }));
      setPanelValue((prev) => ({
        ...prev,
        selected: Number(panelParam) || 0,
        direction: directionParam || "Left to Right",
      }));
      setSelectedStyle((prev) => ({
        ...prev,
        selected: Number(styleParam) || 0,
        position: position || "bottom",
      }));
      setSelectedPicket((prev) => ({
        ...prev,
        selected: Number(picketParam) || 0,
      }));
      setSelectedIronWood((prev) => ({
        ...prev,
        selected: Number(ironWoodParam) || 0,
      }));
      setSelectedAccess((prev) => ({
        ...prev,
        selected: Number(accessParam) || 0,
      }));
      setSelectedType(type);
      setHeight(height);
    }
  }, [searchParams]);

  useEffect(() => {
    const sku = buildSKU();
    const params = new URLSearchParams(searchParams);

    params.set("sku", sku);
    params.set("height", height);
    params.set("type", selectedType);
    if (panelValue.selected === 0) {
      params.set("direction", panelValue.direction);
    } else {
      params.delete("direction");
    }
    if (selectedStyle.selected === 5) {
      params.set("position", selectedStyle.position || "bottom");
    } else {
      params.delete("position");
    }
    history.replaceState(null, null, "?" + params.toString());
  }, [
    width,
    kitValue,
    panelValue,
    selectedStyle,
    selectedPicket,
    selectedIronWood,
    selectedAccess,
    height,
    selectedType,
  ]);

  // Combine all state values and setters into a single object
  const value = {
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
    ft,
    setFt,
    inch,
    setInch,
    height,
    setHeight,
    selectedType,
    setSelectedType,
  };

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <motion.div
            className="w-16 h-16 border-8 border-t-8 border-gray-300 rounded-full animate-spin border-t-c-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
          <motion.p
            className="mt-4 text-lg text-c-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.p>
        </div>
      }
    >
      <GatesContext.Provider value={value}>{children}</GatesContext.Provider>
    </Suspense>
  );
};
