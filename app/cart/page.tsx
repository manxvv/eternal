"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { user } = useAuth();
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart();
  const [ordered, setOrdered] = useState(false);

  // ── 1. UNAUTHORIZED STATE ──
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20 px-6">
        <div className="text-center max-w-md">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Your Selection</p>
          <h1 className="font-cormorant text-5xl text-brand-blue mb-6">Sign in to view cart</h1>
          <p className="text-brand-blue/60 text-sm mb-10 leading-relaxed">
            Your curated collection awaits. Please sign in to manage your teas and proceed to checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="bg-brand-blue text-brand-gold px-10 py-4 uppercase tracking-widest text-[11px] font-bold">
              Sign In
            </Link>
            <Link href="/register" className="border border-brand-blue text-brand-blue px-10 py-4 uppercase tracking-widest text-[11px] font-bold hover:bg-brand-blue hover:text-white transition-all">
              Join the Atelier
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── 2. SUCCESS STATE (ORDER PLACED) ──
  if (ordered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20 px-6">
        <div className="text-center max-w-lg animate-fade-in">
          <div className="w-16 h-16 border border-brand-gold rounded-full flex items-center justify-center mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EAD292" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="text-brand-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-4">Order Confirmed</p>
          <h1 className="font-cormorant text-5xl text-brand-blue mb-6">Thank you, {user.name.split(" ")[0]}.</h1>
          <p className="text-brand-blue/60 text-sm leading-loose mb-10">
            Your order has been received at the atelier. A confirmation has been sent to <span className="text-brand-blue font-bold">{user.email}</span>. Your ritual begins soon.
          </p>
          <Link href="/products" className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold shadow-xl shadow-brand-blue/10">
            Continue Exploration
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-brand-cream min-h-screen">
      {/* ── HEADER ── */}
      <section className="pt-40 pb-20 bg-brand-blue text-center px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-brand-gold uppercase tracking-[0.4em] text-[10px] font-bold mb-6">Atelier Review</p>
          <h1 className="font-cormorant text-6xl md:text-7xl text-white">Your Cart</h1>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-20 max-w-[1280px] mx-auto">
        {items.length === 0 ? (
          // ── EMPTY STATE ──
          <div className="text-center py-20">
            <h2 className="font-cormorant text-3xl text-brand-blue/30 italic mb-8">Your cart is currently empty.</h2>
            <Link href="/products" className="bg-brand-blue text-brand-gold px-12 py-5 uppercase tracking-widest text-[11px] font-bold">
              Shop the Collection
            </Link>
          </div>
        ) : (
          // ── CART GRID ──
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Items Column (Left) */}
            <div className="lg:col-span-8">
              <div className="border-t border-brand-blue/10">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-[100px_1fr_auto] gap-8 py-10 border-b border-brand-blue/10 items-center">
                    {/* Image */}
                    <div className="relative aspect-square bg-white overflow-hidden shadow-sm">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-cormorant text-2xl text-brand-blue mb-1">{item.name}</h3>
                      <p className="text-[11px] font-bold text-brand-gold uppercase tracking-widest mb-6">
                        ₹{item.price.toLocaleString()}
                      </p>
                      
                      {/* Qty Controls */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-brand-blue/10">
                          <button 
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-blue hover:bg-brand-blue/5 transition-colors"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-brand-blue">{item.quantity}</span>
                          <button 
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-brand-blue hover:bg-brand-blue/5 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] uppercase tracking-widest text-red-800/40 hover:text-red-800 font-bold underline underline-offset-4"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Subtotal per item */}
                    <p className="font-cormorant text-2xl text-brand-blue">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Sidebar (Right) */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-white p-10 border border-brand-blue/5 shadow-2xl shadow-brand-blue/5">
                <h4 className="font-cormorant text-2xl text-brand-blue mb-8 border-b border-brand-blue/5 pb-4">
                  Summary
                </h4>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-blue/50 uppercase tracking-widest text-[10px] font-bold">Subtotal</span>
                    <span className="text-brand-blue font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-blue/50 uppercase tracking-widest text-[10px] font-bold">Shipping</span>
                    <span className={`font-bold ${totalPrice >= 999 ? 'text-green-700' : 'text-brand-gold'}`}>
                      {totalPrice >= 999 ? "Complimentary" : "₹99"}
                    </span>
                  </div>
                </div>

                {totalPrice < 999 && (
                  <div className="bg-brand-gold/5 border border-brand-gold/20 p-4 mb-8 text-center">
                    <p className="text-[10px] text-brand-blue uppercase tracking-widest font-bold">
                      Add ₹{(999 - totalPrice).toLocaleString()} more for free shipping
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-end border-t border-brand-blue/5 pt-6 mb-10">
                  <span className="text-brand-blue uppercase tracking-[0.2em] text-[11px] font-bold">Total</span>
                  <span className="font-cormorant text-4xl text-brand-blue">
                    ₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => { clearCart(); setOrdered(true); }}
                  className="w-full bg-brand-blue text-brand-gold py-5 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-brand-blue/90 shadow-xl shadow-brand-blue/10 transition-all mb-4"
                >
                  Confirm Order
                </button>

                <p className="text-[9px] text-brand-blue/30 uppercase tracking-widest text-center leading-relaxed">
                  Secure Checkout · Artisanal Packaging <br /> Worldwide Delivery available
                </p>
              </div>
            </div>

          </div>
        )}
      </section>
    </main>
  );
}