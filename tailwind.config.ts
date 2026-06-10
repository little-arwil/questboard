import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Georgia", "Palatino Linotype", "Book Antiqua", "Palatino", "serif"],
      },
      colors: {
        charcoal: "#080b0d",
        "charcoal-2": "#111717",
        ember: "#f4c56a",
        gold: "#d6a94c",
        parchment: "#f2dfb7",
        violet: "#8b5cf6",
        emerald: "#35d39a",
      },
      boxShadow: {
        "quest-card": "0 24px 80px rgba(0, 0, 0, 0.38)",
        "gold-glow": "0 0 40px rgba(214, 169, 76, 0.22)",
        "emerald-glow": "0 0 40px rgba(53, 211, 154, 0.18)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 7s ease-in-out infinite alternate",
        rise: "rise 600ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
