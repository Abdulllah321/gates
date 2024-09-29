import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Gate Listings | Standard Gates",
  description:
    "Explore premium gates with high durability and customization options at Standard Gates. Shop now and enjoy seasonal promotions with free shipping.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'Inter, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
        className="antialiased"
      >
        <Header />
        <main className="mt-[62px] min-h-[200vh] relative">
          <div
            className="absolute inset-x-0 top-12 z-[2] mx-2 md:-top-6 md:mx-0"
            style={{ textShadow: "rgb(68, 153, 68) 0px 0px 1px" }}
          >
            <div className="bg-c-green text-c-0 overflow-hidden whitespace-nowrap rounded-lg py-2 md:rounded-none md:pb-2.5 md:pt-9">
              <div className="flex flex-col justify-center mx-auto md:flex-row">
                <div className="pr-1.5 text-xl font-bold leading-[1.20]">
                  Seasonal
                  <br className="hidden md:block" /> Promos
                </div>
                <div className="pl-1.5 md:text-left">
                  •&nbsp;<span className="font-semibold">5%</span> Off Gates
                  &amp; Fences +<span className="font-semibold">Free</span>{" "}
                  Shipping *
                  <br />
                  •&nbsp;Order 2 Or More For An Additional
                  <span className="font-semibold">5%</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}

