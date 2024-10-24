"use client";
import ProductModal from "@/components/product/ProductModal";
import ProductTable from "@/components/product/ProductTable";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSpinner,
  FaExclamationCircle,
  FaSearch,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const itemsPerPage = 5; // Set number of items per page

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddEditProduct = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteProduct = async () => {
    if (productToDelete) {
      await fetch(`/api/products/${productToDelete._id}`, { method: "DELETE" });
      fetchProducts();
      setShowDeleteConfirmation(false);
      setProductToDelete(null);
    }
  };

  const handleSubmit = async (formData) => {
    if (currentProduct) {
      await fetch(`/api/products/${currentProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }
    setShowModal(false);
    fetchProducts();
  };

  // Pagination handler
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="p-4">
      {/* Use the Breadcrumbs component */}
      <Breadcrumbs />

      <h1 className="text-2xl font-semibold">Product Management</h1>

      {/* Search and Add Product Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute transform -translate-y-1/2 left-3 top-1/2 text-c-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md"
          />
        </div>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setShowModal(true);
          }}
          className="flex items-center p-2 rounded-md bg-c-prime text-c-0"
        >
          <FaPlus className="mr-2" />
          Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="mr-2 animate-spin text-c-prime" />
          <span>Loading products...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-center text-c-500">
          <FaExclamationCircle className="mr-2 text-3xl" />
          <span>No products found. Try adjusting your search.</span>
        </div>
      ) : (
        <ProductTable
          products={currentProducts}
          onEdit={handleAddEditProduct}
          onDelete={handleDeleteProduct}
        />
      )}

      {/* Pagination Controls */}
      {filteredProducts.length > 0 && (
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || filteredProducts.length === 0}
            className="px-4 py-2 rounded-md bg-c-prime text-c-0 disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={
              currentPage === totalPages || filteredProducts.length === 0
            }
            className="px-4 py-2 rounded-md bg-c-prime text-c-0 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <ProductModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        currentProduct={currentProduct}
        onSubmit={handleSubmit}
      />
      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirmation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="p-8 rounded-lg shadow-lg bg-c-800 w-96"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-center text-c-0">
                Confirm Delete
              </h2>
              <p className="mb-2 text-center text-c-300">
                Are you sure you want to delete the following product?
              </p>
              <div className="p-4 mb-4 border rounded-md border-c-500">
                <p className="text-lg font-bold text-c-0">
                  {productToDelete?.name}
                </p>
                <p className="text-c-200">{productToDelete?.description}</p>
                <p className="text-c-0">
                  Price:{" "}
                  <span className="font-bold">
                    ${productToDelete?.price.toFixed(2)}
                  </span>
                </p>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 text-white transition duration-200 bg-gray-600 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  className="px-4 py-2 text-white transition duration-200 bg-red-600 rounded-md hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductManagement;
