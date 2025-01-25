/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'float-delay': 'float 20s ease-in-out infinite 2s',
        'float-slow': 'float 25s ease-in-out infinite 4s',
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse-slow': 'spin 20s linear infinite reverse',
        'spin-slow-delayed': 'spin 25s linear infinite 5s',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translate(0, 0)',
          },
          '50%': {
            transform: 'translate(-20px, 20px)',
          }
        },
        spin: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        }
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      transform: {
        'translate-z-32': 'translateZ(32px)',
      },
      perspective: {
        '1000': '1000px',
      },
      boxShadow: {
        'inner-custom': 'inset 0 0 30px 10px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}