/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primayColor: '#40798C', //#5198B0
        primayColor_Hover: 'rgb(57 108 124)',
        primayColor_Border_Hover: 'rgb(52 102 118)',
        primaryColor_Dark: '#E8FCC2',
        primaryColor_Dark_Hover: '#689C07'
      },
      width: {
        w_500: '500px',
      },
    },
  },
  plugins: [],
}

