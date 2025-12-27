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
        game: {
          bg: "#050505", // Background sangat gelap
          surface: "#0a0a0a", // Untuk header card
          border: "#1f2937", // Border halus
          red: "#e74c3c",
          yellow: "#f1c40f",
          green: "#2ecc71",
          blue: "#3498db",
          pink: "#ff00ff",
          cyan: "#00ffff",
          outline: "#333333", // Warna lingkaran kosong
        },
      },
    },
  },
  plugins: [],
};
export default config;