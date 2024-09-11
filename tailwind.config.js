/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'boxy-blue': '#2C3FA0',
      },
    },
  },
  plugins: [require("daisyui")],
}

