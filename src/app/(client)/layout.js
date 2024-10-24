import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSession } from "next-auth/react";
import CartElement from "@/components/Cart";

export default async function RootLayout({ children }) {
  const session = await getSession();
  return (
    <>
      <Header />
      <main className="mt-[62px] min-h-[100vh] relative">{children}</main>
      <Footer />
    </>
  );
}
