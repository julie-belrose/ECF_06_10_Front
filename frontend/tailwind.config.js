/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          500: '#5a5fcf',
          600: '#4e54c7',
          700: '#424abf',
        },
        secondary: {
          500: '#ff9800',
          600: '#f57c00',
        }
      },
    },
  },
  plugins: [],
};
