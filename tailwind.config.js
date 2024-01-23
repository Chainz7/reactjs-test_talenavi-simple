/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        26: "6.5rem",
        30: "7.5rem",
        128: "30rem",
      },
    },
    colors: {
      primary: "#7f5af0",
      "primary-dark": "#6648c0",
      "primary-light": "#b29cf6",
      secondary: "#72757e",
      tertiary: "#2cb67d",
      background: "#16161a",
      "card-background": "#242629",
      headline: "#fffffe",
      paragraph: "#94a1b2",
      alert: "#ff4545",
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
