/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        black: '#111111',
        gold: '#C9A84C',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif'],
      },
      borderWidth: {
        3: '3px',
        4: '4px',
      },
      borderRadius: {
        DEFAULT: '2px',
        none: '0px',
        sm: '2px',
      },
    },
  },
  plugins: [],
}
