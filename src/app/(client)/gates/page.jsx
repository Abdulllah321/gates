"use client";
import Desktopsvg from "@/components/gates/Desktopsvg";
import GatesForm from "@/components/gates/GatesForm";
import Head from "@/components/gates/Head";
import MobileSvg from "@/components/gates/MobileSvg";
import React, {
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import ToggleGateFence from "@/components/ToggleGateFence";
import { GatesContext } from "@/components/GatesContext";

const Gates = () => {
  const scrollPositionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedType, ft, height } = useContext(GatesContext);

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
      <div className="px-4 pb-10 mx-auto md:pb-5 max-w-7xl">
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
                {selectedType === "fence"
                  ? "Our fences are crafted to blend style and durability, offering the perfect solution for privacy and security."
                  : "Each gate is custom-designed to meet your needs. Handcrafted using heavy-duty steel and finished to industry standards."}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                {selectedType === "fence"
                  ? "Choose from various materials, including wood, tempered glass, or steel, all finished with protective coatings for long-lasting performance."
                  : "All gates are thoroughly cleaned and coated with a protective primer and satin black powder-coat for durability."}
              </p>
            </section>

            <hr className="mb-8 border-gray-300" />

            <section className="mb-8">
              <h2 className="text-5xl font-extrabold text-center text-gray-800 mt-7">
                Features
              </h2>
              <ul className="mt-4 text-gray-700 list-disc list-inside">
                {selectedType === "fence"
                  ? [
                      {
                        label: "Material",
                        description:
                          "Options include wood, tempered glass, or steel.",
                      },
                      {
                        label: "Height",
                        description:
                          "Available in standard heights of 4ft, 6ft, and 8ft.",
                      },
                      {
                        label: "Privacy",
                        description:
                          "Includes options for full privacy or semi-transparent designs.",
                      },
                      {
                        label: "Finish",
                        description:
                          "Rust-resistant coatings and finishes for durability.",
                      },
                      {
                        label: "Installation",
                        description:
                          "DIY-friendly or professional installation support available.",
                      },
                    ]
                  : [
                      {
                        label: "Finish",
                        description:
                          "Rust-resistant satin black powder-coat with anti-gassing primer.",
                      },
                      {
                        label: "Swing Kit",
                        description: "Includes heavy-duty hinges and posts.",
                      },
                      {
                        label: "Panels",
                        description:
                          "Wide panels shipped in bolt-connectable sections.",
                      },
                      {
                        label: "Style",
                        description: "Modern arch design with Center Peak.",
                      },
                      {
                        label: "Pickets",
                        description:
                          "Sturdy round steel tubing, spaced 4 inches apart.",
                      },
                      {
                        label: "DIY Wood",
                        description: "Compatible with custom wood panels.",
                      },
                      {
                        label: "Post",
                        description: "Includes cane bolt(s) and gate latch.",
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
                Free shipping to most US states. Orders to Alaska and Hawaii
                incur a flat rate of $750.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Delivery within 3-5 business days. Assistance is required for
                unloading upon delivery.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Inspect shipments for damages or missing items before signing
                for delivery.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Gates;
