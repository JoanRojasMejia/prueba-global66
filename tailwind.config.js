/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f22539',
        'primary-hover': '#c00e20',
        secondary: '#bfbfbf',
        'secondary-hover': '#a1a0a0',
        'backgound-color': '#f9f9f9',
        title: '#353535',
        content: '#5e5e5e',
        button: '#ffffff'
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        rotation: 'rotation 2s infinite'
      }
    }
  },
  plugins: []
}
