/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Custom blue color
        secondary: "#9333EA", // Custom purple color
        customGray: "#4B5563", // Custom gray color
      },
      fontFamily: {
        popR: ["Poppins_400Regular"],
        popSb: ["Poppins_600SemiBold"],
        popB: ["Poppins_800ExtraBold"],
      },
    },
  },
  plugins: [],
};
