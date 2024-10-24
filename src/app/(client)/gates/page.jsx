"use client";
import Desktopsvg from "@/components/gates/Desktopsvg";
import GatesForm from "@/components/gates/GatesForm";
import Head from "@/components/gates/Head";
import MobileSvg from "@/components/gates/MobileSvg";
import React, { Suspense, useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ToggleGateFence from "@/components/ToggleGateFence";
import { GatesContext } from "@/components/GatesContext";

const Gates = () => {
  const scrollPositionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedType } = useContext(GatesContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 786);
    };

    const handleScroll = () => {
      scrollPositionRef.current = window.scrollY; // Update scroll position
    };

    // Set initial state
    handleResize();

    // Attach event listeners
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    // Restore scroll position after component mounts
    window.scrollTo(0, scrollPositionRef.current);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        <div className="pb-10 mx-auto md:pb-5 max-w-7xl">
          <Head />
          {isMobile && <MobileSvg />}
          <ToggleGateFence />
          <div className="relative grid grid-cols-1 gap-4 pt-0 pb-6 md:grid-cols-2 md:pt-4">
            {!isMobile && <Desktopsvg />}
            <GatesForm />
          </div>

          <div className="mb-14">
            <div className="px-3 mx-auto space-y-8 md:w-3/4">
              <section className="mb-8">
                <h2 className="text-5xl font-extrabold text-center text-gray-800 mt-7">
                  Customize Your{" "}
                  <span className="capitalize">{selectedType}</span>
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Every gate is custom-designed just for you! Our skilled
                  ironworkers use heavy-duty steel to handcraft each gate to the
                  highest industry standards.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Your gate will be American-made, thoroughly cleaned, and
                  finished with a protective anti-gassing primer and sleek black
                  satin powder-coat.
                </p>
                <p className="mt-4 text-lg font-bold leading-relaxed text-gray-700">
                  Enjoy your gate installation safely in the sunshine with a
                  partner!
                </p>
              </section>

              <hr className="mb-8 border-gray-300" />

              <section className="mb-8">
                <h2 className="text-5xl font-extrabold text-center text-gray-800 mt-7">
                  Features
                </h2>
                <ul className="mt-4 text-gray-700 list-disc list-inside">
                  {[
                    {
                      label: "Finish",
                      description:
                        "Thick satin black powder-coat with rust-preventing anti-gassing primer.",
                    },
                    {
                      label: "Size",
                      description:
                        "6ft tall when set on v-track or 2 inches above the ground for swing.",
                    },
                    {
                      label: "Swing Kit",
                      description:
                        "Includes heavy-duty hinges and 4x4 94-inch posts.",
                    },
                    {
                      label: "Panels",
                      description:
                        "10ft+ wide panels ship in 2 bolt-connectable sections.",
                    },
                    {
                      label: "Style",
                      description: "Stylish arch with finials.",
                    },
                    {
                      label: "Pickets",
                      description:
                        "Thick round steel tubing set 4 inches apart.",
                    },
                    {
                      label: "DIY Ironwood",
                      description: "Perfect for adding your own wood.",
                    },
                    {
                      label: "Access",
                      description: "Includes cane bolt(s) and/or gate latch.",
                    },
                  ].map((feature, index) => (
                    <li key={index} className="pb-2">
                      <strong>{feature.label}:</strong> {feature.description}
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="mb-8 border-gray-300" />

              <section className="mb-5">
                <h2 className="text-5xl font-extrabold text-center text-gray-800 mt-7">
                  Free Shipping *
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Orders to Alaska and Hawaii incur a flat rate of $750. All
                  other US states enjoy complimentary shipping.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Delivery typically takes 3-5 business days. Unloading products
                  safely with assistance is your responsibility.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  Please inspect your shipment for concealed damages and missing
                  items before signing for delivery.
                </p>
              </section>
            </div>
          </div>

          <iframe
            style={{
              display: "block",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              overflow: "hidden",
              border: 0,
              opacity: 0,
              pointerEvents: "none",
              zIndex: -1,
            }}
            aria-hidden="true"
            tabIndex={-1}
            src="about:blank"
          />
        </div>
      </Suspense>
  );
};

export default Gates;
