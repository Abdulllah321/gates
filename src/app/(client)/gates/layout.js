import { GatesProvider } from "@/components/GatesContext";

export default async function RootLayout({ children }) {
  return (
    <>
      <GatesProvider>{children}</GatesProvider>
    </>
  );
}
