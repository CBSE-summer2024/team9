/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff5f3",
          100: "#ffe6e0",
          200: "#ffccb9",
          300: "#ffb193",
          400: "#ff8d61",
          500: "#e62e04",
          600: "#cc2904",
          700: "#b32403",
          800: "#991e03",
          900: "#661302",
        },
      },
    },
  },
  plugins: [],
};
