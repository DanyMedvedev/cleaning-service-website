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
        primary: "#2A7DE1",
        secondary: "#5BB9F0",
        background: "#F6FAFD",
        text: "#2D3748",
        accent: "#38C172",
      },
    },
  },
  plugins: [],
};
export default config;
