/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f6ff',
          100: '#e6edff',
          500: '#3451ff',
          600: '#2436cc',
        },
      },
    },
  },
  plugins: [],
}
