"use client";

import Link from "next/link";
import React from "react";

const offerings = [
  { 
    title: "Luxury Tea & Coffee Collections", 
    desc: "Curated selections from our full range, presented in beautiful, sustainable packaging worthy of the recipient." 
  },
  { 
    title: "Sustainable Accessories", 
    desc: "Handpicked pieces — from chai glasses to serving trays — that carry the Eternal mark of quiet intention." 
  },
  { 
    title: "Custom Gifting Experiences", 
    desc: "We work with you to create bespoke combinations, branded gifting sets, and personalised notes." 
  },
];

const occasions = [
  "Client Gifting", "Team Appreciation", "Diwali & Festive", 
  "Weddings & Ceremonies", "Product Launches", "Year-End Gifting", 
  "Welcome Kits", "Board Meetings"
];

export default function BulkPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* ── HEADER SECTION ────────────────────────── */}
      <section className="pt-40 pb-24 bg-brand-blue text-center px-6 relative overflow-hidden">
        {/* Decorative Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay" />
        </div>

        <div className="max-w-[1280px] mx-auto relative z-10">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            Bespoke Services
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-[1.1] mb-8 max-w-4xl mx-auto">
            Gift the art of <br /> <span className="italic text-brand-gold">slow living.</span>
          </h1>
          <p className="font-cormorant italic text-xl text-white/50 max-w-lg mx-auto">
            Curated gifting solutions for clients, teams, and every occasion that matters.
          </p>
        </div>
      </section>

      {/* ── OFFERINGS GRID ────────────────────────── */}
      <section className="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-[1px] w-12 bg-brand-gold"></div>
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-blue">What We Offer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offerings.map((item) => (
            <div key={item.title} className="bg-white p-12 border border-brand-blue/5 hover:shadow-2xl hover:shadow-brand-blue/5 transition-all group">
              <div className="w-10 h-[1px] bg-brand-gold mb-8 group-hover:w-20 transition-all duration-500" />
              <h3 className="font-cormorant text-2xl text-brand-blue mb-6 leading-tight uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="text-brand-blue/60 text-sm leading-relaxed font-dmsans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── OCCASIONS (TAG CLOUD) ─────────────────── */}
      <section className="py-24 bg-brand-blue/5 px-6 lg:px-20">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-12 text-center">Occasions We Serve</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {occasions.map((occ) => (
              <span
                key={occ}
                className="px-8 py-4 border border-brand-blue/10 bg-white text-brand-blue font-dmsans text-[11px] uppercase tracking-widest hover:border-brand-gold transition-colors cursor-default"
              >
                {occ}
              </span>
            ))}
          </div>
          <div className="w-full flex justify-center items-center">

  <Link
              href="/contact">

          <button
          // onClick={"/contact"}
          
          className="w-fit bg-brand-blue text-brand-gold py-6 px-4 mt-10 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-brand-blue/90 hover:shadow-xl transition-all duration-500">
              Submit Gifting Inquiry
            </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENQUIRY FORM ───────────────────────────── */}
      {/* <section className="py-32 px-6 lg:px-20 max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-4">Concierge</p>
          <h2 className="font-cormorant text-4xl md:text-5xl text-brand-blue">Tell us about your occasion.</h2>
        </div> */}

        {/* <div className="bg-white p-10 md:p-16 border border-brand-blue/5 shadow-2xl shadow-brand-blue/5">
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
              {/* Name */}
              {/* <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-4 bg-transparent border-b border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors"
                />
              </div> */}
              {/* Organisation */}
              {/* <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Organisation</label>
                <input
                  type="text"
                  placeholder="Company or brand name"
                  className="w-full px-4 py-4 bg-transparent border-b border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors"
                />
              </div>
            </div> */}

            {/* Email */}
            {/* <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Business Email</label>
              <input
                type="email"
                placeholder="hello@yourcompany.com"
                className="w-full px-4 py-4 bg-transparent border-b border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors"
              />
            </div> */}

            {/* Message */}
            {/* <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">Requirements</label>
              <textarea
                rows={4}
                placeholder="Quantities, customisation needs, and timelines..."
                className="w-full px-4 py-4 bg-transparent border-b border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors resize-none"
              />
            </div> */}

            {/* Submit Button */}
            
          {/* </form>
        </div>
      </section> */}

      {/* ── FINAL QUOTE ── */}
      <section className="py-24 bg-brand-blue text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="font-cormorant text-3xl md:text-4xl text-white italic leading-relaxed opacity-80">
            "A gift from the Atelier is more than an object; it is an invitation to pause."
          </p>
          <div className="h-px w-12 bg-brand-gold mx-auto mt-10"></div>
        </div>
      </section>
    </main>
  );
}