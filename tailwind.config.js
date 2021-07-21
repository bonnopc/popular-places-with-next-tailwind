module.exports = {
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/modules/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'siliguri': "'Hind Siliguri', sans-serif"
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          light: "#E5E8FF",
          DEFAULT: "#5468FF",
          dark: "#354895"
        },
        yellow: {
          DEFAULT: "#EC6820"
        }
      },
      textColor: ['active','disabled'],
      backgroundColor: ['active','disabled'],
      boxShadow: ['active','disabled'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
