/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    plugins: [],
    theme: {
        extend: {},
        screens: {
            // 'mobile': '1430px',
            // // => @media (max-width: 1430px) { ... }

            'desktop': '1440px',
            // => @media (min-width: 1440px) { ... }
        },
    }
}
