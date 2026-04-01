/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#0D0D0D',
          50: '#F5F5F0',
          100: '#E8E8E0',
          200: '#C8C8B8',
          300: '#A0A090',
          400: '#707065',
          500: '#4A4A42',
          600: '#2E2E28',
          700: '#1A1A16',
          800: '#111110',
          900: '#0D0D0D',
        },
        lime: {
          DEFAULT: '#C8FF00',
          50: '#F5FFB3',
          100: '#EEFF80',
          200: '#DAFF33',
          300: '#C8FF00',
          400: '#AADB00',
          500: '#8AB700',
          600: '#6A8F00',
        },
        coral: {
          DEFAULT: '#FF5C4D',
          50: '#FFE8E6',
          100: '#FFCCC9',
          200: '#FF9990',
          300: '#FF6659',
          400: '#FF5C4D',
          500: '#E64035',
        },
        sky: {
          DEFAULT: '#4DAAFF',
          50: '#E6F3FF',
          100: '#CCE7FF',
          200: '#99CEFF',
          300: '#66B5FF',
          400: '#4DAAFF',
          500: '#2288E6',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-in': 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
