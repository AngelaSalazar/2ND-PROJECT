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
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};