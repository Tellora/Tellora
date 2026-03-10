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
                primary: {
                    DEFAULT: "var(--primary)",
                    dark: "#EAB308",
                    subtle: "rgba(243, 232, 74, 0.1)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                    dark: "#9333EA",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                },
                success: {
                    DEFAULT: "var(--success)",
                },
                background: "#FFFFFF",
                foreground: "#000000",
                surface: {
                    DEFAULT: "#FFFFFF",
                },
                text: {
                    main: "#000000",
                    muted: "rgba(0, 0, 0, 0.6)",
                    dim: "rgba(0, 0, 0, 0.4)",
                },
            },
            fontFamily: {
                heading: ["var(--font-heading)", "sans-serif"],
                sans: ["var(--font-sans)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            animation: {
                blob: "blob 7s infinite",
                float: "float 6s ease-in-out infinite",
                "float-slow": "float 10s ease-in-out infinite",
                "spin-slow": "spin-slow 15s linear infinite",
                shimmer: "shimmer 3s linear infinite",
                marquee: "marquee 40s linear infinite",
                "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                blob: {
                    "0%": { transform: "translate(0px, 0px) scale(1)" },
                    "33%": { transform: "translate(30px, -50px) scale(1.1)" },
                    "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
                    "100%": { transform: "translate(0px, 0px) scale(1)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "spin-slow": {
                    from: { transform: "rotate(0deg)" },
                    to: { transform: "rotate(360deg)" },
                },
                shimmer: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
                marquee: {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
