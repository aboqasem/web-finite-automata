module.exports = {
  purge: ['index.html', 'src/**/*.{tsx,ts}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
