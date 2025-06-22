/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./*.html",           // root HTML files
    "./**/*.html",        // nested HTML files
    "./src/**/*.{js,ts}",
    ],
  theme: {
    extend: {
      colors: {
        'theme-orange': '#FFD1B3',
        'theme-peach': '#E88B6D',
        'theme-sunset-start': '#E7765C',
        'theme-sunset-end': '#FBCBAD',
        'theme-bg': '#FFF9F6',
        'theme-text': '#3C2E2A',
        'theme-light': '#FDF0EC',
      }
    },
  },
  plugins: [],
};


