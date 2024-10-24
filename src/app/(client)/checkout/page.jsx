"use client";
import Cart from "@/components/Cart";
import ImageUploader from "@/components/product/ImageUploader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderForm = () => {
  const { push } = useRouter();
  const [formData, setFormData] = useState({
    customer: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    shipping_address: {
      street: "",
      city: "",
      state: "",
      zip_code: "",
    },
    billing_address: {
      same_as_shipping: true,
      street: "",
      city: "",
      state: "",
      zip_code: "",
    },
    images: [],
    requests: "",
    upgrades: [],
    shipping: {
      estimated_shipping_time: "4 Weeks",
      shipping_cost: 0,
    },
    total_amount: 0,
    items: [],
  });

  const handleImageUpload = (urls) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      images: [...prevFormData.images, ...urls], // Add new image URLs to the existing array
    }));
  };

  const handleNestedChange = (e, field, nestedField) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [nestedField]: value,
      },
    }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      billing_address: {
        ...prev.billing_address,
        same_as_shipping: checked,
      },
    }));
  };

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: cartItems,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Sending the formData as a POST request to your backend API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify that you're sending JSON
        },
        body: JSON.stringify(formData), // Convert formData object to JSON string
      });

      if (response.ok) {
        const data = await response.json();
        push(`/order/${data.order_id}`);
      } else {
        console.error("Error submitting order:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle any other errors (like network issues)
    }
  };

  return (
    <div className="container p-6 mx-auto my-8 text-white bg-gray-900 rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold text-center text-yellow-500">
        Place Your Order
      </h1>
      <Cart />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Information */}
        <h2 className="text-2xl font-bold text-yellow-300">
          Customer Information
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["first_name", "last_name", "email", "phone"].map((field, index) => (
            <div key={index}>
              <label className="block mb-2 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData.customer[field]}
                onChange={(e) => handleNestedChange(e, "customer", field)}
                required
                className="w-full p-2 text-black text-white transition border border-gray-600 rounded focus:outline-none focus:ring focus:ring-yellow-500 bg-white/10"
              />
            </div>
          ))}
        </div>
        {/* Shipping Address */}
        <h2 className="text-2xl font-bold text-yellow-300">Shipping Address</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["street", "city", "state", "zip_code"].map((field, index) => (
            <div key={index}>
              <label className="block mb-2 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type="text"
                name={field}
                value={formData.shipping_address[field]}
                onChange={(e) =>
                  handleNestedChange(e, "shipping_address", field)
                }
                required
                className="w-full p-2 text-black text-white transition border border-gray-600 rounded focus:outline-none focus:ring focus:ring-yellow-500 bg-white/10"
              />
            </div>
          ))}
        </div>
        {/* Billing Address */}
        <h2 className="text-2xl font-bold text-yellow-300">Billing Address</h2>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={formData.billing_address.same_as_shipping}
            onChange={handleCheckboxChange}
            id="shipping"
            className="!w-2 !h-2 border-none border-transparent rounded-sm appearance-none cursor-pointer !bg-transparent checked:!bg-white checked:border-transparent ring-1 ring-offset-4 ring-offset-dark ring-white transition-all mr-3"
          />
          <label htmlFor="shipping">Same as Shipping Address</label>
        </div>
        {!formData.billing_address.same_as_shipping && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {["street", "city", "state", "zip_code"].map((field, index) => (
              <div key={index}>
                <label className="block mb-2 capitalize">
                  {field.replace("_", " ")}
                </label>
                <input
                  type="text"
                  name={`billing_${field}`}
                  value={formData.billing_address[field]}
                  onChange={(e) =>
                    handleNestedChange(e, "billing_address", field)
                  }
                  required
                  className="w-full p-2 text-black text-white transition border border-gray-600 rounded focus:outline-none focus:ring focus:ring-yellow-500 bg-white/10"
                />
              </div>
            ))}
          </div>
        )}
        {/* Images Upload */}
        <h2 className="text-2xl font-bold text-yellow-300">Upload Images</h2>
        <ImageUploader multiple={true} onImageUpload={handleImageUpload} />{" "}
        <div>
          <h3>Uploaded Images:</h3>
          <ul>
            {formData.images.map((image, index) => (
              <li key={index}>
                <Image
                layout
                  src={image}
                  alt={`Uploaded Image ${index + 1}`}
                  width={100}
                />
              </li>
            ))}
          </ul>
        </div>
        <p className="text-gray-400">
          Choose images to upload or drag and drop them here.
        </p>
        {/* Requests */}
        <h2 className="text-2xl font-bold text-yellow-300">Requests</h2>
        <textarea
          name="requests"
          value={formData.requests}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, requests: e.target.value }))
          }
          placeholder="Optional. May change price or be denied."
          className="w-full p-2 text-black text-white transition border border-gray-600 rounded focus:outline-none focus:ring focus:ring-yellow-500 bg-white/10"
        />
        {/* Upgrades (checkbox example) */}
        <h2 className="text-2xl font-bold text-yellow-300">Upgrades</h2>
        <div className="space-y-2">
          {[
            { type: "Expedite", price: 500 },
            { type: "Liftgate", price: 85 },
          ].map((upgrade, index) => (
            <div key={index}>
              <input
                type="checkbox"
                onChange={(e) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setFormData((prev) => ({
                      ...prev,
                      upgrades: [
                        ...prev.upgrades,
                        { upgrade_type: upgrade.type, price: upgrade.price },
                      ],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      upgrades: prev.upgrades.filter(
                        (u) => u.upgrade_type !== upgrade.type
                      ),
                    }));
                  }
                }}
                id={`upgrade_${index}`}
                className="!w-2 !h-2 border-none border-transparent rounded-sm appearance-none cursor-pointer !bg-transparent checked:!bg-white checked:border-transparent ring-1 ring-offset-4 ring-offset-dark ring-white transition-all mr-3"
              />
              <label
                htmlFor={`upgrade_${index}`}
              >{`${upgrade.type} - $${upgrade.price}`}</label>
            </div>
          ))}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white transition bg-c-prime rounded hover:bg-c-prime"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
