/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./constants/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
    "./navigations/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#203645',
          200: '#C7D9E5',
        },
        'base-black': '#333333',
        'background': '#FCFEFF',
      },
      fontFamily: {
        unitext: 'Unitext-Regular'
      }
    },
  },
  plugins: [],
};
