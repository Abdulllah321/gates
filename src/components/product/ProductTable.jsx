// components/ProductTable.js
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden overflow-x-auto">
      <table className="w-full text-white border-collapse rounded-md table-auto bg-c-800">
        <thead>
          <tr className="bg-c-900">
            <th className="p-4 text-left border-b border-c-500">#</th>
            <th className="p-4 text-left border-b border-c-500">Image</th>
            <th className="p-4 text-left border-b border-c-500">Name</th>
            <th className="p-4 text-left border-b border-c-500">Description</th>
            <th className="p-4 text-left border-b border-c-500">Price</th>
            <th className="p-4 text-left border-b border-c-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product._id}
              className={`transition-colors hover:bg-c-700 ${
                index === products.length - 1
                  ? "border-b-0 rounded-b-md"
                  : "border-b border-c-600 rounded-b-none"
              }`}
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-12 h-12 rounded-lg shadow-md"
                />
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.description}</td>
              <td className="p-4">${product.price.toFixed(2)}</td>
              <td className="flex p-4 space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="transition-colors text-c-prime hover:text-c-50"
                  aria-label="Edit Product"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(product)}
                  className="text-red-500 transition-colors hover:text-red-700"
                  aria-label="Delete Product"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
