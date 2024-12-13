const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        flowbite.content(),
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primayColor: '#40798C',
                primayColor_Hover: 'rgb(57 108 124)',
                primayColor_Border_Hover: 'rgb(52 102 118)',
                secondaryColor: '#A6B1E1',
                secondaryColor_Hover: 'rgb(141 151 192)',
                text_primaryColor: '#111827',
                text_secondaryColor: '#8a92a0',
                elements_dark: 'rgb(41 42 45)',
                bg_dark: 'rgb(32 33 36)'
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
        screens: {
            'xxs': '340px',
            'xs': '540px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            'xxl': '1536px',
        },
    },
    plugins: [
        flowbite.plugin(),
    ],
}

