/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          beige: '#F5F5F0',
          gold: '#D4AF37',
          olive: '#556B2F',
          charcoal: '#36454F',
          rose: '#E6D7D5',
          sand: '#E8E6E1'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
