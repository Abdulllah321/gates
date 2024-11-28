"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartElement from "@/components/Cart";
import { Suspense } from "react";
import { CartProvider } from "@/components/CartContext";

export default  function RootLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main className=" min-h-[100vh] relative">
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </CartProvider>
  );
}
