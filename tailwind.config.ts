import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#321044",
        "primary-dark": "#1F092C",
        accent: "#6A0DAD",
        neutral: {
          DEFAULT: "#F6F1FA",
          50: "#FCFAFD",
          100: "#F6F1FA",
          200: "#E6DDEB",
          500: "#766D7B",
          700: "#4B4350",
          900: "#211C24",
        },
      },
      fontFamily: {
        sans: ["Avenir Next", "Segoe UI", "Helvetica Neue", "sans-serif"],
      },
      boxShadow: {
        soft: "0 16px 50px rgba(31, 9, 44, 0.08)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
