/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './utils/**/*.{js,ts,jsx,tsx,mdx}',],
  theme: {
    extend: {
      backgroundImage: {
        'hero-background': "url('/images/banner.webp')",
      },
      logoImg: {
        'logo-background': "url('/images/logo.png')",
      },
    },
  },
  plugins: [],
};
