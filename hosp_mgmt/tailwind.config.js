/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['Nunito'],
        LoraFont: ['Lora', 'serif'],
        DNFont: ['DM Sans', 'sans-serif'],
        Ubonto: ['Ubuntu', 'sans-serif']
      }
    },
  },
  plugins: [
  ],
}

