/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bloom: {
          pink: '#F4C7D5',
          blush: '#FCE8EF',
          rose: '#EAA8BE',
          white: '#FFFFFF',
          green: '#496B4A',
          sage: '#A8BEA0',
          blue: '#DCEAF5',
          charcoal: '#252525',
          grey: '#777777',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Poppins"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'bloom-card': '0 20px 50px -10px rgba(234, 168, 190, 0.28), 0 10px 25px -10px rgba(73, 107, 74, 0.08)',
        'bloom-glow': '0 0 40px rgba(244, 199, 213, 0.5)',
        'bloom-inner': 'inset 0 1px 2px rgba(255, 255, 255, 0.8)',
        'bloom-button': '0 8px 24px -4px rgba(234, 168, 190, 0.45)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'floatReverse 9s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-18px) rotate(3deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(16px) rotate(-3deg)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
