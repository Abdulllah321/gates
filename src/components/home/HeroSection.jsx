import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen px-8 pb-12 bg-black text-white flex items-end">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.jpg"
          alt="Gates and Fences Accessories"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="opacity-80" // Adjust opacity for a subtle overlay effect
        />
        <div className="absolute inset-0 bg-black opacity-10"></div>{" "}
        {/* Dark overlay */}
      </div>

      <div className="flex  max-w-7xl mx-auto bottom-24 relative justify-between flex-col md:flex-row">
        {/* Left Content - Heading */}
        <div className="relative z-10 mb-4 max-w-[50%]">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Quality Gates, Fences, and Accessories
          </h1>
        </div>

        {/* Right Content - Paragraph and Buttons */}
        <div className="relative z-10 max-w-md mb-4">
          <p className="text-lg sm:text-xl md:text-2xl mb-4">
            Discover premium gates, fencing, and accessories crafted for
            durability and style. Perfect for any property’s security and
            aesthetic needs.
          </p>

          {/* Gates/Fences Button */}
          <button
            onClick={() => router.push("/gates")}
            className="mt-2 px-6 py-3 bg-green-200 text-black font-semibold rounded-md hover:bg-green-400 transition-all mr-2 shadow-lg hover:scale-105 transform transition duration-300"
          >
            Shop Gates & Fences
          </button>

          {/* Accessories Button */}
          <button
            onClick={() => router.push("/accessories")}
            className="mt-2 px-6 py-3 border border-green-500 text-green-500 font-semibold rounded-md hover:bg-green-500 hover:text-black transition-all shadow-lg hover:scale-105 transform transition duration-300"
          >
            Shop Accessories
          </button>
        </div>
      </div>
    </section>
  );
}
