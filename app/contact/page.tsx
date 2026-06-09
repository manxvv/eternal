"use client";

import React from "react";

export default function ContactPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      {/* ── HEADER ────────────────────────────────── */}
      <section className="pt-40 pb-24 bg-brand-blue text-center px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">
            Inquiries
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-6">
            Let's talk.
          </h1>
          <p className="font-cormorant italic text-xl text-white/50 max-w-lg mx-auto">
            For collaborations, gifting enquiries, retail partnerships, and customer support.
          </p>
        </div>
      </section>

      {/* ── CONTENT GRID ──────────────────────────── */}
      <section className="py-24 px-6 lg:px-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left Column — Information */}
          <div className="space-y-12">
            <div>
              <p className="text-brand-gold uppercase tracking-widest text-[10px] font-bold mb-4">
                Get in Touch
              </p>
              <h2 className="font-cormorant text-4xl text-brand-blue leading-tight mb-8">
                We read every <br /> <span className="italic">single message.</span>
              </h2>
              
              <div className="space-y-2">
                <p className="text-brand-gold uppercase tracking-widest text-[9px] font-bold">Email</p>
                <a 
                  href="mailto:hello@eternaltea.in" 
                  className="font-cormorant text-3xl text-brand-blue border-b border-brand-gold/30 hover:border-brand-gold transition-all pb-1"
                >
                  hello@eternaltea.in
                </a>
              </div>
            </div>

            <div className="h-[1px] w-full bg-brand-blue/10" />

            {/* Specialized Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { topic: "Customer Support", note: "Order queries, product guidance" },
                { topic: "Bulk & Corporate", note: "Gifting programs, custom sets" },
                { topic: "Retail Partnerships", note: "Stockist & wholesale enquiries" },
                { topic: "Collaborations", note: "Brands, events, editorial" },
              ].map((item) => (
                <div key={item.topic} className="group">
                  <p className="font-cormorant text-xl text-brand-blue mb-1 group-hover:text-brand-gold transition-colors">
                    {item.topic}
                  </p>
                  <p className="text-xs text-brand-blue/40 font-dmsans leading-relaxed">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="bg-white border border-brand-blue/5 p-10 lg:p-14 shadow-2xl shadow-brand-blue/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors"
                  />
                </div>
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
                  Topic of Interest
                </label>
                <div className="relative">
                  <select className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors appearance-none cursor-pointer">
                    <option value="">Select a topic</option>
                    <option>Customer Support</option>
                    <option>Bulk & Corporate Gifting</option>
                    <option>Retail Partnership</option>
                    <option>Collaboration</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-brand-blue/60 font-bold">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-4 bg-transparent border border-brand-blue/10 text-brand-blue font-dmsans text-sm focus:border-brand-gold outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button className="w-full bg-brand-blue text-brand-gold py-5 text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-brand-blue/90 hover:shadow-lg transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── BOTANICAL DECORATION ── */}
      <section className="py-24 text-center">
        <div className="font-cormorant italic text-brand-blue/20 text-8xl opacity-30 select-none">
          Eternal
        </div>
      </section>
    </main>
  );
}