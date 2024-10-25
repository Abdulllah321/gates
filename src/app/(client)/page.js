"use client"
import HeroSection from "@/components/home/HeroSection";
import HighQualityMaterialsSection from "@/components/home/HighQualityMaterialsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CallToAction from "@/components/home/CallToAction"; // Import the CallToAction component
import React from "react";

const Home = () => {
  return (
    <main>
      <HeroSection />
      <div className="bg-gray-300 h-px" />
      <ServicesSection />
      <div className="via-gray-300 bg-gradient-to-r from-transparent to-transparent  h-px" />
      <HighQualityMaterialsSection />
      <div className="from-yellow-600 bg-gradient-to-r via-transparent to-yellow-600  h-px" />
      <WhyChooseUs />
      <CallToAction /> {/* Add the CallToAction section */}
    </main>
  );
};

export default Home;
