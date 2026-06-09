/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {


       animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      colors: {
        cream: "#FFFAF4",
        charcoal: "#565448",
        gold: "#C4A882",
        mist: "#E8DDD0",
        deepCharcoal: "#3A3830",
         'brand-gold': '#EAD292',
        'brand-blue': '#012C4E',
        'brand-cream': '#FAF7F2', 
        
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
          cormorant: ['var(--font-cormorant)', 'serif'],
        dmsans: ['var(--font-dm-sans)', 'sans-serif'],
      },

     
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.5em",
      },
    },
  },
  plugins: [],
};
