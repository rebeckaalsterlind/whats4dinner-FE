/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      prime: {
        normal: 'rgb(5, 5, 19)',
        hover: 'rgb(199, 103, 0)'
      },
      accent: {
        normal: 'rgb(199, 103, 0)',
        hover: 'rgb(199, 103, 0)'
      }
    }
  }
};
