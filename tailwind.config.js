/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");


module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
   
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#1648CE",
        brandwhite: "#F8F8F8",
        secondary: "#3C3C43",
        dark: "#303733",
        "primary-dark": "#002856",
        "secondary-light": "#F2F3F7",
        "hero-overlay": "#3A495969",
      },
      fontSize: {
        sm: '0.8rem',
        base: '14px',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      fontFamily: {
        sans: ["PT Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
