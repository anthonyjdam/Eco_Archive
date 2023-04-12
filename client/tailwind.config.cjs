const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '350px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
  darkMode: "class"
}
