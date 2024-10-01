"use client"
import React, { createContext, useState } from "react";

// Create the context
export const GatesContext = createContext();

export const GatesProvider = ({ children }) => {
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
