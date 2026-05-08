import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ivory: "var(--mimi-bg)",
        paper: "var(--mimi-paper)",
        card: "var(--mimi-card)",
        rose: "var(--mimi-pink)",
        "rose-soft": "var(--mimi-pink-light)",
        "rose-mist": "var(--mimi-pink-bg)",
        ink: "var(--mimi-ink)",
        muted: "var(--mimi-muted)",
        line: "var(--mimi-line)",
        beige: "var(--mimi-beige)",
        greige: "#C8BCB8",
        linegreen: "var(--mimi-green)"
      },
      boxShadow: {
        card: "0 12px 30px rgba(96, 72, 74, 0.10)",
        soft: "0 8px 18px rgba(217, 121, 140, 0.14)"
      },
      fontFamily: {
        logo: ["Georgia", "Times New Roman", "serif"],
        body: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
