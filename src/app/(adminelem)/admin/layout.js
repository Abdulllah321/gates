"use client";
import { useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State for sidebar toggle

  useEffect(() => {
    // Check the session status
    setLoading(status === "loading");
  }, [status]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const loaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensure it's above all other content
  };

  const spinnerStyle = {
    border: "8px solid #f3f3f3", // Light grey
    borderTop: "8px solid #FACC15",
    borderRadius: "50%",
    width: "60px", // Adjust size as needed
    height: "60px", // Adjust size as needed
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      {loading ? (
        <div style={loaderStyle}>
          <div style={spinnerStyle}></div>
        </div>
      ) : (
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-grow w-full mt-16 md:ml-64">
            {" "}
            {/* Adjust margin for the sidebar */}
            <Topbar
              toggleSidebar={toggleSidebar}
              session={session}
              isSidebarOpen={isSidebarOpen}
            />
              <div className="p-6">{children}</div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
