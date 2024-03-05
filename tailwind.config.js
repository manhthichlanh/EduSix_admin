/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        process: {
          '0%': { width: '0%' },
          '30%': { width: "40%" },
          '100%': { width: "100%" },
        },
      },
      animation: {
        'proccessing': 'process 1s ease-in-out',
      },
    },
  },
  plugins: [],

  
}



