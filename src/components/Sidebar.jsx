"use client";
import { useState } from "react";
import { FaBox, FaClipboardList, FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/admin" },
    { name: "Products", icon: <FaBox />, path: "/admin/products" },
    { name: "Orders", icon: <FaClipboardList />, path: "/admin/orders" },
    { name: "Settings", icon: <FaUserCog />, path: "/admin/settings" },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 h-full p-6 bg-c-800 text-c-0 shadow-lg transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <button onClick={toggleSidebar} className="absolute top-4 right-4 md:hidden">
        <span className="text-c-0">✖</span> {/* Close button */}
      </button>
      <h2 className="mb-6 text-2xl font-semibold text-center">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link href={item.path} passHref>
              <div
                className={`flex items-center p-2 rounded-md cursor-pointer transition duration-200 
                  ${pathname === item.path ? "bg-c-prime" : "hover:bg-c-prime-light"}`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
