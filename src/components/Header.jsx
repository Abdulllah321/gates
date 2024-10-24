"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlMagnifier,
  SlSocialDribbble,
  SlSocialInstagram,
} from "react-icons/sl";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoAppsOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import { TiSocialFacebook } from "react-icons/ti";
import { FaFacebookF, FaTwitter } from "react-icons/fa6";
import Cart from "./Cart";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  const containerRef = useRef(null);

  const closeAll = () => {
    setSearchOpen(false);
    setSidebarOpen(false);
    setCartOpen(false);
  };

  // Handle closing on clicking outside of elements
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="top-0 z-50 w-full bg-transparent"
      aria-label="Main navigation"
    >
      <div
        className="relative flex items-center justify-between px-4 py-6 mx-auto max-w-7xl"
        ref={containerRef}
      >
        {/* Left Navigation */}
        <nav className="hidden space-x-8 md:flex">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-lg font-medium text-[--foreground] hover:text-gray-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/gates"
                className="text-lg font-medium text-[--foreground] hover:text-gray-300"
              >
                Gates/Fences
              </Link>
            </li>
            <li>
              <Link
                href="/accessories"
                className="text-lg font-medium text-[--foreground] hover:text-gray-300"
              >
                Accessories
              </Link>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div
          className="absolute hidden transform -translate-x-1/2 left-1/2 md:block"
          id="logo"
          aria-label="Website logo"
        >
          <Image src="/logo.png" width={120} height={100} alt="Logo" />
        </div>
        <div
          className="relative block md:hidden"
          id="logo"
          aria-label="Website logo"
        >
          <Image src="/logo.png" width={120} height={100} alt="Logo" />
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-4">
          {/* Bag Icon */}
          <div className="relative">
            <div
              onClick={() => setCartOpen(!cartOpen)}
              className="cursor-pointer"
            >
              <MdOutlineShoppingBag
                className="text-2xl text-[--foreground] cursor-pointer"
                aria-label="Shopping cart"
              />
              <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 text-xs text-[--foreground] bg-yellow-500 rounded-full">
                {cart && cart.length}
              </span>
            </div>
            {/* Cart Popup */}
            <AnimatePresence>
              {cartOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute z-50 hidden origin-top-right md:block"
                >
                  <div className="absolute z-50 flex-col items-center justify-center hidden p-4 py-10 overflow-y-auto text-white shadow-lg -right-0 min-w-80 bg-dark h-96 md:flex">
                    {cart.length ? (
                      <>
                        <Cart />
                        <Link href="/checkout">
                          <button className="w-full px-3 py-3 mt-3 transition-colors bg-transparent border rounded-md border-c-prime hover:bg-c-prime">
                            Proceed To Checkout
                          </button>
                        </Link>{" "}
                      </>
                    ) : (
                      <>
                        <MdOutlineShoppingBag className="size-10" />
                        <div className="mt-4 text-lg">
                          No products in the cart.
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
              {cartOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed top-0 left-0 z-50 block origin-center md:hidden"
                >
                  <div className="flex flex-col items-center justify-center w-screen h-screen p-4 text-white md:hidden bg-dark">
                    <MdOutlineShoppingBag className="size-10" />
                    <div className="mt-4 text-lg">No products in the cart.</div>
                  </div>
                  <IoCloseOutline
                    className="absolute text-white right-4 size-6 top-2"
                    onClick={() => setCartOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Icon */}
          <div className="relative">
            <SlMagnifier
              className="text-2xl text-[--foreground] cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            />
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ y: "-100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%", transition: { delay: 0.6 } }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  className="fixed top-0 left-0 z-50 w-full bg-dark md:h-[30rem] h-[15rem] p-5 sm:p-10 md:p-20 text-white"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { delay: 0 } }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    className="flex items-center justify-between mb-4"
                  >
                    <Image
                      src="/logo-inverse.png"
                      width={120}
                      height={100}
                      alt="Logo"
                    />

                    {/* Close Icon with Scaling and Rotating */}
                    <motion.div
                      initial={{ scale: 0.5, rotate: 0, opacity: 0 }}
                      animate={{ scale: 1, rotate: 360, opacity: 1 }}
                      exit={{ scale: 0.5, rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      whileHover={{ rotate: -90 }}
                    >
                      <IoCloseOutline
                        className="transition-all cursor-pointer md:size-16 size-10"
                        onClick={() => setSearchOpen(false)}
                        aria-label="Close search"
                      />
                    </motion.div>
                  </motion.div>
                  <div className="relative bottom-0 flex items-center justify-center w-full top-20">
                    <motion.input
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { delay: 0 } }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      type="text"
                      placeholder="Type Words and hit enter"
                      className="w-[90%] md:w-[70%] lg:w-[50%] pb-2 bg-transparent outline-none text-[1.2rem] sm:text-[2rem] mx-auto"
                      aria-label="Search input"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { delay: 0 } }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <SlMagnifier className="absolute right-[5%] -translate-y-1/2 md:size-10 size-6 top-1/2" />
                    </motion.div>
                    <motion.div
                      initial={{
                        scaleX: 0,
                        translateX: "-50%",
                        bottom: "-1rem",
                        background: "#6B7280",
                      }}
                      animate={{
                        scaleX: 1,
                        translateX: "-50%",
                        bottom: "-1rem",
                        background: ["#fff", "#6B7280"],
                      }}
                      exit={{
                        scaleX: 0,
                        translateX: "-50%",
                        bottom: "-1rem",
                        background: ["#fff", "#6B7280"],
                        transition: { delay: 0, duration: 0.6 },
                      }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      className="w-[90%] md:w-[70%] lg:w-[50%] absolute left-1/2 bg-gray-500 h-px origin-left bottom-[0.5rem] sm:bottom-[-1rem]" // Added responsive bottom classes
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Icon */}
          <div className="relative">
            <IoAppsOutline
              className="text-2xl text-[--foreground] cursor-pointer"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Sidebar menu"
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 z-50 flex flex-col justify-between h-full p-12 text-gray-800 bg-white w-96"
          >
            <div className="flex items-center justify-between mb-4">
              <Image src="/logo.png" width={120} height={100} alt="Logo" />
              <button
                type="button"
                className="p-2 rounded-full size-12 bg-[--background] flex items-center justify-center"
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
              >
                <IoCloseOutline />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link href="#" className="text-lg font-medium text-gray-800">
                Home
              </Link>
              <Link href="#" className="text-lg font-medium text-gray-800">
                About
              </Link>
              <Link href="#" className="text-lg font-medium text-gray-800">
                Services
              </Link>
              <Link href="#" className="text-lg font-medium text-gray-800">
                Contact
              </Link>
            </nav>
            <footer className="flex justify-between mt-4">
              <div className="flex space-x-4">
                <Link href="#">
                  <TiSocialFacebook
                    className="text-2xl"
                    aria-label="Facebook"
                  />
                </Link>
                <Link href="#">
                  <SlSocialDribbble
                    className="text-2xl"
                    aria-label="Dribbble"
                  />
                </Link>
                <Link href="#">
                  <SlSocialInstagram
                    className="text-2xl"
                    aria-label="Instagram"
                  />
                </Link>
                <Link href="#">
                  <FaTwitter className="text-2xl" aria-label="Twitter" />
                </Link>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
