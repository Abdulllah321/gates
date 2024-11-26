"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa"; // Import the close icon

const Modal = ({ isOpen, onClose, type }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <motion.div
            className="bg-white rounded-lg p-8 w-11/12 md:w-1/3 shadow-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <FaTimes
                className="text-gray-500 hover:text-red-500 transition"
                size={24}
              />
            </button>

            {/* Modal Content */}
            {type === "quote" ? (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-c-800">Get a Quote</h2>
                <p className="mb-4 text-c-800">Please fill out the form below:</p>
                {/* Quote Form */}
                <form>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <textarea
                    placeholder="Your Message"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <button className="bg-green-600 text-white py-2 px-4 rounded">
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-4 text-c-800">Contact Us</h2>
                <p className="mb-4 text-c-800">Please fill out the form below:</p>
                {/* Contact Form */}
                <form>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <textarea
                    placeholder="Your Message"
                    className="border p-2 mb-2 w-full rounded"
                  />
                  <button className="bg-green-600 text-white py-2 px-4 rounded">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;