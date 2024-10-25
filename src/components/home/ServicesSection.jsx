import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function ServicesSection() {
  const router = useRouter();

  // Example services data
  const services = [
    {
      id: 1,
      image: "/service1.jpg",
      slogan: "Strength & Security",
      name: "Custom Gates",
      description:
        "High-quality, custom-built gates designed for lasting durability and style.",
    },
    {
      id: 2,
      image: "/service2.jpg",
      slogan: "Elegance & Protection",
      name: "Fencing Solutions",
      description:
        "Premium fencing solutions to secure your property with elegance.",
    },
    {
      id: 3,
      image: "/service3.jpg",
      slogan: "Finishing Touches",
      name: "Accessories",
      description:
        "Enhance your gates and fences with our premium accessories.",
    },
  ];

  return (
    <section className="py-24 px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl mx-auto">
          Experience Comfort and Security with Our Expert Services
        </h2>
        <p className="text-xl md:text-2xl text-gray-600">
          Discover our range of premium services designed to meet all your gate,
          fence, and accessory needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {services.map((service) => (
          <div
            key={service.id}
            className=" p-12 flex flex-col items-center text-center transition transform group"
          >
            {/* Service Image */}
            <div className="rounded-full overflow-hidden w-[200px] h-[200px] mb-6 relative  scale-100 group-hover:scale-105 transition-all duration-700">
              <Image
                src={service.image}
                alt={service.name}
                layout="fill" // Ensures the image covers the entire div
                objectFit="cover" // Scales the image to cover the div
                className="rounded-full" // Ensures the image matches the div's rounded style
              />
            </div>

            {/* Service Content */}
            <p className="text-yellow-500 font-medium text-sm uppercase mb-2">
              {service.slogan}
            </p>
            <h3 className="text-2xl font-semibold mb-3">{service.name}</h3>
            <p className="text-lg text-gray-600 mb-6">{service.description}</p>

            {/* Arrow Button */}
            <button
              onClick={() => router.push("/services")}
              className="flex items-center gap-2 text-c-800 text-lg font-medium  group-hover:text-white rounded-full p-2 bg-transparent border border-yellow-600 group-hover:bg-yellow-600   transition-all duration-700"
            >
              <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
