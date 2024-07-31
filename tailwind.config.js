/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF5733',  // Button background color
        primaryText: '#FFFFFF', // Button text color
        secondary: '#C70039',  // Pagination active color
        paginationBg: '#F0F0F0', // Pagination background color
        paginationText: '#007bff', // Pagination text color
      },
    },
  },
  plugins: [],
}
