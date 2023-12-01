/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        current: 'currentColor',
        'darkViolet': '#7C5DFA',
        'lightViolet': '#9277FF',
        'veryDarkBlue': '#1E2139',
        'darkBlue': '#252945',
        'lightGrey': '#DFE3FA',
        'darkGrey': '#888EB0',
        'violetGrey': '#7E88C3',
        'veryDarkViolet': '#0C0E16',
        'darkOrange': '#EC5757',
        'lightOrange': '#FF9797',
        'lightBG': '#F8F8FB',
        'darkBG': '#141625',
      },
    },
  },
  plugins: [],
}

