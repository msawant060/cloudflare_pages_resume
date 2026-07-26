/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f2efe9',
        charcoal: '#222222',
        gold: '#d4af37',
      },
    },
  },
  plugins: [],
}
