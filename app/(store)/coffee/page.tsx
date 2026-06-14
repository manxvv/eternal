"use client";

import Link from "next/link";

const coffees = [
  {
    name: "Arabica Roast",
    roast: "Light–Medium",
    origin: "Single Origin",
    tasting: "Floral, stone fruit, bright acidity",
    desc: "A smooth, nuanced pour sourced from a single high-altitude origin. Bright, clean, and made to be savoured slowly.",
  },
  {
    name: "Champion Blend",
    roast: "Medium–Dark",
    origin: "Multi-Origin Blend",
    tasting: "Dark chocolate, walnut, long finish",
    desc: "Complex layers for the discerning palate. A masterfully balanced blend that rewards every sip with something new.",
  },
];

const brewNotes = [
  { method: "Pour Over", temp: "93°C", ratio: "1:15", time: "3–4 min" },
  { method: "French Press", temp: "95°C", ratio: "1:12", time: "4 min" },
  { method: "Moka Pot", temp: "90°C", ratio: "1:8", time: "5 min" },
  { method: "Cold Brew", temp: "Room temp", ratio: "1:8", time: "12–16 hr" },
];

export default function CoffeePage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* ── HEADER WITH BACKGROUND IMAGE ─────────────────── */}
      <section className="relative pt-48 pb-32 bg-brand-blue text-center px-6 overflow-hidden">
        
        {/* FIX: Background Image Layer */}
        <div 
          className="absolute inset-0 z-0 opacity-40" 
          style={{ 
            backgroundImage: "url('/coffee.png')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
        />
        
        {/* FIX: Deep Blue Gradient Overlay for Luxury Feel */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-brand-blue/80 via-brand-blue/40 to-brand-blue/90" />

        <div className="max-w-[1280px] mx-auto relative z-10">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            The Eternal Atelier
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-6">
            Coffee
          </h1>
          <p className="font-cormorant italic text-xl text-white/70 max-w-lg mx-auto">
            Crafted for unhurried mornings and meaningful conversations.
          </p>
        </div>
      </section>

      {/* ── COFFEE SELECTION ──────────────────────── */}
      <section className="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {coffees.map((coffee) => (
            <div
              key={coffee.name}
              className="bg-white border border-brand-blue/5 p-12 md:p-16 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-700 group"
            >
              <h2 className="font-cormorant text-4xl text-brand-blue mb-8 group-hover:text-brand-gold transition-colors">
                {coffee.name}
              </h2>
              
              {/* Technical Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-10 border-y border-brand-blue/5 mb-10">
                {[
                  ["Roast", coffee.roast],
                  ["Origin", coffee.origin],
                  ["Notes", coffee.tasting]
                ].map(([label, value]) => (
                  <div key={label} className="space-y-2">
                    <p className="text-brand-gold uppercase tracking-widest text-[9px] font-bold">{label}</p>
                    <p className="text-brand-blue/70 text-xs font-dmsans leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>

              <p className="text-brand-blue/60 text-sm leading-relaxed mb-10 italic">
                {coffee.desc}
              </p>

              <Link 
                href="/contact" 
                className="inline-flex items-center gap-4 text-brand-blue font-bold text-[10px] uppercase tracking-[0.3em] group/link"
              >
                Inquire about roasts 
                <span className="text-brand-gold group-hover/link:translate-x-2 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── BREW GUIDE ───────────────────────────── */}
      <section className="py-24 bg-white border-y border-brand-blue/5">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-4">The Ritual</p>
              <h2 className="font-cormorant text-4xl text-brand-blue italic">The method matters.</h2>
            </div>
            <p className="text-brand-blue/40 text-xs max-w-xs font-dmsans uppercase tracking-widest">
              Standardized parameters for the perfect extraction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-brand-blue/10 divide-y md:divide-y-0 md:divide-x divide-brand-blue/10">
            {brewNotes.map((note) => (
              <div key={note.method} className="p-10 hover:bg-brand-cream transition-colors group">
                <p className="font-cormorant text-2xl text-brand-blue mb-10 group-hover:text-brand-gold transition-colors">{note.method}</p>
                
                <div className="space-y-6">
                  {[
                    ["Temperature", note.temp],
                    ["Ratio", note.ratio],
                    ["Time", note.time]
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-[9px] uppercase tracking-widest text-brand-gold font-bold mb-1">{label}</p>
                      <p className="text-sm text-brand-blue/70 font-medium">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ───────────────────────────── */}
      <section className="py-32 bg-brand-cream text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl text-brand-blue mb-8 leading-tight text-brand-blue">
            Elevate your workspace <br /> <span className="italic">or morning ritual.</span>
          </h2>
          <Link 
            href="/bulk" 
            className="inline-block bg-brand-blue text-brand-gold px-12 py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:shadow-2xl transition-all"
          >
            Enquire for Bulk Orders
          </Link>
        </div>
      </section>
    </main>
  );
}