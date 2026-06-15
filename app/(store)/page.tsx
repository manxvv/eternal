

"use client";

import { useState } from "react";
import Link from "next/link";

// --- DATA ---
const ctcTeas = [
  { id: 1, name: "Everyday Assam Tea", tagline: "Smooth · Malty · Daily", desc: "A smooth, full-bodied blend designed for daily indulgence.", price: "₹450", weight: "100g", image: "/everyday_assam_tea_product_front.jpeg", badge: "Bestseller", brewTip: "Best with milk & sugar", isFlower: false },
  { id: 2, name: "Majestic Assam Tea", tagline: "Bold · Full-Bodied · Estate", desc: "A bold, full-bodied tea from the lush valleys of Assam.", price: "₹850", weight: "100g", image: "/majestic_assam_tea_product_front.jpeg", badge: "Premium", brewTip: "Steep 4 min, strain strong", isFlower: false },
];

const premiumTeas = [
  { id: 3, name: "Heritage Masala Tea", tagline: "Spiced · Bold · Traditional", desc: "Rich Assam leaves meet a fragrant symphony of hand-crushed Indian spices.", price: "₹550", weight: "100g", image: "/everyday_assam_tea.jpeg", badge: "Heritage", brewTip: "Simmer with whole milk", isFlower: false },
  { id: 4, name: "Rose Reverie Tea", tagline: "Floral · Delicate · Romantic", desc: "Hand-blended with Assam estate tea and dried rose petals.", price: "₹750", weight: "100g", image: "/majestic_assam_tea.jpeg", badge: "Artisanal", brewTip: "Light brew, no milk", isFlower: false },
  { id: 5, name: "LemonGrass Estate Tea", tagline: "Citrusy · Energising · Aromatic", desc: "A refreshing fusion of Assam's bold richness and fresh lemongrass.", price: "₹600", weight: "100g", image: "/everyday_assam_tea_product_front.jpeg", badge: "Estate", brewTip: "Hot or iced, with honey", isFlower: false },
];

const flowerTeas = [
  { id: 6, name: "Blue Empress Tea", tagline: "Rare · Naturally Blue · Wellness", desc: "Elegant, aromatic, and naturally blue — watch it transform with lemon.", price: "₹950", weight: "100g", image: "/majestic_assam_tea_product_front.jpeg", badge: "Flower Tea", brewTip: "Add lemon to change colour", isFlower: true },
  { id: 7, name: "Hibiscus Blossom Tea", tagline: "Tart · Vitamin-C · Caffeine-Free", desc: "Crafted from handpicked hibiscus petals, rich in Vitamin C.", price: "₹800", weight: "100g", image: "/everyday_assam_tea_product_front.jpeg", badge: "Flower Tea", brewTip: "Chilled with honey", isFlower: true },
];

const coffees = [
  { id: 8, name: "The Heritage Coffee", subtitle: "Secret of Chikmagalur", tagline: "Single Origin · Medium Roast", desc: "From the misty plantations of Chikmagalur, carrying generations of expertise.", price: "₹750", weight: "200g", roast: "Medium", origin: "Chikmagalur, Karnataka", notes: ["Dark Chocolate", "Earthy", "Balanced"], badge: "Heritage Blend" },
  { id: 9, name: "The Golden Roast Coffee", subtitle: "A Rare Arabica Expression", tagline: "Multi-Origin · Light-Medium Roast", desc: "Handpicked and slow-roasted to perfection.", price: "₹850", weight: "200g", roast: "Light", origin: "Coorg + Chikmagalur", notes: ["Golden Honey", "Floral", "Smooth Finish"], badge: "Arabica Premium" },
];

// --- COMPONENTS ---

function CoffeeBeanSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 60 80" className={className} fill="none">
      <ellipse cx="30" cy="40" rx="22" ry="32" fill="currentColor" fillOpacity="0.08" />
      <ellipse cx="30" cy="40" rx="22" ry="32" stroke="currentColor" strokeWidth="1.5" />
      <path d="M30 10 C38 22 38 35 38 40 C38 50 38 58 30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
      <path d="M30 10 C22 22 22 35 22 40 C22 50 22 58 30 70" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

