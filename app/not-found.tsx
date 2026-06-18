"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-cream flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <h1 className="text-[30vw] font-cormorant text-brand-blue select-none">404</h1>
      </div>

      <div className="max-w-2xl text-center relative z-10">
        {/* Minimal Decorative Line */}
        <div className="w-12 h-[1px] bg-brand-gold mx-auto mb-12" />

        <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
          The Path is Lost
        </p>

        <h1 className="font-cormorant text-6xl md:text-8xl text-brand-blue leading-tight mb-8">
          A Vanishing <br /> <span className="italic">Ritual.</span>
        </h1>

        <p className="text-brand-blue/60 text-sm md:text-base leading-loose mb-12 max-w-sm mx-auto font-dmsans">
          The page you are looking for has evaporated like the steam from a morning cup. 
          Let us guide you back to the sanctuary.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <Link
            href="/"
            className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold shadow-xl shadow-brand-blue/10 hover:bg-brand-blue/90 transition-all"
          >
            Return Home
          </Link>
          
          <div className="flex gap-6">
            <Link
              href="/tea"
              className="text-brand-blue uppercase tracking-widest text-[10px] font-bold border-b border-brand-gold/60 pb-1 hover:border-brand-gold transition-colors"
            >
              Our Teas
            </Link>
            <Link
              href="/coffee"
              className="text-brand-blue uppercase tracking-widest text-[10px] font-bold border-b border-brand-gold/60 pb-1 hover:border-brand-gold transition-colors"
            >
              Our Roasts
            </Link>
          </div>
        </div>

        {/* Brand mark footer */}
        <div className="mt-32">
          <p className="font-serif text-lg tracking-[0.2em] text-brand-blue/20 uppercase">
            Eternal
          </p>
        </div>
      </div>
    </main>
  );
}