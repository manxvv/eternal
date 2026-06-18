"use client";

import Link from "next/link";
import { useState } from "react";
import { useAddToCart } from "@/hooks/useCart";
import { useProductsUser } from "@/hooks/useProducts";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  countInStock: number;
}

const brewNotes = [
  { method: "Pour Over", temp: "93°C", ratio: "1:15", time: "3–4 min" },
  { method: "French Press", temp: "95°C", ratio: "1:12", time: "4 min" },
  { method: "Moka Pot", temp: "90°C", ratio: "1:8", time: "5 min" },
  { method: "Cold Brew", temp: "Room temp", ratio: "1:8", time: "12–16 hr" },
];

export default function CoffeePage() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { mutateAsync: addToCart } = useAddToCart();

  // ── DATA FETCHING ──
  // Now uses the backend category filter: /api/products?category=coffee
  const { data: products = [], isLoading } = useProductsUser("Coffee");

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product._id);
      setAddedId(product._id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (err) {
      // Error handled by useAddToCart's toast
    }
  };

  // Derive featured products (first 2 with images)
  const featured = products.filter((p) => p.images?.length > 0).slice(0, 2);

  return (
    <main className="bg-brand-cream min-h-screen">
      {/* ── HEADER ── */}
      <section className="relative pt-48 pb-32 bg-brand-blue text-center px-6 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('/coffee.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-brand-blue/80 via-brand-blue/40 to-brand-blue/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-6 font-bold">
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

      {/* ── FEATURED SELECTION ── */}
      {!isLoading && featured.length > 0 && (
        <section className="py-24 px-6 lg:px-20 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-brand-gold" />
            <p className="uppercase tracking-widest text-[10px] font-bold text-brand-blue">
              Signature Roasts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((product) => (
              <div key={product._id} className="group relative overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.images[0]}`}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      product.countInStock === 0 ? "grayscale opacity-60" : ""
                    }`}
                  />
                  
                  {product.countInStock === 0 && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <div className="bg-brand-blue/90 text-brand-gold border border-brand-gold/30 px-8 py-3 backdrop-blur-sm">
                        <p className="uppercase tracking-[0.3em] text-[12px] font-bold">Sold Out</p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-10 w-full flex justify-between items-end">
                    <div>
                      <h3 className="font-cormorant text-3xl text-white mb-2">{product.name}</h3>
                      <p className="text-brand-gold text-[10px] uppercase tracking-widest italic">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.countInStock === 0}
                      className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                        product.countInStock === 0
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-brand-gold text-brand-blue hover:bg-white"
                      }`}
                    >
                      {product.countInStock === 0 ? "Unavailable" : addedId === product._id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── ALL ROASTS LIST ── */}
      <section className="py-24 bg-white border-y border-brand-blue/5 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-12">
            The Full Collection
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/10 border border-brand-blue/10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-12 animate-pulse h-64 flex flex-col justify-end">
                   <div className="h-4 w-24 bg-gray-100 mb-4" />
                   <div className="h-8 w-48 bg-gray-100" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-2xl text-brand-blue/40 italic">New roasts arriving soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/10 border border-brand-blue/10">
              {products.map((product, i) => (
                <div key={product._id} className="bg-white p-12 hover:bg-brand-cream transition-colors group">
                  <span className="font-dmsans text-[10px] text-brand-gold font-bold">ROAST 0{i + 1}</span>
                  <h4 className="font-cormorant text-2xl text-brand-blue mt-4 mb-4 group-hover:text-brand-gold transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-brand-blue/60 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-blue font-bold text-sm">₹{product.price.toLocaleString()}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.countInStock === 0}
                      className={`text-[10px] uppercase tracking-widest font-bold border-b pb-1 transition-colors
                        ${product.countInStock === 0
                          ? "text-brand-blue/20 border-brand-blue/10 cursor-not-allowed"
                          : addedId === product._id
                          ? "text-green-700 border-green-700"
                          : "text-brand-blue border-brand-gold hover:text-brand-gold"
                        }`}
                    >
                      {product.countInStock === 0 ? "Out of Stock" : addedId === product._id ? "Added ✓" : "Add to Cart +"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── BREW GUIDE (Ritual Section) ── */}
      <section className="py-32 bg-brand-blue text-brand-cream px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-6 font-bold">The Ritual</p>
          <h2 className="font-cormorant text-4xl md:text-6xl mb-16 max-w-2xl leading-tight">
            The method <span className="italic text-brand-gold">matters.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {brewNotes.map((note) => (
              <div key={note.method} className="border border-white/10 p-10 hover:border-brand-gold/50 transition-colors bg-white/5 backdrop-blur-sm">
                <h3 className="font-cormorant text-2xl text-brand-gold mb-8">{note.method}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Temp</p>
                    <p className="text-sm font-medium">{note.temp}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Ratio</p>
                    <p className="text-sm font-medium">{note.ratio}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1">Time</p>
                    <p className="text-sm font-medium">{note.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 bg-brand-cream text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl text-brand-blue mb-8 leading-tight">
            Elevate your <br /> <span className="italic">morning ritual.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bulk"
              className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold shadow-xl shadow-brand-blue/10 hover:bg-brand-blue/90 transition-all"
            >
              Enquire for Bulk Orders
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}