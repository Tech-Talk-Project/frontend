/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      width: {
        logo_md: "123px",
        logo_lg: "176px",
      },
      colors: {
        light_black: "rgb(16, 16, 16)",
        brand: "#A66EFC",
        line: "#1F2937",
        dark_gray: "#15171A",
        naver: "#03c75b",
      },
    },
  },
  plugins: [],
});
