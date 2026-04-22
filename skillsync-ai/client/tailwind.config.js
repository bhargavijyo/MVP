/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      colors: {
        primary: "#6366f1",
        secondary: "#a855f7",
        dark: "#0f172a",
        light: "#f8fafc",
        brand: {
          50:  "#eef2ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        }
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        "glow": "0 0 40px -10px rgba(99,102,241,0.5)",
        "glow-sm": "0 0 20px -5px rgba(99,102,241,0.4)",
      },
    },
  },
  plugins: [],
}
