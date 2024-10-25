"use client";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Quality Craftsmanship",
    description:
      "Our products are made from the highest quality materials, ensuring durability and longevity.",
    icon: "/quality-icon.png", // Add a suitable icon image
  },
  {
    title: "Custom Solutions",
    description:
      "We offer customizable options to perfectly fit your needs and preferences.",
    icon: "/custom-icon.png", // Add a suitable icon image
  },
  {
    title: "Exceptional Support",
    description:
      "Our dedicated support team is here to assist you at every step of the way.",
    icon: "/support-icon.png", // Add a suitable icon image
  },
  {
    title: "Timely Delivery",
    description:
      "We prioritize punctual delivery to ensure your project stays on track.",
    icon: "/delivery-icon.png", // Add a suitable icon image
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-gray-800">
          Why Choose Us?
        </h2>
        <p className="text-lg mb-12 text-gray-600">
          Discover the key reasons why we are the best choice for your gates,
          fences, and accessories.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img
                src={reason.icon}
                alt={reason.title}
                className="mb-4 w-16 h-16 mx-auto object-cover"
              />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
