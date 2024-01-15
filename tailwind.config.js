/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

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
        base_gray: "#424242",
        light_gray: "#717171",
        naver: "#03c75b",
        error: colors.red[500],
      },
      screens: {
        xl: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lg: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        md: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        sm: { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
});
