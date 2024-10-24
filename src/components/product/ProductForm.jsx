// components/ProductForm.js
import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import { FaTrash } from "react-icons/fa"; // Importing the trash icon from react-icons
import { Spinner } from "react-bootstrap"; // Import Spinner component from react-bootstrap
import Image from "next/image";

const ProductForm = ({ currentProduct, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: currentProduct ? currentProduct.name : "",
    description: currentProduct ? currentProduct.description : "",
    price: currentProduct ? currentProduct.price : "",
    imageUrl: currentProduct ? currentProduct.imageUrl : "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url) => {
    setFormData({ ...formData, imageUrl: url });
  };

  const handleImageDelete = () => {
    setFormData({ ...formData, imageUrl: "" }); // Reset imageUrl to an empty string
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    // Simulate an async operation (like an API call)
    await onSubmit(formData);

    setLoading(false); // Set loading to false after the operation
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-1">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-c-900 text-c-0 border-c-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-c-900 text-c-0 border-c-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-md bg-c-900 text-c-0 border-c-500"
          required
        />
      </div>

      {/* Image Upload or Display Section */}
      {formData.imageUrl ? (
        <div className="relative my-2">
          <Image
            layout
            src={formData.imageUrl}
            alt="Uploaded Product"
            className="w-full h-auto border rounded-md border-c-500"
          />
          {/* Delete Icon */}
          <button
            type="button"
            onClick={handleImageDelete}
            className="absolute p-2 text-red-500 bg-white rounded-full top-2 right-2"
            aria-label="Delete Image"
          >
            <FaTrash />
          </button>
        </div>
      ) : (
        <ImageUploader onImageUpload={handleImageUpload} />
      )}

      <button
        type="submit"
        className="flex items-center justify-center px-4 py-2 rounded-md bg-c-prime text-c-0"
        disabled={loading} // Disable the button while loading
      >
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="mr-2" />{" "}
            {/* Show loading spinner */}
            Processing...
          </>
        ) : currentProduct ? (
          "Update Product"
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default ProductForm;
