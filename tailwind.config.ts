import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: {
          DEFAULT: "var(--surface)",
          alt: "var(--surface-alt)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          subtle: "var(--ink-subtle)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          mid: "var(--accent-mid)",
          deep: "var(--accent-deep)",
          tint12: "var(--accent-tint-12)",
          tint20: "var(--accent-tint-20)",
          tint25: "var(--accent-tint-25)",
          tint40: "var(--accent-tint-40)",
        },
        deep: "var(--deep)",
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        ring: "0 0 0 1px var(--border-strong)",
        "ring-accent": "0 0 0 1px var(--accent-mid)",
        specimen: "0 12px 36px -8px rgba(8, 11, 16, 0.08), 0 4px 12px -2px rgba(8, 11, 16, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
