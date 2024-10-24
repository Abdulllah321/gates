"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.price), // Ensure price is numeric
      0
    );
    setTotalAmount(total);
  }, [cartItems]);

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((item, i) => item._id !== index);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
  };

  // Utility function to format gate/fence configuration
  const formatGateFenceTitle = (item) => {
    const kitType = item.kitValue.selected === 1 ? "Swing" : "Slide";
    const panelType = item.panelValue.selected === 0 ? "Single" : "Dual";
    const styleType =
      item.selectedStyle.selected === 0
        ? "Rectangular"
        : item.selectedStyle.selected === 1
        ? "Arch"
        : item.selectedStyle.selected === 4
        ? "Center Peak"
        : item.selectedStyle.selected === 5
        ? "Sectional"
        : null;
    const picketType = {
      1: "Cedar Wood",
      2: "Treated Pine White",
      3: "Red Wood",
      4: "Hard Wood Southe",
    }[item.selectedPicket.selected];
    const accessType = {
      0: "New Post",
      1: "InHouse Post System",
      2: "Retrofit",
    }[item.selectedAccess.selected];
    const ironWood = {
      0: "Metal Frame",
      1: "Fill Material",
    }[item.selectedIronWood.selected];

    return `${item.ft}ft ${item.inch}in, ${kitType}, ${panelType} ${
      item.panelValue.selected === 0 ? item.panelValue.direction : ""
    } ${styleType} ${picketType}, ${ironWood}, ${
      item.selectedIronWood.selected == 0
        ? item.selectedIronWood.subOption
        : null
    }, ${item.selectedIronWood.color || ""}, ${
      item.selectedIronWood.finish || ""
    }, ${accessType}`;
  };

  const renderCartItem = (item) => {
    if (item.type === "product") {
      return (
        <tr key={item._id} className="hover:bg-gray-800">
          <td className="flex items-center px-4 py-2 border-b border-gray-700">
            <Image
              src={item.imageUrl}
              alt={item.name}
              className="object-cover w-16 h-16 mr-4 rounded-md"
              width={64}
              height={64}
            />
          </td>
          <td className="px-4 py-2 border-b border-gray-700">{item.name}</td>
          <td className="px-4 py-2 border-b border-gray-700">
            ${parseFloat(item.price).toFixed(2)}
          </td>
          <td className="px-4 py-2 border-b border-gray-700">
            <button
              className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    } else if (["gate", "fence"].includes(item.type)) {
      return (
        <div
          key={item._id}
          className="grid grid-cols-1 gap-4 p-4 mb-4 bg-gray-800 rounded-md sm:grid-cols-1"
        >
          <div>
            <h3 className="text-lg font-semibold text-yellow-500">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}{" "}
              Configuration
            </h3>
            <p className="text-sm">{formatGateFenceTitle(item)}</p>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-lg font-bold text-yellow-300">
              ${parseFloat(item.price).toFixed(2)}
            </span>
            <button
              className="px-2 py-1 mt-2 text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container p-6 py-8 mx-auto text-white">
      <h1 className="my-8 text-2xl font-bold text-yellow-500">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-yellow-400">Your cart is empty.</p>
      ) : (
        <div>
          {/* Products table */}
          <table className="min-w-full mb-6">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Item</th>
                <th className="px-4 py-2 border-b border-gray-700">Details</th>
                <th className="px-4 py-2 border-b border-gray-700">Price</th>
                <th className="px-4 py-2 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(
                (item) => item.type === "product" && renderCartItem(item)
              )}
            </tbody>
          </table>

          {/* Gates/Fences grid */}
          <div className="grid grid-cols-1 gap-4">
            {cartItems.map(
              (item) =>
                ["gate", "fence"].includes(item.type) && renderCartItem(item)
            )}
          </div>

          <div className="mt-4 text-lg font-bold text-yellow-300">
            Total Amount: ${totalAmount.toFixed(2)}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Cart;
