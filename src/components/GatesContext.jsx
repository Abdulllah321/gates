"use client";
import React, { createContext, useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

// Create the context
export const GatesContext = createContext();

export const GatesProvider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
  const [ft, setFt] = useState(3);
  const [inch, setInch] = useState(0);
  // Function to build SKU from state values
  const buildSKU = () => {
    return `${width}-${kitValue.selected}-${panelValue.selected}-${selectedStyle.selected}-${selectedPicket.selected}-${selectedIronWood.selected}-${selectedAccess.selected}`;
  };

  // Parse SKU from the URL and update state values
  useEffect(() => {
    const sku = searchParams.get("sku");

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
      setPanelValue((prev) => ({ ...prev, selected: Number(panelParam) || 0 }));
      setSelectedStyle((prev) => ({
        ...prev,
        selected: Number(styleParam) || 0,
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
    }
  }, [searchParams]);

  // Update URL query parameter when any state changes
  useEffect(() => {
    const sku = buildSKU();
    const params = new URLSearchParams(searchParams);

    params.set("sku", sku);

    history.replaceState(null, null, "?" + params.toString());
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
    ft,
    setFt,
    inch,
    setInch,
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
