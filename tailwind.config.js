/* @type {import('tailwindcss').Config} */
// module.exports = {
//  content: ["./views/**/*.{html,js,hbs}"],  theme: {
//    extend: {},
//  },
//  plugins: [],
//} 

module.exports = {
  content: [
    "./src/*.{html,js,css}",
    "./views/*.hbs",
  ],
  theme: {
    extend: {},
  },
  colors: {
    'red': '#a40e4c',
    'green-dark': '#023c40',
    'lilac': '#9c95dc',
    'white': '#f7f7f2',
  },
  fontFamily: {
    sans: ['Raleway'],
    serif: ['Bona Nova'],
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};