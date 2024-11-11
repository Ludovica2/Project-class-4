/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primayColor: '#40798C', //#5198B0
        primayColor_Hover: 'rgb(57 108 124)',
        primayColor_Border_Hover: 'rgb(52 102 118)',
        },
        width: {
          w_450: '450px',
          w_500: '500px',
        },
        maxWidth: {
          w_1400: '1400px',
        },
    },
  },
  plugins: [],
}

