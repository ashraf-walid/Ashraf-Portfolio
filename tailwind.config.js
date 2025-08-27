/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f1f1f",
        heading: "#ffffff",
        accent: "#ececec",
        surface: "#232323",
        contrast: "#310606",
        sideMenu: "#1b1b1b",
        sideMenuHover: "#444444",
        motion: "#393939",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
