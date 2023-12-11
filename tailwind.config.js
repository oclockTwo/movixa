/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        'custom': '430px',
        'custommid': '390px'
      },
      colors: {
        "main": "#fffaf4",
        "main-dark": "#2B2B2B",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/forms")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "synthwave", "coffee"],
  },
};
