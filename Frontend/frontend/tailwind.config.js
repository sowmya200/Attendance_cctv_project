/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bluechill':'#4d989d',
        'chil':'#4D989D',
        'button':'#35EAF5',
        'rowcolor':'#d9d9d9',
        'formcolor':'#4D989D',
   },
   fontFamily: {
     pop: ['Poppins', "sans-serif"],
     syne: [' Syne', 'sans-serif'],
   },
    },
  },
  plugins: [],
}