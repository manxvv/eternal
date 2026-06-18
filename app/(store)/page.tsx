
"use client";

import { useState } from "react";
import Link from "next/link";


// ── MOOD DATA ──────────────────────────────────────────────
const moods = [
  {
    id: 1,
    moment: "Start Your Day",
    time: "Morning",
    icon: "🌅",
    product: "Everyday Assam Tea",
    tagline: "Bold. Malty. Grounding.",
    desc: "A smooth, full-bodied Assam CTC that cuts through the morning fog. Malty richness with a deep amber pour — the perfect first cup.",
    flavor: ["Malty", "Amber", "Bold"],
    brewTip: "2 tsp · boiling water · 4 min · splash of milk",
    price: "₹450",
    weight: "100g",
    accent: "#8B4513",
    bg: "#FFF8F0",
  },
  {
    id: 2,
    moment: "Power Through",
    time: "Midday",
    icon: "⚡",
    product: "Majestic Assam Tea",
    tagline: "Strong. Full-bodied. Timeless.",
    desc: "From the lush valleys of Assam — bold, full-bodied, celebrated for its malty richness and deep amber hue. Strong, smooth, and timeless.",
    flavor: ["Strong", "Rich", "Amber"],
    brewTip: "2 tsp · boiling water · 5 min · black or with milk",
    price: "₹850",
    weight: "100g",
    accent: "#5C3317",
    bg: "#F5EDE0",
  },
  {
    id: 3,
    moment: "Feel at Home",
    time: "Evening",
    icon: "🏡",
    product: "Heritage Masala Tea",
    tagline: "Spiced. Warming. India in a cup.",
    desc: "Rich Assam leaves meet a fragrant symphony of hand-crushed Indian spices — cardamom, ginger, cinnamon. India's chai legacy in its purest form.",
    flavor: ["Spiced", "Warming", "Aromatic"],
    brewTip: "Simmer with whole milk · add jaggery · 6 min",
    price: "₹550",
    weight: "100g",
    accent: "#7B3F00",
    bg: "#FDF5E6",
  },
  {
    id: 4,
    moment: "Refresh Your Mind",
    time: "Afternoon",
    icon: "🌿",
    product: "LemonGrass Estate Tea",
    tagline: "Citrusy. Energising. Awakening.",
    desc: "A refreshing fusion of Assam's bold richness and the citrusy lightness of fresh lemongrass. Crafted to awaken the senses and elevate everyday moments.",
    flavor: ["Citrus", "Fresh", "Energising"],
    brewTip: "1.5 tsp · 90°C water · 3 min · serve hot or iced",
    price: "₹600",
    weight: "100g",
    accent: "#4A7C59",
    bg: "#F0F7F0",
  },
  {
    id: 5,
    moment: "Slow Down",
    time: "Late Afternoon",
    icon: "🌸",
    product: "Rose Reverie Tea",
    tagline: "Floral. Delicate. Grace.",
    desc: "Hand-blended with Assam estate tea and dried rose petals — a floral lift to a robust base. A perfect harmony of aroma, depth, and grace.",
    flavor: ["Floral", "Delicate", "Romantic"],
    brewTip: "1 tsp · 85°C water · 3 min · no milk",
    price: "₹750",
    weight: "100g",
    accent: "#9B4D72",
    bg: "#FDF0F5",
  },
  {
    id: 6,
    moment: "Be Curious",
    time: "Any Time",
    icon: "💙",
    product: "Blue Empress Tea",
    tagline: "Naturally blue. Naturally magical.",
    desc: "Elegant, aromatic, and naturally blue — this wellness-forward blend celebrates balance and beauty. Add lemon to watch it transform to vivid magenta.",
    flavor: ["Floral", "Wellness", "Visual"],
    brewTip: "1 tsp · 85°C water · 5 min · add lemon to colour-shift",
    price: "₹950",
    weight: "100g",
    accent: "#3B5FA0",
    bg: "#EEF2FF",
  },
  {
    id: 7,
    moment: "Unwind Naturally",
    time: "Night",
    icon: "🌺",
    product: "Hibiscus Blossom Tea",
    tagline: "Tart. Vivid. Caffeine-Free.",
    desc: "Crafted from handpicked hibiscus petals — caffeine-free, rich in Vitamin C and perfect for spa menus, wellness retreats, and quiet evenings.",
    flavor: ["Tart", "Vitamin-C", "Vivid"],
    brewTip: "1 tsp · 90°C water · 5 min · chilled with honey",
    price: "₹800",
    weight: "100g",
    accent: "#C0392B",
    bg: "#FFF0EE",
  },
];

