"use client";
import { useCart } from "@/components/CartContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const item = {
      ...product,
      type: "product",
    };
    addToCart(item); // Add the item to the cart using context
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Individual Parts</h1>
      <p className="mb-8 text-lg text-center">
        Get even more custom and build your own gate & fence kit with these
        individual parts.
      </p>

      {/* Loader */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
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
                <a className="font-semibold text-c-600">
                  {product.description}
                </a>
              </div>

              {/* Price and Button */}
              <button
                className={`btn h-12 flex-grow rounded-full border-[3px] bg-c-prime relative`}
                type="button"
                onClick={() => handleAddToCart(product)}
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
      )}
    </div>
  );
};

export default Products;
