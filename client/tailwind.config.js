/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        // transparent: 'transparent',
        // current: 'currentColor',
        // black: colors.black,
        // white: colors.white,
        // emerald: colors.emerald,
        // indigo: colors.indigo,
        // yellow: colors.yellow,
        // stone: colors.warmGray,
        // sky: colors.lightBlue,
        // neutral: colors.trueGray,
        // gray: colors.coolGray,
        // slate: colors.blueGray,
        'bgdarkb':'#10141E',
        'bgblue':'#161d2f',
        'greyblue':'#5A698F',
        'redcol':'#FC4747'
      },
    },
  },
  plugins: [],
}

