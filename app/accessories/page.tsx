"use client";

import Link from "next/link";

const accessories = [
  { name: "Coffee Mugs", desc: "Hand-thrown ceramic mugs, glazed in muted earth tones. Holds warmth — in every sense.", material: "Ceramic" },
  { name: "Cutting Chai Glasses", desc: "The iconic tapered glass, refined. For that perfect two-inch pour of masala chai.", material: "Borosilicate Glass" },
  { name: "Tea Cups", desc: "Thin-walled porcelain cups that let you feel the warmth of the tea through your fingertips.", material: "Fine Porcelain" },
  { name: "Retro Cups", desc: "Inspired by India's roadside tapris — enamel-coated, familiar, and quietly charming.", material: "Enamel" },
  { name: "Sipper Glasses", desc: "For cold brews and iced teas. Clean lines, generous volume.", material: "Borosilicate Glass" },
  { name: "Bowls", desc: "Versatile, beautiful. For a pre-dawn matcha ritual or an evening herbal soak.", material: "Ceramic" },
  { name: "Serving Trays", desc: "Sustainably sourced wood with a minimalist profile. Elevates every pour.", material: "Mango Wood" },
];

export default function AccessoriesPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* ── HEADER ────────────────────────────────── */}
      <section className="pt-40 pb-24 bg-white text-center px-6 border-b border-brand-blue/5">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            Sustainable Atelier
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-brand-blue leading-tight mb-6">
            Every piece, <br /> <span className="italic">a ritual.</span>
          </h1>
          <p className="font-cormorant italic text-xl text-brand-blue/60 max-w-lg mx-auto">
            Thoughtfully designed pieces that elevate every sip.
          </p>
        </div>
      </section>

      {/* ── PRODUCT GALLERY GRID ──────────────────── */}
      <section className="py-24 px-6 lg:px-20 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {accessories.map((item, i) => (
            <div
              key={item.name}
              className="group bg-white border border-brand-blue/5 p-10 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-blue/5 transition-all duration-700 h-full"
            >
              <div>
                {/* Index Number */}
                <div className="w-10 h-10 rounded-full border border-brand-blue/10 flex items-center justify-center mb-8 group-hover:border-brand-gold transition-colors">
                  <span className="text-brand-gold text-[10px] font-bold tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                
                <h3 className="font-cormorant text-2xl text-brand-blue mb-4 group-hover:text-brand-gold transition-colors">
                  {item.name}
                </h3>
                <p className="text-brand-blue/60 text-sm leading-relaxed mb-8 font-dmsans">
                  {item.desc}
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-brand-blue/5">
                <p className="text-brand-gold uppercase tracking-[0.2em] text-[9px] font-bold italic">
                  Material: {item.material}
                </p>
                <Link 
                  href="/contact" 
                  className="text-[10px] uppercase tracking-widest text-brand-blue font-bold border-b border-brand-gold pb-1 inline-block"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DESIGN PHILOSOPHY (DARK SECTION) ─────── */}
      <section className="py-32 bg-brand-blue text-brand-cream text-center px-6 relative overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <p className="font-cormorant text-3xl md:text-4xl font-light leading-relaxed mb-10">
            "We design for the moment the cup touches your lips — <br />
            <span className="italic text-brand-gold">not for the moment it touches a shelf.</span>"
          </p>
          <div className="h-px w-12 bg-brand-gold mx-auto mb-6" />
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold">
            — The Eternal Design Ethos
          </p>
        </div>
      </section>

      {/* ── GIFTING CTA ───────────────────────────── */}
      <section className="py-32 bg-brand-cream text-center px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-cormorant text-4xl text-brand-blue mb-8">
            Create a custom <br /> <span className="italic">gifting set.</span>
          </h2>
          <p className="text-brand-blue/60 text-sm leading-relaxed mb-12">
            Mix and match our curated teas with artisanal accessories for a bespoke gifting experience that leaves a lasting impression.
          </p>
          <Link 
            href="/bulk" 
            className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold hover:shadow-2xl transition-all"
          >
            Enquire About Gifting
          </Link>
        </div>
      </section>
    </main>
  );
}