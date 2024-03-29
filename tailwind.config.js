/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B8F2E6',
        secondary: '#435355',
        black: '#000000',
        white: '#ffffff',
        start: '#1C3031',
        end: '#130B1C',
        card: '#1D292D',
        grey: '#676767',
        darkGrey: '#1C1C1C',
        tab: '#161421',
        background: '#161924',
        green: '#153829',
        danger: '#9E1427',
        ongoing: '#2F3C40',
      },
    },
  },
  plugins: [],
};
