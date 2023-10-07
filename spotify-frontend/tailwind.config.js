/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "1/10": "8%",
        "9/10": "92%",
      },
      backgroundColor: {
        "app-black": "#121212",
      },
    },
  },
  plugins: [],
};
