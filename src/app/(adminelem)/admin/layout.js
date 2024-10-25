"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // Import useRouter
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Layout({ children }) {
  const { isLoaded, user } = useUser();
  const router = useRouter(); // Initialize router for navigation
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Set loading state based on Clerk's isLoaded
    setLoading(!isLoaded);

    if (isLoaded && !user) {
      router.push("/sign-in");
    }
  }, [isLoaded, user, router]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const loaderStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const spinnerStyle = {
    border: "8px solid #f3f3f3",
    borderTop: "8px solid #FACC15",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
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
            <Topbar
              toggleSidebar={toggleSidebar}
              user={user}
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
