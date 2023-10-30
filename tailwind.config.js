/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 1s ease-in-out'
      }
    },
  },
  plugins: [],
}

