/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFFAF4",
        charcoal: "#565448",
        gold: "#C4A882",
        mist: "#E8DDD0",
        deepCharcoal: "#3A3830",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.5em",
      },
    },
  },
  plugins: [],
};
