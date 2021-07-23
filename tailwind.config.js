module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/modules/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'siliguri': "'Hind Siliguri', sans-serif",
        'baloo': "'Baloo Da 2', cursive",
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          light: "#F5F6FF",
          DEFAULT: "#5468FF",
          dark: "#354895"
        },
        yellow: {
          DEFAULT: "#EC6820"
        },
        indigo: {
          light: "#4f7bb0"
        },
        tblack: {
          DEFAULT: "#0F1856"
        }
      },
      textColor: ['active','disabled'],
      backgroundColor: ['active','disabled'],
      borderColor: ['first', 'last'],
      borderWidth: ['first', 'last'],
      borderStyle: ['first', 'last'],
      boxShadow: ['active','disabled'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
