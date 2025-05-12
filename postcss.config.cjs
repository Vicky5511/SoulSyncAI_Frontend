// postcss.config.js or postcss.config.cjs
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'), // Ensure this is the correct PostCSS plugin for Tailwind
    require('autoprefixer')
  ]
}
