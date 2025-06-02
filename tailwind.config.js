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
        warning: "#E29700",
        danger: "#D92121",
        success: "#049F0A",
      },
      fontFamily: {
        ubuntu: ["Ubuntu"],
        albert: ["Albert Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
