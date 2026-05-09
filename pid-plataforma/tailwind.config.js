/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy:   "#1A2744",
        brand:  "#E84C1F",
        muted:  "#64748B",
      },
      fontFamily: {
        sans: ["'DM Sans'", "system-ui", "sans-serif"],
        sora: ["'Sora'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

