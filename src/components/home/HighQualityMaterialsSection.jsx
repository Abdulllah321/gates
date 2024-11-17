import Image from "next/image";
import { FaHammer } from "react-icons/fa";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const featuresData = [
  {
    title: "High Quality Materials",
    items: [
      "Gate & Fence strength doesn't get better than this.",
      "Extremely durable thick steel.",
      "Finished with a satin black powder-coat.",
      "Internally welded & sealed pickets.",
      "Beautiful weather-resistant ironwood.",
    ],
    imageSrc: "/high-quality-materials.jpg", // Update with actual image path
  },
  {
    title: "Sized To Your Measurement",
    items: [
      "Simply measure your opening to the inch and order a kit to match.",
      "Choose a location on your property/driveway.",
      "Check for any slopes or inclines.",
      "Leave enough room from the street for a car.",
      "Quickly call 811 before you dig.",
    ],
    imageSrc: "/sized-to-your-measurement.avif", // Update with actual image path
  },
  {
    title: "Easy Do It Yourself (DIY) Install",
    items: [
      "A revolutionarily simple guide to save you time & money.",
      "A fun DIY project or easily hire a pro.",
      "No welder or electrician required.",
      "Search Yelp, Handy, and Craigslist for help.",
      "Call us any time if you have any questions.",
    ],
    imageSrc: "/diy-install.avif", // Update with actual image path
  },
  {
    title: "Free National Shipping*",
    items: [
      "Freight dispatch will call you to setup a delivery time.",
      "We can expedite your lead time if need be.",
      "Truck lift-gates are optional for unloading.",
      "* Shipping to Hawaii or Alaska is extra.",
      "* You must order at least one gate or fence panel.",
    ],
    imageSrc: "/free-shipping.avif", // Update with actual image path
  },
  {
    title: "Customizable Designs",
    items: [
      "Choose from a variety of styles and finishes.",
      "Personalize your gates and fences to match your home.",
      "Options for decorative elements available.",
      "Crafted to suit your unique aesthetic preferences.",
      "Get expert advice on design choices.",
    ],
    imageSrc: "/custom-designs.jpg", // Update with actual image path
  },
  {
    title: "Exceptional Customer Service",
    items: [
      "Dedicated team to assist you every step of the way.",
      "Responsive support for all your inquiries.",
      "Follow-ups to ensure complete satisfaction.",
      "Guidance on installation and maintenance.",
      "Available via phone, chat, or email.",
    ],
    imageSrc: "/customer-service.jpg", // Update with actual image path
  },
];

const FeatureSection = ({ title, items, imageSrc, invert }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      className={`flex flex-col items-center justify-between mb-16 p-6 transition-all gap-10 ${
        invert ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <motion.div
        className="flex-1 mb-4 md:mr-8"
        initial={{ filter: "grayscale(100%) blur(10px)" }} // Start in grayscale and blurred
        animate={{
          filter: inView
            ? "grayscale(0%) blur(0px)"
            : "grayscale(100%) blur(5px)", // Animate to color and clear
        }}
        transition={{ duration: 0.9 }} // Duration of the image transition
      >
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={300}
          className="rounded-lg shadow-lg object-cover"
        />
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, filter: "blur(10px)", y: 10 }} 
        animate={{
          opacity: inView ? 1 : 0, 
          filter: inView ? "blur(0px)" : "blur(10px)", 
          y: inView ? 0 : 10, 
        }}
        transition={{ duration: 0.5 }} // Duration of the text transition
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          {title}
        </h2>
        <ul className="space-y-4 text-lg md:text-xl text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <FaHammer className="text-green-500 mr-4 w-10 h-10" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

const HighQualityMaterialsSection = () => {
  return (
    <section className="py-16 px-8 max-w-7xl mx-auto">
      {featuresData.map((feature, index) => (
        <FeatureSection key={index} {...feature} invert={index % 2 === 0} />
      ))}
    </section>
  );
};

export default HighQualityMaterialsSection;
