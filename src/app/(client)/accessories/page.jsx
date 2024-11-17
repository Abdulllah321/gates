"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const item = {
      ...product,
      type: "product",
    };
    existingCart.push(item);

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Individual Parts</h1>
      <p className="mb-8 text-lg text-center">
        Get even more custom and build your own gate & fence kit with these
        individual parts.
      </p>
      <div className="grid grid-cols-1 gap-6 ">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex items-center p-6 bg-white rounded-lg shadow-lg"
          >
            {/* Product Image */}
            <div className="flex-shrink-0 w-24 h-24">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="object-cover rounded-md"
                width={96}
                height={96}
              />
            </div>

            {/* Product Info */}
            <div className="flex-grow ml-6">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                {product.name}
              </h2>
              <a className="font-semibold text-c-600 ">
                {product.description}
              </a>
            </div>

            {/* Price and Button */}
            <button
              className={`btn h-12 flex-grow rounded-full border-[3px] bg-c-prime relative`}
              type="button"
              onClick={() => handleAddToCart(product)} // Call the add to cart function with the product
            >
              <div className="z-5 absolute inset-x-5 top-[9px] text-left">
                <div className="-mt-0.5 text-xl text-c-900">Add To Cart</div>
                <div className="absolute -top-[5px] -right-2 rounded-full bg-c-0 px-3 pb-1 pt-1 font-semibold text-c-green">
                  <span className="px-0.5 font-medium">${product.price}</span>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
