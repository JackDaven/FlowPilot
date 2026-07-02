import { defineConfig } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6D5DFC",
        background: "#F8F7FF",
        dark: "#0B0B12"
      }
    },
  },
  plugins: [],
};