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
        tiktok: {
          red: "#FE2C55",
          blue: "#25F4EE",
          dark: "#121212",
          card: "#1E1E2E",
          border: "#2A2A3E",
        },
      },
      backgroundImage: {
        "gradient-tiktok": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "gradient-pink": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "gradient-blue": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "gradient-green": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "gradient-orange": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
