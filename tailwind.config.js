// import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "scale(0)" },
          "20%": { transform: "scale(0.5)" },
          "50%": { transform: "scale(1)" },
          "70%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(0)" },

          // "20%": { transform: "scale(0.5)" },

          // "10%": { transform: "translateY(-30px)" },
          // "20%": { transform: "translateY(-20px)" },
          // "30%": { transform: "translateY(-10px)" },
          // "40%": { transform: "rotate(-4deg) top(50)" },
          // "50%": { transform: "rotate(10.0deg)" },
          // "60%": { transform: "translateY(-20px)" },
          // "100%": { transform: "rotate(0.0deg)" },
        },
      },
      animation: {
        "waving-hand": "wave 10s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        pencilFont: ["Pencil", "sans-serif"],
      },
    },
  },
  plugins: [],
}
export default config
