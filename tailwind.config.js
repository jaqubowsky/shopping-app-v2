/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "black-opacity": "rgba(0, 0, 0, 0.5)",
      }
    },
  },
  plugins: [],
};
