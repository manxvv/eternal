"use client";

import Link from "next/link";
import Image from "next/image";

const teas = [
  { name: "Everyday Assam Tea", price: "₹450", desc: "Begin each morning with this bold, malty companion. Sourced from Assam's finest estates.", note: "Best served: With whole milk", image: "/everyday_assam_tea_product_front.jpeg" },
  { name: "Majestic Assam Tea", price: "₹850", desc: "Rich and full-bodied, from single-garden estates. A tea for moments that deserve a touch of ceremony.", note: "Best served: Black, steeped 4 min", image: "/majestic_assam_tea_product_front.jpeg" },
  { name: "Heritage Masala Tea", price: "₹550", desc: "A warming blend of hand-selected spices — cardamom, ginger, cinnamon.", note: "Best served: With full cream milk", image: null },
  { name: "Rose Reverie", price: "₹950", desc: "Delicate rose petals softened by a fine Darjeeling base.", note: "Best served: Light, no milk", image: null },
  { name: "Lemongrass Estate", price: "₹650", desc: "Citrus-bright and naturally soothing. Fresh lemongrass from the Nilgiris.", note: "Best served: Hot or cold-brewed", image: null },
];

const flowerTeas = [
  { name: "Blue Empress", desc: "A rare blue infusion from butterfly pea flowers. Vivid indigo in the cup.", note: "Add lemon to watch it turn pink" },
  { name: "Hibiscus Blossom", desc: "Vivid, tart, and deeply floral. Dried at their peak.", note: "Best served: Chilled, with honey" },
];

export default function TeaPage() {
  return (
    <main className="bg-brand-cream min-h-screen pt-32">
      {/* ── HEADER ────────────────────────────────── */}
      <section className="py-20 text-center px-6 border-b border-brand-blue/5">
        <div className="max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-4 font-bold">
            The Eternal Collection
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-brand-blue leading-tight mb-6">
            Teas
          </h1>
          <p className="font-cormorant italic text-xl text-brand-blue/60 max-w-lg mx-auto">
            From everyday indulgence to refined single-estate experiences.
          </p>
        </div>
      </section>

      {/* ── FEATURED TEAS (VISUAL GRID) ────────────── */}
      <section className="py-24 px-6 lg:px-20 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-12 bg-brand-gold"></div>
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-blue">Featured Selection</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teas.filter(t => t.image).map((tea) => (
            <div key={tea.name} className="group relative overflow-hidden bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                  src={tea.image!} 
                  alt={tea.name} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-10 w-full flex justify-between items-end">
                  <div>
                    <h3 className="font-cormorant text-3xl text-white mb-2">{tea.name}</h3>
                    <p className="text-brand-gold text-[10px] uppercase tracking-widest italic">{tea.note}</p>
                  </div>
                  <button className="bg-brand-gold text-brand-blue px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Shop Now — {tea.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT LIST (CLEAN GRID) ──────────────── */}
      <section className="py-24 bg-white border-y border-brand-blue/5 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-12">Single Estate & Blended</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/10 border border-brand-blue/10">
            {teas.map((tea, i) => (
              <div key={tea.name} className="bg-white p-12 hover:bg-brand-cream transition-colors group">
                <span className="font-dmsans text-[10px] text-brand-gold font-bold">0{i + 1}</span>
                <h4 className="font-cormorant text-2xl text-brand-blue mt-4 mb-4 group-hover:text-brand-gold transition-colors">{tea.name}</h4>
                <p className="text-brand-blue/60 text-sm leading-relaxed mb-8 h-12 overflow-hidden">{tea.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-brand-blue font-bold text-sm">{tea.price}</span>
                  <button className="text-[10px] uppercase tracking-widest text-brand-blue font-bold border-b border-brand-gold pb-1">
                    Add to Cart +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLOWER TEAS (DARK LUXURY SECTION) ─────── */}
      <section id="flower" className="py-32 bg-brand-blue text-brand-cream px-6 lg:px-20 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-6 font-bold">Nature's Artistry</p>
          <h2 className="font-cormorant text-4xl md:text-6xl mb-16 max-w-2xl leading-tight">
            Delicate infusions <br /> <span className="italic text-brand-gold">inspired by nature.</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {flowerTeas.map((tea) => (
              <div key={tea.name} className="border border-white/10 p-12 relative group hover:border-brand-gold/50 transition-colors">
                <div className="absolute top-6 right-8 text-brand-gold/20 font-cormorant text-6xl">✿</div>
                <h3 className="font-cormorant text-3xl text-brand-gold mb-4">{tea.name}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm">{tea.desc}</p>
                <p className="text-[10px] uppercase tracking-widest text-brand-gold italic opacity-80">{tea.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ───────────────────────────── */}
      <section className="py-32 bg-brand-cream text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl text-brand-blue mb-8">Ready to curate your ritual?</h2>
          <p className="text-brand-blue/60 mb-12 text-sm leading-loose">
            Whether it's the bold malt of Assam or the gentle bloom of flower teas, find the blend that speaks to your moment of stillness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-brand-blue text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-brand-blue/90 transition-all">
              Shop All Products
            </Link>
            <Link href="/bulk" className="border border-brand-blue text-brand-blue px-10 py-4 uppercase tracking-widest text-xs hover:bg-brand-blue hover:text-white transition-all">
              Gifting Inquiries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}