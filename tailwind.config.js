/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c: {
          0: "#ffffff", // --c-0
          50: "#f9fafb", // --c-50
          100: "#f3f4f6", // --c-100
          200: "#e5e7eb", // --c-200
          300: "#d1d5db", // --c-300
          400: "#9ca3af", // --c-400
          500: "#6b7280", // --c-500
          600: "#4b5563", // --c-600
          700: "#374151", // --c-700
          800: "#1f2937", // --c-800
          900: "#111827", // --c-900
          1000: "#000000", // --c-1000
          prime: "rgb(250 204 21)", // --c-prime
          "prime-light": "rgb(253 224 71)", // --c-prime-light
          "prime-dark": "rgb(234 179 8)", // --c-prime-dark
          "prime-black": "rgb(202 138 4)", // --c-prime-black
          green: "rgb(34 197 94)", // --c-green
          blue: "rgb(59 130 246)", // --c-blue
          red: "rgb(239 68 68)", // --c-red
          brown: "#bc9055", // --c-brown
        },
      },
    },
  },
  plugins: [],
};