function MoodTeaSection() {
  const [active, setActive] = useState(0);
  const tea = moods[active];

  return (
    <section className="bg-[#FFFAF4] py-24 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        
        {/* Header - Sharper Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.5em] mb-6 text-[#C4A882] font-bold">
              The Discovery Menu
            </p>
            <h2 className="font-light leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 6vw, 64px)", color: "#1A1F2E" }}>
              How do you want to <br />
              <span className="italic">feel</span> today?
            </h2>
          </div>
          <p className="text-sm max-w-xs leading-relaxed text-slate-500 italic border-l border-[#C4A882] pl-6 py-2">
            "A cup of tea is an excuse to share great thoughts with great minds."
          </p>
        </div>

        {/* Mood Selector - Minimalist Horizontal Menu */}
        <div className="flex overflow-x-auto no-scrollbar gap-10 mb-16 border-b border-slate-200">
          {moods.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setActive(i)}
              className="pb-6 whitespace-nowrap text-[11px] uppercase tracking-[0.25em] font-bold transition-all relative group"
              style={{
                color: active === i ? "#1A1F2E" : "#94a3b8",
              }}
            >
              <span className="mr-2 opacity-70 group-hover:opacity-100 transition-opacity">{m.icon}</span>
              {m.moment}
              {active === i && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#1A1F2E] animate-in slide-in-from-left duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Product Display - Asymmetric Design */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: The "Artisan" Placeholder Image */}
          <div className="lg:col-span-5 relative group">
            <div 
              className="aspect-[4/5] w-full relative overflow-hidden flex items-center justify-center transition-all duration-700 ease-in-out shadow-2xl"
              style={{ backgroundColor: tea.bg }}
            >
              {/* Minimalist Graphic Placeholder */}
              <div className="absolute inset-12 border border-slate-900/5 flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-sm">
                <span className="text-6xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{tea.icon}</span>
                <h4 className="text-2xl font-light mb-2 italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1F2E" }}>
                  {tea.product}
                </h4>
                <div className="w-10 h-px bg-[#C4A882] my-4" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-400">Eternal Tea Collection</p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-8 left-8 text-[10px] uppercase tracking-widest text-slate-300 transform -rotate-90 origin-left">
                Origin: Assam, India
              </div>
            </div>

            {/* Float Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#1A1F2E] text-[#C4A882] px-8 py-8 rounded-full w-32 h-32 flex flex-col items-center justify-center text-center shadow-xl border border-[#C4A882]/20">
              <span className="text-[9px] uppercase tracking-widest leading-tight">Net Wt.</span>
              <span className="text-xl font-serif italic">{tea.weight}</span>
            </div>
          </div>

          {/* RIGHT: Content Section */}
          <div className="lg:col-span-7 lg:pl-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-8">
                 <span className="h-px w-12 bg-[#C4A882]" />
                 <span className="text-[10px] uppercase tracking-[0.4em] text-[#C4A882] font-bold">{tea.time} Ritual</span>
              </div>

              <h3 className="text-5xl md:text-7xl font-light text-[#1A1F2E] mb-4 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {tea.product}
              </h3>
              
              <p className="text-xl italic text-slate-500 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {tea.tagline}
              </p>

              <div className="grid grid-cols-2 gap-10 mb-10 pb-10 border-b border-slate-200">
                <div>
                  <h5 className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-bold">Notes</h5>
                  <div className="flex flex-wrap gap-2">
                    {tea.flavor.map(f => (
                      <span key={f} className="text-xs text-slate-700 border border-slate-300 px-3 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg leading-relaxed text-slate-600 mb-10 font-light italic">
                {tea.desc}
              </p>

              {/* Brew Specs - "Technical" Sharp Look */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white border border-slate-100 shadow-sm">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#C4A882] font-bold mb-2">Master Brewing Tip</p>
                  <p className="text-sm text-slate-600 leading-snug">{tea.brewTip}</p>
                </div>
                <div className="flex items-center justify-center p-6 border border-dashed border-slate-300 opacity-60">
                   <p className="text-[10px] uppercase tracking-widest text-slate-400">100% Organic & Handpicked</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <Link 
                  href={`/tea/${tea.id}`}
                  className="bg-[#1A1F2E] text-[#C4A882] px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-slate-800 transition-all shadow-lg"
                >
                  View Full Collection
                </Link>
                <button 
                  onClick={() => setActive((active + 1) % moods.length)}
                  className="px-8 py-5 text-[11px] uppercase tracking-[0.3em] font-bold text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Next Mood →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── COFFEE BEAN SVG ─────────────────────────────────────────
function CoffeeBeanSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill="none">
      <ellipse cx="30" cy="40" rx="22" ry="32" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="30" cy="40" rx="22" ry="32" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 10 C38 22 38 35 38 40 C38 50 38 58 30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <path d="M30 10 C22 22 22 35 22 40 C22 50 22 58 30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

// ... Rest of the file (CoffeeSection, Home) remains the same.

// ── COFFEE SECTION ─────────────────────────────────────────
function CoffeeSection() {
  return (
    <section style={{ padding: "100px 0", backgroundColor: "#1A1F2E" }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CoffeeBeanSVG className="w-6 h-9 text-[#C4A882]" />
              <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "#C4A882" }}>
                Artisanal Coffee · Chikmagalur
              </p>
            </div>
            <h2 className="font-light" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(30px,4vw,46px)", color: "white" }}>
              Heritage &amp; <em style={{ color: "#C4A882" }}>Golden Roast</em>
            </h2>
          </div>
        </div>

        {/* COMING SOON PLACEHOLDER */}
        <div
          className="relative overflow-hidden flex flex-col items-center justify-center text-center"
          style={{
            border: "1px solid rgba(196,168,130,0.15)",
            backgroundColor: "rgba(255,255,255,0.02)",
            padding: "90px 40px",
          }}
        >
          <CoffeeBeanSVG
            className="absolute -right-10 -top-10 w-64 h-64 text-[#C4A882] opacity-50 pointer-events-none"
            // style={{ opacity: 0.05 }}
          />
          <CoffeeBeanSVG
            className="absolute -left-8 -bottom-8 w-44 h-44 text-[#C4A882] opacity-50 pointer-events-none"
            // style={{ opacity: 0.04 }}
          />

          <div className="relative z-10 max-w-md">
            <CoffeeBeanSVG className="w-10 h-14 text-[#C4A882] mx-auto opacity-60 mb-6"
            //  style={{ opacity: 0.6 }} 
             />
            <p className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "#C4A882" }}>
              Worth The Wait
            </p>
            <h3
              className="font-light mb-4 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(26px,3.5vw,38px)", color: "white" }}
            >
              Our Coffee Collection<br />is Coming Soon
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              We're carefully roasting and perfecting our single-origin beans from Chikmagalur. Stay tuned for the launch.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-14 opacity-[0.04]">
          {[...Array(8)].map((_, i) => <CoffeeBeanSVG key={i} className="w-9 h-12 text-[#C4A882]" />)}
        </div>
      </div>
    </section>
  );
}

