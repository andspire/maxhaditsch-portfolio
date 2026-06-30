import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:      "var(--color-bg)",
        surface: "var(--color-surface)",
        text:    "var(--color-text)",
        muted:   "var(--color-muted)",
        accent:  "var(--color-accent)",
        border:  "var(--color-border)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],   // 10px
        xs:   ["0.6875rem", { lineHeight: "1rem" }],   // 11px
        sm:   ["0.75rem",   { lineHeight: "1.25rem" }], // 12px
        base: ["0.8125rem", { lineHeight: "1.375rem" }],// 13px
        md:   ["0.9375rem", { lineHeight: "1.5rem" }],  // 15px
      },
      spacing: {
        "18": "4.5rem",
        "section": "7.5rem",
      },
      transitionTimingFunction: {
        expo:    "cubic-bezier(0.87, 0, 0.13, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
