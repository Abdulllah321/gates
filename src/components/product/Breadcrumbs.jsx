import Link from "next/link";
import React from "react";
import { FaHome, FaChevronRight } from "react-icons/fa"; // Import icons for home and separator

const Breadcrumbs = () => {
  return (
    <nav className="mb-4">
      <ul className="flex items-center space-x-2 text-c-500">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center transition-colors duration-300 text-c-600 hover:text-c-prime"
          >
            <FaHome className="mr-1" /> {/* Home icon */}
            Home
          </Link>
        </li>
        <li>
          <FaChevronRight className="text-c-400" /> {/* Chevron icon */}
        </li>
        <li>
          <Link
            href="/admin/products"
            className="transition-colors duration-300 text-c-600 hover:text-c-prime"
          >
            Products
          </Link>
        </li>
        <li>
          <FaChevronRight className="text-c-400" />
        </li>
        <li className="font-semibold text-c-700">Product Management</li>{" "}
        {/* Highlighted current page */}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
