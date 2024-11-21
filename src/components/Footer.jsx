"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react"; // Import useState for checkbox state
import { FaArrowRight } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";

const Footer = () => {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update state on change
  };

  return (
    <footer className="p-6 bg-[--foreground]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between py-12 space-y-6 md:flex-row">
          <Image
            src={"/IMG-20241117-WA0059.png"}
            alt="logo"
            width={100}
            height={100}
          />
          <div className="text-gray-300">
            <h1 className="mb-2 text-lg font-bold text-white">Office</h1>
            <h5>The USA —</h5>
            <h5>785 15h Street, Office 478</h5>
            <h5>Boston MA, 02116</h5>
            <h5 className="relative mt-2 transition-colors cursor-pointer w-max hover:text-white group">
              info@email.com
              <span className="absolute bottom-0 left-0 w-full h-px transition-all duration-500 origin-left scale-x-100 bg-white group-hover:scale-x-0" />
            </h5>
            <h5 className="text-xl font-semibold text-white">
              +1 800 555 25 69
            </h5>
          </div>
          <div className="text-gray-300">
            <h1 className="mb-2 text-lg font-bold text-white">Links</h1>
            <Link href="/">
              <h5 className="relative mt-2 transition-all duration-500 translate-x-0 cursor-pointer w-max hover:text-white group hover:translate-x-4">
                Home{" "}
                <span className="absolute bottom-0 left-0 w-full h-px transition-all duration-500 origin-left scale-x-0 bg-white group-hover:scale-x-100 " />
              </h5>
            </Link>
            <Link href="/gates">
              <h5 className="relative mt-2 transition-all duration-500 translate-x-0 cursor-pointer w-max hover:text-white group hover:translate-x-4">
                Gates/fences{" "}
                <span className="absolute bottom-0 left-0 w-full h-px transition-all duration-500 origin-left scale-x-0 bg-white group-hover:scale-x-100 " />
              </h5>
            </Link>
            <Link href="/accessories">
              <h5 className="relative mt-2 transition-all duration-500 translate-x-0 cursor-pointer w-max hover:text-white group hover:translate-x-4">
                Accessories{" "}
                <span className="absolute bottom-0 left-0 w-full h-px transition-all duration-500 origin-left scale-x-0 bg-white group-hover:scale-x-100 " />
              </h5>
            </Link>
          </div>
          <div className="text-gray-300 ">
            <h1 className="mb-2 text-lg font-bold text-white">Newsletter</h1>
            <div className="relative flex items-center gap-3">
              <TfiEmail className="size-5" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none"
              />
              <FaArrowRight className="cursor-pointer size-5 hover:text-green-500" />
              <div className="absolute left-0 w-full h-px bg-gray-500 -bottom-3"></div>
            </div>
            {/* Custom Checkbox */}
            <div className="flex items-center mt-5 space-x-4">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="!w-2 !h-2 border-none border-transparent rounded-sm appearance-none cursor-pointer !bg-transparent checked:!bg-white checked:border-transparent ring-1 ring-offset-4 ring-offset-dark ring-white transition-all"
              />
              <label htmlFor="agree">
                I agree to the{" "}
                <span className="underline cursor-pointer">
                  Privacy Policy.
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="pt-3 border-t">
          <h1 className="text-base text-white">
            AncoraThemes © 2024. All Rights Reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
