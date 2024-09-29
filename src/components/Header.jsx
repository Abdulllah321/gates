"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import useRouter

const Header = () => {
    const pathname = usePathname();
   const [logoActive, setLogoActive] = useState(false);

   useEffect(() => {
     const handleScroll = () => {
       const scrollTop = window.scrollY;
       const headerHeight = 56;
       setLogoActive(scrollTop > headerHeight);
     };

     window.addEventListener("scroll", handleScroll);
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);

   const getActiveLinkClass = (path) => {
     return pathname === path ? "bg-c-prime text-c-1000" : "text-c-100";
   };

   const logoVariants = {
     hidden: { opacity: 0, scale: 0.9 },
     visible: { opacity: 1, scale: 1 },
     exit: { opacity: 0, scale: 0.9 },
   };

   const textVariants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1 },
     exit: { opacity: 0 },
   };
  return (
    <nav className="fixed top-0 left-0 right-0 z-20 shadow-lg bg-c-1000 h-14 print:hidden">
      <div className="absolute top-2 left-2">
        <button
          type="button"
          className="p-2 transition-colors rounded hover:bg-c-800 bg-c-1000"
        >
          <span className="sr-only">Open main menu</span>{" "}
          <svg width="24" height="24">
            <path
              d="M 2 3 L 22 3"
              className="stroke-current text-c-prime"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              d="M 2 12 L 22 12"
              className="stroke-current text-c-prime"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
            <path
              className="stroke-current text-c-prime"
              d="M 2 21 L 22 21"
              strokeWidth="3"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      </div>
      <span>
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocI6b8KI3vQbKvqVrxzdRh6KLSFilkIAytYbOWaYlMfeTmshocA=s96-c"
          alt="avatar"
          className="border-c-1000 bg-c-1000 absolute top-1.5 left-14 z-10 hidden h-11 w-11 cursor-pointer rounded-full border-2 sm:block"
        />
      </span>
      <div className="text-c-100 absolute inset-x-20 top-[0.9rem] hidden grid-cols-6 text-center text-lg font-semibold md:grid xl:grid-cols-5">
        <div className="col-span-1">
          <Link
            href="/gates"
            className={`nav-bar-links ${getActiveLinkClass("/gates")}`}
          >
            Gate
          </Link>
        </div>
        <div className="col-span-1">
          <Link
            href="/fence"
            className={`nav-bar-links ${getActiveLinkClass("/fence")}`}
          >
            Fence
          </Link>
        </div>
        <div className="col-span-2 xl:col-span-1" />
        <div className="col-span-1">
          <Link
            href="/category/access"
            className={`nav-bar-links ${getActiveLinkClass(
              "/category/access"
            )}`}
          >
            Extras
          </Link>
        </div>
        <div className="col-span-1">
          <Link
            href="/category/parts"
            className={`nav-bar-links ${getActiveLinkClass("/category/parts")}`}
          >
            Parts
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {/* Logo with Animation */}
        {logoActive ? (
          <motion.div
            className="absolute inset-x-0 pointer-events-none top-3"
            key="logo"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={logoVariants}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/standardgates-222619.appspot.com/o/logos%2Fmark.png?alt=media"
              alt="Logo"
              loading="eager"
              decoding="async"
              className="mx-auto -mt-1 h-10 cursor-pointer pointer-events-auto transition-all duration-300 !opacity-100"
            />
          </motion.div>
        ) : (
          <motion.div
            className="absolute inset-x-0 pointer-events-none top-3"
            key="text"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.5 }}
          >
            <div className="text-c-50 text-center text-2xl font-bold uppercase xl:mt-[-2px] xl:text-3xl">
              <span className="cursor-pointer pointer-events-auto select-none">
                <span className="inline-block title">Standard</span>
                <span className="inline-block title">Gates</span>
                <span className="text-sm align-text-top">™</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="border-c-1000 bg-c-1000 hover:bg-c-800 absolute top-1.5 right-14 z-10 hidden cursor-pointer rounded-full border-2 p-2 sm:block">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          className="w-6 h-6 text-c-200"
        >
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </div>

      {/* User Menu Button */}
      <div className="absolute z-10 right-2">
        <button type="button" className="relative">
          <span className="sr-only">Open main menu</span>
          <div className="absolute top-[-9px] right-0 z-10 rounded bg-c-1000 p-2 transition-colors hover:bg-c-800">
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              className="w-6 h-6 text-c-prime"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Header;
