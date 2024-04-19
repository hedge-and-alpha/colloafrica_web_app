/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      lineHeight: {
        1.2: 1.2,
        1.33: 1.33,
      },
      colors: {
        "purple-main": "#470b96",
      },
    },
  },
  plugins: [],
};