function LeafSVG({ className = "" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none">
      <path d="M20 35 C20 35 6 28 6 15 C6 8 12 4 20 4 C28 4 34 8 34 15 C34 28 20 35 20 35Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.12" />
      <line x1="20" y1="35" x2="20" y2="10" stroke="currentColor" strokeWidth="1" />
      <line x1="20" y1="22" x2="13" y2="16" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="22" x2="27" y2="16" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

function FlowerSVG({ size = 28 }) {
  const petals = [0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5];
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} fill="none">
      {petals.map((angle, i) => (
        <ellipse key={i} cx={20 + 9 * Math.cos((angle * Math.PI) / 180)} cy={20 + 9 * Math.sin((angle * Math.PI) / 180)} rx="4.5" ry="7"
          transform={`rotate(${angle} ${20 + 9 * Math.cos((angle * Math.PI) / 180)} ${20 + 9 * Math.sin((angle * Math.PI) / 180)})`}
          fill="#C4A882" fillOpacity="0.22" stroke="#C4A882" strokeWidth="0.8" />
      ))}
      <circle cx="20" cy="20" r="3.5" fill="#C4A882" />
    </svg>
  );
}

interface Tea {
  id: number;
  name: string;
  tagline?: string;
  desc?: string;
  price: string;
  weight: string;
  image: string;
  badge?: string;
  brewTip?: string;
  isFlower?: boolean;
}

