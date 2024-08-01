/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3f8363',  // Button background color
        primaryText: '#FFFFFF', // Button text color
        secondary: '#3f8363',  // Pagination active color
        paginationBg: '#3f8363', // Pagination background color
        paginationText: '#3f8363', // Pagination text color
      },
    },
  },
  plugins: [],
}
