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
          100: '#E3ECF2',
          200: '#C7D9E5',
        },
        neutral: {
          100: '#ECECEC',
          200: '#DADADA',
          900: '#585858',
        },
        secondary: {
          DEFAULT: '#CDB385',
          500: '#C2A269',
          600: '#B6904E',
        },
        error: '#F44336',
        'base-black': '#333333',
        'background': '#FCFEFF',
      },
      fontFamily: {
        unitext: 'Unitext-Regular',
        florenceSansExp: 'FlorencesansSC-Exp',
        florenceSansBold: 'FlorencesansSC-Bold',
        florenceSans: 'FlorencesansSC'
      },
      boxShadow: {
        'featured-card': '0px 0px 20px 0px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
};
