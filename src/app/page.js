"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/gates");
  }, []);
  return <div>Home</div>;
};

export default Home;