// ── PAGE ───────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ fontFamily: "'DM Sans',system-ui,sans-serif" }}>

  
       <section className="relative min-h-screen flex items-center overflow-hidden mt-12 bg-[#0D1117]">
         {/* Responsive Background Images */}
         <div className="absolute inset-0">
           <picture>
             <source media="(max-width: 767px)" srcSet="/mobile_banner.png" />
             <img src="/banner.png" className="w-full h-full object-cover" alt="Eternal Background" />
           </picture>
          
           {/* Overlays */}
           <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0D1117]/95 via-[#0D1117]/70 to-transparent" />
           <div className="absolute inset-0 block md:hidden bg-gradient-to-b from-[#0D1117]/80 via-[#0D1117]/60 to-[#0D1117]/90" />
         </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-16 pt-[120px] pb-20">
           <div className="max-w-lg">
             {/* <img src="/Eternal_logo_corp2-01-removebg-preview.png" className="h-[120px] md:h-[150px]  w-auto" alt="Logo" /> */}
             <p className="text-[10px] font-semibold uppercase tracking-[0.45em] mb-4 text-[#C4A882]"><span className="font-semibold">
               Eternal
               </span>
                <br/> by Eternal Corp · Est. 2025</p>
            
              <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-8">
                The Art of <br />
                <span className="italic text-brand-gold">Slow Luxury</span>
              </h1>
              <p className="text-white/70 text-lg max-w-md mb-10 leading-relaxed">
               Curated Teas, Coffee and Artisanal drinkware designed for those who appreciate life’s finer rituals.
              </p>
             <div className="flex flex-wrap gap-6">
                <Link 
               
               href="/tea" 
               className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                 Explore Teas
               </Link>

                  <Link 
                  href="/coffee" 

                  className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                 Explore Coffee
               </Link>
               <Link href="/accessories"
               className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                 View Accessories
               </Link>
         </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-[#C4A882]/30 animate-pulse" />
          <p className="text-[7px] uppercase tracking-[0.3em] text-[#C4A882]/30">Scroll</p>
        </div>
      </section>
      {/* MARQUEE */}
      <div className="overflow-hidden py-3.5" style={{ backgroundColor: "#C4A882" }}>
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 34s linear infinite" }}>
          {[...Array(4)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, fontStyle: "italic", letterSpacing: "0.1em", color: "#1A1F2E" }}>
              &nbsp; Everyday Assam — Majestic Assam — Heritage Masala — Rose Reverie — LemonGrass Estate — Blue Empress Tea — Hibiscus Blossom — The Heritage Coffee — The Golden Roast — &nbsp;
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>


      <MoodTeaSection />

      {/* CATALOG QUOTE */}
      <section style={{ backgroundColor: "#1A1F2E", padding: "70px 0" }}>
        <div className="max-w-3xl mx-auto text-center px-6">
          <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(19px,3.2vw,28px)", fontWeight: 300, color: "white", lineHeight: 1.75, marginBottom: 22 }}>
            "Every blend is a story — from the misty tea gardens of Assam to the aromatic coffee trails of Chikmagalur — <em style={{ color: "#C4A882" }}>handpicked, slow-crafted, and designed to elevate every sip.</em>"
          </p>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(196,168x ,130,0.4)" }}>— Eternal · Curating India's Finest</p>
        </div>
      </section>



      {/* ACCESSORIES */}
      <section style={{ padding: "90px 0", backgroundColor: "#FFFAF4" }}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "#C4A882" }}>Sustainable Accessories</p>
              <h2 className="text-[36px] font-light leading-tight mb-5" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "#1A1F2E" }}>
                Sustainable Accessories<br />that Complete the Experience
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#504e44", opacity: 0.62 }}>
                Thoughtfully designed rice husk cups and sippers that reflect Eternal's commitment to conscious luxury — where sustainability meets refined design.
              </p>
              <p className="text-xs leading-relaxed mb-8" style={{ color: "#504e44", opacity: 0.38 }}>
                Coffee Mugs · Cutting Chai Glasses · Tea Cups · Retro Cups · Sipper Glasses · Bowls · Serving Trays
              </p>
              <Link href="/accessories" className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-9 py-3.5" style={{ border: "1px solid #1A1F2E", color: "#1A1F2E", textDecoration: "none" }}>
                View Accessories
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{name:"Coffee Mugs",bg:"#E8F4F8"},{name:"Chai Glasses",bg:"#F5EDE0"},{name:"Tea Cups",bg:"#FDEEF0"},{name:"Retro Cups",bg:"#FFFAF4"},{name:"Sipper Glasses",bg:"#EDF5F0"},{name:"Serving Trays",bg:"#F0EDE8"}].map(item => (
                <div key={item.name} className="group cursor-pointer transition-all duration-300 hover:-translate-y-1" style={{ padding: "22px 14px", backgroundColor: item.bg, border: "1px solid #E8DDD0", textAlign: "center" }}>
                  <p className="text-[12px] leading-tight group-hover:text-[#C4A882] transition-colors" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "#1A1F2E" }}>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


            {/* COFFEE */}
      <CoffeeSection />

      {/* CORPORATE GIFTING */}
      <section style={{ padding: "90px 0", backgroundColor: "#C4A882", textAlign: "center" }}>
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(26,31,46,0.5)" }}>Bulk & Corporate Gifting</p>
          <h2 className="font-light mb-5 leading-tight" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(28px,4vw,44px)", color: "#1A1F2E" }}>
            Gift the art of slow living.
          </h2>
          <p className="text-sm leading-relaxed mb-10" style={{ color: "rgba(26,31,46,0.55)" }}>
            Premium tea collections · Sustainable accessories · Custom gifting experiences<br />
            For clients, teams, celebrations &amp; luxury hospitality.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/bulk" className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-10 py-4" style={{ backgroundColor: "#1A1F2E", color: "#FFFAF4", textDecoration: "none" }}>
              Enquire Now
            </Link>
            <a href="mailto:business@eternalcorp.in" className="inline-block text-[10px] uppercase tracking-[0.2em] font-bold px-10 py-4" style={{ border: "1px solid rgba(26,31,46,0.35)", color: "#1A1F2E", textDecoration: "none" }}>
              Email Us
            </a>
          </div>
        </div>
      </section>

     
    </main>
  );
}



