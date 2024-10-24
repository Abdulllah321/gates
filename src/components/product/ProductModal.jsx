// components/ProductModal.js
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import ProductForm from "./ProductForm";

const ProductModal = ({ showModal, onClose, currentProduct, onSubmit }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="relative p-6 text-white rounded-md bg-c-800 w-96">
            <h2 className="mb-4 text-xl font-semibold">
              {currentProduct ? "Edit Product" : "Add Product"}
            </h2>
            <ProductForm currentProduct={currentProduct} onSubmit={onSubmit} />
            <button
              type="button"
              onClick={onClose}
              className="absolute text-red-500 top-2 right-2"
            >
              <FaXmark />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