function TeaCard({ product, dark = false }: { product: Tea; dark?: boolean }) {
  return (
    <div className="group relative cursor-pointer">
      <div className={`relative overflow-hidden mb-4 aspect-[3/4] ${dark ? 'bg-[#111827]' : 'bg-[#F0E8DC]'}`}>
        {/* Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`text-[9px] uppercase tracking-[0.2em] px-3 py-1 font-bold ${product.isFlower ? 'bg-[#1e1b4b] text-[#a5b4fc] border border-[#6366f1]' : 'bg-[#C4A882] text-[#1A1F2E]'}`}>
            {product.badge}
          </span>
        </div>
        
        {/* Icon */}
        <div className="absolute top-3 right-3 z-20 opacity-25 group-hover:opacity-55 transition-opacity duration-300">
          {product.isFlower ? <FlowerSVG size={28} /> : <LeafSVG className="w-7 h-7 text-[#C4A882]" />}
        </div>

        {/* Image */}
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-108 group-hover:brightness-[0.3]" />
        
        {/* Hover Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <div className="w-8 h-px bg-[#C4A882] mb-3" />
          <p className="text-[9px] uppercase tracking-[0.3em] mb-2 text-[#C4A882]">{product.tagline}</p>
          <p className="text-[11px] leading-relaxed mb-3 text-white/80">{product.desc}</p>
          <p className="text-[9px] italic mb-4 text-[#C4A882]/60">☕ {product.brewTip}</p>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/40">{product.weight}</span>
             <Link
        href="https://wa.me/+918377860701" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        // className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >

            <button className="text-[9px] uppercase tracking-[0.2em] font-bold px-4 py-2.5 bg-[#C4A882] text-[#1A1F2E]">Buy Now</button>
      </Link>
          </div>
        </div>

        {/* Price Overlay (Visible when NOT hovered) */}
        <div className="absolute bottom-4 left-5 group-hover:opacity-0 transition-opacity">
          <p className="text-xs font-bold text-white drop-shadow-md">{product.price}</p>
        </div>
      </div>

      {/* Footer Info */}
      <h3 className={`text-[19px] mb-0.5 font-serif transition-colors group-hover:text-[#C4A882] ${dark ? 'text-[#FFFAF4]' : 'text-[#1A1F2E]'}`}>
        {product.name}
      </h3>
      <p className={`text-[10px] italic mb-2 ${dark ? 'text-white/30' : 'text-[#1A1F2E]/30'}`}>{product.tagline}</p>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-bold ${dark ? 'text-[#FFFAF4]' : 'text-[#1A1F2E]'}`}>{product.price}</p>
        <p className={`text-[9px] uppercase tracking-wider ${dark ? 'text-white/20' : 'text-[#1A1F2E]/20'}`}>{product.weight}</p>
      </div>
    </div>
  );
}

interface Coffee {
  id: number;
  name: string;
  subtitle?: string;
  tagline?: string;
  desc?: string;
  price: string;
  weight: string;
  roast?: string;
  origin?: string;
  notes: string[];
  badge?: string;
}

function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <div className="group relative overflow-hidden cursor-pointer transition-all duration-500 border border-[#C4A882]/10 bg-white/[0.02] hover:border-[#C4A882] hover:bg-[#C4A882]/[0.04] p-8 lg:p-10">
      {/* Watermark beans */}
      <CoffeeBeanSVG className="absolute -right-7 -top-7 w-52 h-52 text-[#C4A882] opacity-5 group-hover:opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />
      <CoffeeBeanSVG className="absolute -left-5 -bottom-5 w-32 h-32 text-[#C4A882] opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-[9px] uppercase tracking-[0.25em] px-3 py-1 border border-[#C4A882]/25 text-[#C4A882]">{coffee.badge}</span>
          <div className="flex items-center gap-2">
            <span className="text-[8px] uppercase tracking-widest text-white/20">Roast</span>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-5 h-1.5 rounded-full transition-all duration-300 ${(coffee.roast==="Light"&&i===0)||(coffee.roast==="Medium"&&i<=1)||(coffee.roast==="Dark") ? "bg-[#C4A882]" : "bg-white/10"}`} />
              ))}
            </div>
          </div>
        </div>

        <p className="text-[9px] uppercase tracking-[0.3em] mb-1 text-white/25">{coffee.subtitle}</p>
        <h3 className="text-3xl mb-1 font-serif font-light text-white group-hover:text-[#C4A882] transition-colors">{coffee.name}</h3>
        <p className="text-xs italic mb-5 text-white/30">{coffee.tagline}</p>
        
        <div className="max-h-0 opacity-0 group-hover:max-h-28 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
          <p className="text-xs leading-relaxed mb-5 text-white/50">{coffee.desc}</p>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {coffee.notes.map(note => (
            <span key={note} className="text-[9px] uppercase tracking-wider px-2.5 py-1 border border-white/10 bg-white/5 text-white/30 group-hover:border-[#C4A882]/30 group-hover:bg-[#C4A882]/10 group-hover:text-[#C4A882] transition-all">
              {note}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-5 border-t border-white/5">
          <div>
            <p className="text-[9px] uppercase tracking-widest mb-1 text-white/20">{coffee.weight}</p>
            <p className="text-2xl font-serif text-white group-hover:text-[#C4A882]">{coffee.price}</p>
          </div>
           <Link
        href="https://wa.me/+918377860701" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        // className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
          <button className="text-[9px] uppercase tracking-[0.2em] font-bold px-6 py-3 border border-[#C4A882] text-[#C4A882] hover:bg-[#C4A882] hover:text-[#1A1F2E] transition-all">
            Buy Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="font-sans">
      
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1117]">
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
            <img src="/Eternal_logo_corp2-01-removebg-preview.png" className="h-[140px] md:h-[160px]  w-auto" alt="Logo" />
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4 text-[#C4A882]">by Eternal Corp · Est. 2024</p>
            
             <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-8">
               The Art of <br />
               <span className="italic text-brand-gold">Slow Luxury</span>
             </h1>
             <p className="text-white/70 text-lg max-w-md mb-10 leading-relaxed">
               Curated teas and artisanal drinkware designed for those who appreciate life’s finer rituals.
             </p>
             <div className="flex flex-wrap gap-6">
               <Link 
               href="/" 
               
              //  href="/tea" 
               className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                 Explore Teas
               </Link>

                  <Link 
                  // href="/coffee" 
                  href="/" 

                  className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                 Explore Coffee
               </Link>
               <Link href="/" className="border border-brand-gold text-brand-gold px-10 py-4 hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 font-medium uppercase tracking-widest text-xs">
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
      <div className="overflow-hidden py-4 bg-[#C4A882]">
        <div className="flex whitespace-nowrap animate-marquee">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="font-serif italic text-sm tracking-widest text-[#1A1F2E]">
              &nbsp; Everyday Assam — Majestic Assam — Heritage Masala — Rose Reverie — Blue Empress — Hibiscus Blossom — The Heritage Coffee — &nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* SECTIONS (CTC TEAS) */}
      <section className="py-24 bg-[#FFFAF4]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="flex justify-between items-end mb-14">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] mb-3 text-[#C4A882]">Featured · Assam CTC</p>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A1F2E]">Everyday & Majestic</h2>
            </div>
            <Link 
            //  href="/tea" 
            href="/"
            className="hidden sm:block text-[10px] uppercase tracking-widest text-[#1A1F2E]/40 border-b border-[#C4A882] pb-1">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
            {ctcTeas.map(tea => <TeaCard key={tea.id} product={tea} />)}
          </div>
        </div>
      </section>

      {/* CATALOG QUOTE */}
      <section className="py-20 bg-[#1A1F2E] text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-serif font-light text-white leading-relaxed mb-6">
            "Every blend is a story — handpicked, slow-crafted, and designed to <em className="text-[#C4A882] not-italic">elevate every sip.</em>"
          </p>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C4A882]/40">— Eternal · India's Finest</p>
        </div>
      </section>

      {/* PREMIUM TEAS */}
      {/* <section className="py-24 bg-[#F5EDE0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3 text-[#C4A882]">Premium Blends</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A1F2E]">Masala, Rose & Lemongrass</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumTeas.map(tea => <TeaCard key={tea.id} product={tea} />)}
          </div>
        </div>
      </section> */}

      {/* FLOWER TEAS (Dark Section) */}
      {/* <section className="py-24 bg-[#0D1117]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="mb-14">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3 text-[#C4A882]">Wellness Infusions</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white">Floral Expressions</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {flowerTeas.map(tea => <TeaCard key={tea.id} product={tea} dark />)}
          </div>
        </div>
      </section> */}

      {/* COFFEE SECTION */}
      <section className="py-24 bg-[#1A1F2E]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-16">
          <div className="flex items-center gap-3 mb-10">
            <CoffeeBeanSVG className="w-6 h-8 text-[#C4A882]" />
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C4A882]">Artisanal Coffee · Chikmagalur</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {coffees.map(coffee => <CoffeeCard key={coffee.id} coffee={coffee} />)}
          </div>
        </div>
      </section>

      {/* CORPORATE GIFTING */}
      <section className="py-24 bg-[#C4A882] text-center">
        <div className="max-w-xl mx-auto px-6">
          <p className="text-[10px] uppercase tracking-[0.4em] mb-4 text-[#1A1F2E]/50">Bulk & Gifting</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1F2E] mb-6">Gift the art of slow living.</h2>
          <p className="text-sm text-[#1A1F2E]/60 mb-10">Premium tea collections and sustainable accessories for luxury hospitality and corporate partners.</p>
          <Link 
          // href="/bulk" 
href="https://wa.me/+918377860701" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        // className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
          className="inline-block text-[10px] uppercase tracking-widest font-bold px-10 py-4 bg-[#1A1F2E] text-white">Enquire Now</Link>
        </div>
      </section>

      {/* FOOTER STRIP */}
      <footer className="py-12 bg-[#0D1117] text-center border-t border-white/5">
        <p className="font-serif text-[11px] tracking-[0.35em] uppercase text-[#C4A882]/30 mb-4">Eternal · Tea, Coffee & Accessories</p>
        <div className="flex flex-wrap justify-center gap-8 text-[9px] uppercase tracking-widest text-[#C4A882]/40">
          <a href="mailto:business@eternalcorp.in">business@eternalcorp.in</a>
          <a href="tel:8377860701">+91 83778 60701</a>
          <span>www.eternalcorp.in</span>
        </div>
      </footer>

      {/* MARQUEE ANIMATION */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </main>
  );
}