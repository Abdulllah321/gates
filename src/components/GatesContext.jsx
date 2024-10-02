"use client";
import React, { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Create the context
export const GatesContext = createContext();

export const GatesProvider = ({ children }) => {
  const router = useRouter();

  // States
  const [width, setWidth] = useState(36);
  const [kitValue, setKitValue] = useState({ value: 0, selected: 0 });
  const [panelValue, setPanelValue] = useState({ value: 0, selected: 0 });
  const [selectedStyle, setSelectedStyle] = useState({ value: 0, selected: 0 });
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

  // Function to build SKU from state values
  const buildSKU = () => {
    return `${width}-${kitValue.selected}-${panelValue.selected}-${selectedStyle.selected}-${selectedPicket.selected}-${selectedIronWood.selected}-${selectedAccess.selected}`;
  };

  // Update URL query parameter when any state changes
  useEffect(() => {
    const sku = buildSKU();

    // Update the URL with the new SKU
    router.push(`/gates?sku=${sku}`);
  }, [
    width,
    kitValue,
    panelValue,
    selectedStyle,
    selectedPicket,
    selectedIronWood,
    selectedAccess,
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
  };

  return (
    <GatesContext.Provider value={value}>{children}</GatesContext.Provider>
  );
};
