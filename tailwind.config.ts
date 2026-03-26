import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD600",
          "yellow-dark": "#F5C400",
          "yellow-muted": "rgba(255,214,0,0.12)",
          black: "#0A0A0A",
          "black-mid": "#141414",
          "black-soft": "#1E1E1E",
          white: "#F8F8F4",
          gray: "#888888",
        },
      },
      fontFamily: {
        chillax: ["Chillax", "sans-serif"],
        sans: ["Chillax", "sans-serif"],
      },
      backgroundImage: {
        "yellow-glow":
          "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,214,0,0.15), transparent)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(32px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        "fade-up": "fade-up 0.7s ease forwards",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [],
};
export default config;
