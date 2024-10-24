import localFont from "next/font/local";
import "./globals.css";

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
export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'Inter, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
        className="antialiased"
      >
          <main className="min-h-[100vh] relative">{children}</main>
      </body>
    </html>
  );
}
