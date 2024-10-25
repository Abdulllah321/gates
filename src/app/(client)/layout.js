import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartElement from "@/components/Cart";
import { Suspense } from "react";

export default async function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className="mt-[62px] min-h-[100vh] relative">
        <Suspense>{children}</Suspense>
      </main>
      <Footer />
    </>
  );
}
