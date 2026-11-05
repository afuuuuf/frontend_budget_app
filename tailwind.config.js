/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#12665B', dark: '#0E5148' },
        ivory: '#F7F8F4',
        surface: '#FFFFFF',
        ink: '#182C29',
        slate: '#657570',
        lime: '#DDEDAD',
        terracotta: '#B44737',
        amber: '#946200',
        mist: '#DCE5DF',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
