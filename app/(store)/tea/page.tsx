"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
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

const flowerTeas = [
  {
    name: "Blue Empress",
    desc: "A rare blue infusion from butterfly pea flowers. Vivid indigo in the cup.",
    note: "Add lemon to watch it turn pink",
  },
  {
    name: "Hibiscus Blossom",
    desc: "Vivid, tart, and deeply floral. Dried at their peak.",
    note: "Best served: Chilled, with honey",
  },
];

export default function TeaPage() {
  const [addedId, setAddedId] = useState<string | null>(null);
  const { mutateAsync: addToCart } = useAddToCart();

  // ── DATA FETCHING ──
  // Using the backend category filter: /api/products?category=tea
  const { data: products = [], isLoading } = useProductsUser("Tea");

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product._id);
      setAddedId(product._id);
      setTimeout(() => setAddedId(null), 1500);
    } catch (err) {
      // Errors are handled by the toast in useAddToCart hook
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
            backgroundImage: "url('/tea.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-brand-blue/80 via-brand-blue/40 to-brand-blue/90" />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-6 font-bold">
            The Eternal Collection
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl text-white leading-tight mb-6">
            Teas
          </h1>
          <p className="font-cormorant italic text-xl text-white/70 max-w-lg mx-auto">
            From everyday indulgence to refined single-estate experiences.
          </p>
        </div>
      </section>

      {/* ── FEATURED SELECTION ── */}
      {!isLoading && featured.length > 0 && (
        <section className="py-24 px-6 lg:px-20 max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-brand-gold" />
            <p className="uppercase tracking-widest text-[10px] font-bold text-brand-blue">
              Featured Selection
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
                      {product.countInStock === 0 ? "Out of Stock" : addedId === product._id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── PRODUCT LIST ── */}
      <section className="py-24 bg-white border-y border-brand-blue/5 px-6 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <p className="uppercase tracking-widest text-[10px] font-bold text-brand-gold mb-12">
            Single Estate & Blended
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/10 border border-brand-blue/10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-12 animate-pulse h-64">
                   <div className="h-4 w-8 bg-gray-100 mb-6" />
                   <div className="h-8 w-48 bg-gray-100 mb-4" />
                   <div className="h-4 w-full bg-gray-50" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-cormorant text-2xl text-brand-blue/30 italic">New collections coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-blue/10 border border-brand-blue/10">
              {products.map((product, i) => (
                <div key={product._id} className="bg-white p-12 hover:bg-brand-cream transition-colors group">
                  <span className="font-dmsans text-[10px] text-brand-gold font-bold">0{i + 1}</span>
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

      {/* ── FLOWER TEAS ── */}
      <section id="flower" className="py-32 bg-brand-blue text-brand-cream px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <p className="uppercase tracking-[0.4em] text-[10px] text-brand-gold mb-6 font-bold">Nature's Artistry</p>
          <h2 className="font-cormorant text-4xl md:text-6xl mb-16 max-w-2xl leading-tight">
            Delicate infusions <br />
            <span className="italic text-brand-gold">inspired by nature.</span>
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

      {/* ── CTA ── */}
      <section className="py-32 bg-brand-cream text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-cormorant text-4xl md:text-5xl text-brand-blue mb-8">
            Ready to curate your ritual?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-brand-blue text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-brand-blue/90 transition-all"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}