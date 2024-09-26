/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require("tw-elements/plugin.cjs")]
}