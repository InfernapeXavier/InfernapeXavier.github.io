import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rose Pine Base
        "rose-pine": {
          base: "#191724",
          surface: "#1f1d2e",
          overlay: "#26233a",
          muted: "#6e6a86",
          subtle: "#908caa",
          text: "#e0def4",
          love: "#eb6f92",
          gold: "#f6c177",
          rose: "#ebbcba",
          pine: "#31748f",
          foam: "#9ccfd8",
          iris: "#c4a7e7",
          highlight: "#2a2837",
          "highlight-med": "#403d52",
          "highlight-high": "#524f67",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e0def4", // rose-pine-text
            a: {
              color: "#9ccfd8", // rose-pine-foam
              "&:hover": {
                color: "#ebbcba", // rose-pine-rose
              },
            },
            strong: {
              color: "#e0def4", // rose-pine-text
            },
            h1: {
              color: "#e0def4", // rose-pine-text
            },
            h2: {
              color: "#e0def4", // rose-pine-text
            },
            h3: {
              color: "#e0def4", // rose-pine-text
            },
            h4: {
              color: "#e0def4", // rose-pine-text
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
