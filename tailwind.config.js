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
          300: "#d7e67b", // --c-300 (lighter green)
          400: "#c5db5e", // --c-400 (light green)
          500: "#bbd24a", // --c-500 (base green)
          600: "#a6bc41", // --c-600 (slightly darker green)
          700: "#94a836", // --c-700 (darker green)
          800: "#7f8e2b", // --c-800 (darkest green)
          900: "#111827", // --c-900
          1000: "#000000", // --c-1000
          prime: "#bbd24a", // --c-prime (base green)
          "prime-light": "#d7e67b", // --c-prime-light (lighter green)
          "prime-dark": "#94a836", // --c-prime-dark (darker green)
          "prime-black": "#7f8e2b", // --c-prime-black (darkest green)
          green: "rgb(34 197 94)", // --c-green
          blue: "rgb(59 130 246)", // --c-blue
          red: "rgb(239 68 68)", // --c-red
          brown: "#bc9055", // --c-brown
        },
        dark: "#272727",
      },
    },
  },
  plugins: [],
};
