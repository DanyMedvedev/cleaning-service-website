import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
      },
      colors: {
        primary: "#2A9D8F",
        secondary: "#264653",
        background: "#F9F7F4",
        text: "#1C2B3A",
        accent: "#2A9D8F",
        cream: "#F4EFE6",
        creamLight: "#F9F7F4",
      },
    },
  },
  plugins: [],
};
export default config;
