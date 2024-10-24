import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa"; // Import the upload icon from react-icons

const ImageUploader = ({ onImageUpload, multiple = false }) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [dragging, setDragging] = useState(false); // State to track if dragging

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setImageUploading(true);

    try {
      const response = await fetch("/uploads", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      return data.url; // Return the URLs from the response
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; // Return null on error
    } finally {
      setImageUploading(false);
    }
  };

  const handleImageChange = async (files) => {
    if (files.length > 0) {
      const uploadPromises = Array.from(files).map((file) => uploadImage(file));

      try {
        const uploadedUrls = await Promise.all(uploadPromises);
        const validUrls = uploadedUrls.filter((url) => url !== null);
        onImageUpload(validUrls);
      } catch (error) {
        console.error("Error uploading some images:", error);
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files; // Get all selected files
    handleImageChange(files);
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
    setDragging(false); // Reset dragging state
    const files = e.dataTransfer.files; // Get dropped files
    handleImageChange(files); // Handle the files
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior
    setDragging(true); // Set dragging state
  };

  const handleDragLeave = () => {
    setDragging(false); // Reset dragging state when leaving
  };

  return (
    <div className="mb-4">
      <label className="block mb-1">Image</label>
      <div
        className={`flex items-center justify-center w-full h-32 transition border-2 border-dashed rounded-md cursor-pointer 
          ${
            dragging
              ? "border-blue-500 bg-gray-100"
              : "border-c-500 hover:bg-c-700"
          }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="image-upload"
          multiple={multiple}
        />
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-full h-full"
        >
          {imageUploading ? (
            <div className="loader"></div>
          ) : (
            <div className="flex flex-col items-center">
              <FaCloudUploadAlt className="mb-2 text-c-500" size={40} />
              {/* Upload icon */}
              <span className="text-c-500">Upload Image</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
