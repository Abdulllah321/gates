"use client";
import React, { useState } from "react";
import Modal from "@/components/home/Modal"; // Adjust the path according to your file structure

const CallToAction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative py-16 px-8 bg-yellow-50 text-gray-900 text-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay"
        style={{ backgroundImage: "url('/cta1.png')" }}
      />

      <h2 className="relative text-4xl font-bold mb-4 z-10">
        Ready to Transform Your Space?
      </h2>
      <p className="relative text-lg mb-6 z-10">
        Discover our exceptional range of gates, fences, and accessories
        designed to elevate your property.
      </p>
      <div className="flex justify-center space-x-4 z-10 relative">
        <button
          onClick={() => openModal("quote")}
          className="bg-yellow-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          Get a Quote
        </button>
        <button
          onClick={() => openModal("contact")}
          className="bg-transparent border-2 border-yellow-500 text-yellow-500 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-500 hover:text-white transition"
        >
          Contact Us
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} type={modalType} />
    </section>
  );
};

export default CallToAction;
