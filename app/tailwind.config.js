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
                secondaryColor: '#A6B1E1',
                secondaryColor_Hover: 'rgb(141 151 192)',
            },
            width: {
                w_450: '450px',
                w_500: '500px',
            },
            maxWidth: {
                w_1400: '1400px',
            },
            primaryColor_Dark: '#E8FCC2',
            primaryColor_Dark_Hover: '#689C07',
        },
    },
    plugins: [],
}

