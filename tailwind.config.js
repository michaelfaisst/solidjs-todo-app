/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Raleway", ...defaultTheme.fontFamily.sans]
            }
        }
    },
    plugins: [require("@tailwindcss/forms")]
};
