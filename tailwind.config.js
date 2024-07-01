const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/views/**/**/*.blade.php',
        './resources/views/**/**/**/*.blade.php',
        './resources/js/**/*.jsx',
        './resources/**/js/**/*.jsx',
    ],

    theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
        colors: {
            ...colors,
            'primary': '#0760A7',
            'primarylight': '#0760A7',
            'primarydark': '#073B64',
            'secondary': '#FE6A01',
            'secondarylight': '#ff8936',
            'secondarydark': '#cf5600',
            'terciary': '#8200FF',
        },
        extend: {
            dropShadow: {
                'banner-text': '0 2px 2px rgba(0,0,0,0.8)'
            },
            fontFamily: {
                'primary': 'Open Sans',
                'primary-semibold': 'Open Sans SemiBold',
                'primary-bold': 'Open Sans Bold',
                'primary-black': 'Open Sans ExtraBold',
                'primary-extrabold': 'Open Sans ExtraBold',
                'secondary': 'Open Sans',
                'secondary-bold': 'Open Sans Bold',
                'secondary-black': 'Open Sans ExtraBold',
                'secondary-extrabold': 'Open Sans ExtraBold',
                'terciary': 'Open Sans',
                'terciary-bold': 'Open Sans Bold',
                'terciary-black': 'Open Sans ExtraBold',
                'terciary-extrabold': 'Open Sans ExtraBold'
            },
            backgroundImage: {
                'gradient': 'linear-gradient(73deg, #8200FF 33.83%, #00CFFF 84.08%)'
            },
            fontSize: {
                '4.5xl': '2.4rem',
                '7.5xl': '4.75rem',
            },
            keyframes: {
              "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
              },
              "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
              },
            },
            animation: {
              "accordion-down": "accordion-down 0.2s ease-out",
              "accordion-up": "accordion-up 0.2s ease-out",
            },
        }
    },

    plugins: [
        require('@tailwindcss/forms'),
        require('flowbite/plugin'),
        require("tailwindcss-animate"),
        plugin(function ({ addBase, addComponents, addUtilities, theme }) {
            addBase({
                'b': {
                    fontFamily: theme('fontFamily.primary-bold'),
                },
            })
        }),
    ],
};