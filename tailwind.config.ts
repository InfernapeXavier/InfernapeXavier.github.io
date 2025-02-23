import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        theme: {
          base: "rgb(var(--color-base) / <alpha-value>)",
          surface: "rgb(var(--color-surface) / <alpha-value>)",
          overlay: "rgb(var(--color-overlay) / <alpha-value>)",
          muted: "rgb(var(--color-muted) / <alpha-value>)",
          subtle: "rgb(var(--color-subtle) / <alpha-value>)",
          text: "rgb(var(--color-text) / <alpha-value>)",
          highlight: "rgb(var(--color-highlight) / <alpha-value>)",
        },
        // Rose Pine colors for accents (dark mode)
        "rose-pine": {
          love: "#eb6f92",
          gold: "#f6c177",
          rose: "#ebbcba",
          pine: "#31748f",
          foam: "#9ccfd8",
          iris: "#c4a7e7",
        },
        // Rose Pine Dawn colors for accents (light mode)
        "rose-pine-dawn": {
          love: "#b4637a",
          gold: "#ea9d34",
          rose: "#d7827e",
          pine: "#286983",
          foam: "#56949f",
          iris: "#907aa9",
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
            color: "rgb(var(--color-text))",
            fontFamily: "var(--font-sans)",
            h1: {
              color: "rgb(var(--color-text))",
              fontFamily: "var(--font-sans)",
            },
            h2: {
              color: "rgb(var(--color-text))",
              fontFamily: "var(--font-sans)",
            },
            h3: {
              color: "rgb(var(--color-text))",
              fontFamily: "var(--font-sans)",
            },
            h4: {
              color: "rgb(var(--color-text))",
              fontFamily: "var(--font-sans)",
            },
            a: {
              color: "rgb(var(--color-text))",
              "&:hover": {
                color: "rgb(var(--color-subtle))",
              },
            },
            strong: {
              color: "rgb(var(--color-text))",
            },
            code: {
              color: "rgb(var(--color-text))",
            },
            pre: {
              backgroundColor: "rgb(var(--color-surface))",
              color: "rgb(var(--color-text))",
            },
            blockquote: {
              color: "rgb(var(--color-subtle))",
              borderLeftColor: "rgb(var(--color-highlight))",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
