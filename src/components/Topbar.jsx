"use client";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

const Topbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useUser();
  const hamburgerRef = useRef(null);

  const handleToggle = () => {
    toggleSidebar();
  };

  useEffect(() => {
    if (hamburgerRef.current) {
      gsap.to(hamburgerRef.current, {
        rotate: isSidebarOpen ? 180 : 0,
        duration: 0.3,
      });
    }
  }, [isSidebarOpen]);

  return (
    <div className="fixed top-0 right-0 flex items-center justify-between h-16 px-4 shadow-lg bg-c-900 text-c-0 left-0 md:ml-64 ml-0 z-20">
      <button onClick={handleToggle} className="md:hidden">
        <motion.div
          ref={hamburgerRef}
          initial={{ rotate: 0 }}
          animate={{ rotate: isSidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center w-8 h-8"
        >
          <span className="block w-6 h-1 mb-1 bg-c-0"></span>
          <span className="block w-6 h-1 mb-1 bg-c-0"></span>
          <span className="block w-6 h-1 mb-1 bg-c-0"></span>
        </motion.div>
      </button>
      {user && (
        <span className="mr-4 text-c-50">
          Logged in as: <strong>{user.username}</strong>
        </span>
      )}
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />{" "}
      </SignedIn>
    </div>
  );
};

export default Topbar;
