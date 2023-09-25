/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'hero-background': "url('/images/hero.jpg')",
      },
      logoImg: {
        'logo-background': "url('/images/logo.png')",
      },
    },
  },
  plugins: [],
};
