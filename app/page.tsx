import Link from "next/link";
import Image from "next/image";

const teas = [
  { 
    name: "Everyday Assam Tea", 
    desc: "A bold, malty everyday companion.", 
    category: "tea", 
    price: "₹450",
    image: "/everyday_assam_tea_product_front.jpeg" // Added path
  },
  { 
    name: "Majestic Assam Tea", 
    desc: "Rich and full-bodied, from single estates.", 
    category: "tea", 
    price: "₹850",
    image: "/majestic_assam_tea_product_front.jpeg" // Added path
  },
  { 
    name: "Heritage Masala Tea", 
    desc: "A warming blend of hand-selected spices.", 
    category: "tea", 
    price: "₹550",
    image: "/everyday_assam_tea.jpeg" // Added path
  },
  { 
    name: "Rose Reverie", 
    desc: "Delicate petals, softened by fine Darjeeling.", 
    category: "tea", 
    price: "₹950",
    image: "/majestic_assam_tea.jpeg" // Added path
  },
];


export default function Home() {
  return (
    <main className="bg-brand-cream min-h-screen font-dmsans text-brand-blue">
      
      {/* ── HERO SECTION ────────────────────────────────── */}
      <section className="relative h-screen flex items-center overflow-hidden bg-brand-blue">
        {/* Background Image with Blue Overlay */}
        <div className="absolute inset-0 opacity-40">
          <img 
            src="/banner.png" 
            className="w-full h-full object-cover"
            alt="Tea Banner"
          />
        </div>
        
        <div className="container mx-auto px-6 lg:px-20 relative z-10">
          <div className="max-w-3xl">
            <p className="text-brand-gold uppercase tracking-[0.4em] text-xs mb-6 animate-fade-in">
              Crafted in India · Est. 2024
            </p>
            <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-8">
              The Art of <br />
              <span className="italic text-brand-gold">Slow Luxury</span>
            </h1>
            <p className="text-white/70 text-lg max-w-md mb-10 leading-relaxed">
              Curated teas and artisanal drinkware designed for those who appreciate life’s finer rituals.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/tea" className="bg-brand-gold text-brand-blue px-10 py-4 hover:bg-white transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                Explore Teas
              </Link>
              <Link href="/accessories" className="border border-brand-gold text-brand-gold px-10 py-4 hover:bg-brand-gold hover:text-brand-blue transition-all duration-300 font-medium uppercase tracking-widest text-xs">
                View Accessories
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Side Text */}
        <div className="absolute right-10 bottom-20 rotate-90 origin-right hidden lg:block">
          <p className="text-brand-gold/30 uppercase tracking-[1em] text-[10px]">
            Tea · Coffee · Accessories
          </p>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
   <div className="bg-brand-gold py-4 overflow-hidden whitespace-nowrap border-y border-brand-blue/10">
  <div className="inline-block animate-marquee">
    {/* First set of items */}
    <span className="font-cormorant text-brand-blue mx-8 text-lg italic tracking-widest uppercase">
      Everyday Assam — Rose Reverie — Blue Empress — Arabica Roast — 
    </span>
    {/* Duplicate set for seamless looping */}
    <span className="font-cormorant text-brand-blue mx-8 text-lg italic tracking-widest uppercase">
      Everyday Assam — Rose Reverie — Blue Empress — Arabica Roast — 
    </span>
  </div>
</div>

      {/* ── PHILOSOPHY ────────────────────────────── */}
      <section className="py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-brand-gold uppercase tracking-widest text-[10px] mb-4">Our Ethos</p>
          <h2 className="font-cormorant text-4xl md:text-5xl mb-8">
            Luxury is not excess. <br />
            <span className="italic">It is intention.</span>
          </h2>
          <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-8"></div>
          <p className="text-brand-blue/60 leading-loose">
            Every blend is chosen to create moments worth savouring. We believe the finest things in life are those that invite you to slow down and breathe.
          </p>
        </div>
      </section>

      {/* ── PRODUCT COLLECTION (E-COMMERCE PREVIEW) ──────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-[10px] mb-2">The Collection</p>
              <h2 className="font-cormorant text-4xl text-brand-blue">Featured Teas</h2>
            </div>
            <Link href="/tea" className="text-brand-blue border-b border-brand-gold pb-1 text-sm hover:text-brand-gold transition-colors">
              View All Collection →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teas.map((tea, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-[3/4] bg-brand-cream mb-6 overflow-hidden">
                  
                  {/* FIX: Replaced the letter placeholder with a real image */}
                  <img 
                    src={tea.image} 
                    alt={tea.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-blue/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-brand-gold text-xs tracking-widest uppercase mb-4">Quick Add</p>
                    <button className="bg-brand-gold text-brand-blue w-full py-3 text-[10px] uppercase tracking-widest font-bold">
                      Add to Cart — {tea.price}
                    </button>
                  </div>
                </div>
                
                <h3 className="font-cormorant text-xl mb-1 group-hover:text-brand-gold transition-colors">{tea.name}</h3>
                <p className="text-brand-blue/40 text-xs mb-3 italic">{tea.desc}</p>
                <p className="text-brand-blue font-bold text-sm">{tea.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DARK SECTION (COFFEE) ─────────────────────── */}
      <section className="bg-brand-blue py-24 text-white">
        <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-brand-gold uppercase tracking-widest text-[10px] mb-4">The Darker Roast</p>
            <h2 className="font-cormorant text-5xl mb-6">Crafted for unhurried mornings.</h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Our coffee beans are roasted in small batches to ensure the complexity of the single-origin notes are preserved.
            </p>
            <Link href="/coffee" className="inline-block border-b border-brand-gold pb-2 text-brand-gold uppercase tracking-widest text-xs">
              Explore Roasts
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5  lg:p-8 p-4 md:p-8 border border-white/10 hover:border-brand-gold transition-colors">
              <h4 className="font-cormorant text-xl lg:text-2xl md:text-2xl text-brand-gold mb-2">Arabica Roast</h4>
              <p className="text-xs text-white/40">Single Origin · Light</p>
            </div>
            <div className="bg-white/5 lg:p-8 p-4 md:p-8 border border-white/10 hover:border-brand-gold transition-colors">
              <h4 className="font-cormorant text-xl lg:text-2xl md:text-2xl text-brand-gold mb-2">Champion Blend</h4>
              <p className="text-xs text-white/40">Artisanal · Dark</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BULK / CORPORATE ─────────────────────────── */}
      <section className="py-24 bg-brand-gold/10">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="font-cormorant text-4xl mb-6">Corporate Gifting</h2>
          <p className="text-brand-blue/60 mb-10 leading-relaxed">
            Elevate your company culture with curated tea sets. Custom branding and worldwide shipping available.
          </p>
          <Link href="/bulk" className="bg-brand-blue text-white px-12 py-4 uppercase tracking-widest text-xs inline-block hover:bg-brand-blue/90">
            Enquire Now
          </Link>
        </div>
      </section>

  
    </main>
  );
}