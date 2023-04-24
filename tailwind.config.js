/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-opacity": "rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
});
