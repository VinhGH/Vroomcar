/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#f97415", // Primary Orange
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#0f172a", // Navy from UI
                    foreground: "#ffffff",
                },
            },
        },
    },
    plugins: [],
}
