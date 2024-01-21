/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    important: "body",
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    corePlugins: {
        preflight: false,
    },
};
