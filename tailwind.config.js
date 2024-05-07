/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        logo_md: "123px",
        logo_lg: "176px",
      },
      height: {
        main: "calc(100% - 5rem)",
      },
      colors: {
        light_black: "rgb(16, 16, 16)",
        brand: "#A66EFC",
        dark_brand: "#7B5AAC",
        line: "#1F2937",
        dark_gray: "#15171A",
        base_gray: "#424242",
        light_gray: "#717171",
        naver: "#03c75b",
        error: colors.red[500],
      },
      screens: {
        sm: "640px",
        // => @media (min-width: 640px) { ... }
        md: "768px",
        // => @media (min-width: 768px) { ... }
        lg: "1024px",
        // => @media (min-width: 1024px) { ... }
        xl: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
});
