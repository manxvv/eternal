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

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5EDE0", paddingTop: 120 }}>
        <div style={{ textAlign: "center", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Your Cart</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: 48, fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            Sign in to view your cart
          </h1>
          <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.6, marginBottom: 36 }}>
            Please sign in or create an account to continue.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <Link href="/login" className="btn-primary">Sign In</Link>
            <Link href="/register" className="btn-gold">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  if (ordered) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#F5EDE0", paddingTop: 120 }}>
        <div style={{ textAlign: "center", maxWidth: 500, padding: "0 40px" }}>
          <div style={{ width: 56, height: 56, border: "1px solid var(--gold)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="eyebrow" style={{ textAlign: "center" }}>Order Placed</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: 44, fontWeight: 300, color: "var(--charcoal)", marginBottom: 16 }}>
            Thank you, {user.name.split(" ")[0]}.
          </h1>
          <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.6, lineHeight: 1.8, marginBottom: 40 }}>
            Your order has been received. We'll send a confirmation to {user.email} shortly. Your teas are on their way.
          </p>
          <Link href="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ paddingTop: 140, paddingBottom: 60, backgroundColor: "#F5EDE0", textAlign: "center" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Your Selection</p>
          <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 300, color: "var(--charcoal)", margin: 0 }}>
            Cart
          </h1>
        </div>
      </div>

      <section style={{ padding: "60px 0 100px", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, color: "var(--charcoal)", opacity: 0.5, marginBottom: 32 }}>
                Your cart is empty.
              </p>
              <Link href="/products" className="btn-primary">Discover Products</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 48, alignItems: "start" }}>
              {/* Items */}
              <div>
                <div style={{ borderTop: "1px solid var(--mist)" }}>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr auto",
                        gap: 24,
                        padding: "28px 0",
                        borderBottom: "1px solid var(--mist)",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <div style={{ position: "relative", width: 80, height: 80, overflow: "hidden", flexShrink: 0 }}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="80px" />
                      </div>

                      {/* Info */}
                      <div>
                        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 400, color: "var(--charcoal)", marginBottom: 4 }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.55, marginBottom: 16, fontFamily: "var(--font-dm-sans)" }}>
                          ₹{item.price.toLocaleString()} each
                        </p>
                        {/* Qty */}
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            style={{ width: 28, height: 28, border: "1px solid var(--mist)", background: "none", cursor: "pointer", fontSize: 14, color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            −
                          </button>
                          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--charcoal)", minWidth: 20, textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            style={{ width: 28, height: 28, border: "1px solid var(--mist)", background: "none", cursor: "pointer", fontSize: 14, color: "var(--charcoal)", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", opacity: 0.35, fontFamily: "var(--font-dm-sans)", marginLeft: 8 }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 400, color: "var(--charcoal)", textAlign: "right" }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div
                style={{
                  border: "1px solid var(--mist)",
                  padding: "36px 32px",
                  position: "sticky",
                  top: 100,
                }}
              >
                <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 28 }}>
                  Order Summary
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}>Subtotal</span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, color: "var(--charcoal)" }}>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
                  <span style={{ fontSize: 12, color: "var(--charcoal)", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}>Shipping</span>
                  <span style={{ fontSize: 12, color: "var(--gold)", fontFamily: "var(--font-dm-sans)" }}>
                    {totalPrice >= 999 ? "Free" : "₹99"}
                  </span>
                </div>

                <hr style={{ border: "none", borderTop: "1px solid var(--mist)", marginBottom: 20 }} />

                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
                  <span style={{ fontSize: 12, color: "var(--charcoal)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, color: "var(--charcoal)" }}>
                    ₹{(totalPrice + (totalPrice >= 999 ? 0 : 99)).toLocaleString()}
                  </span>
                </div>

                {totalPrice < 999 && (
                  <p style={{ fontSize: 11, color: "var(--gold)", fontFamily: "var(--font-dm-sans)", marginBottom: 20, textAlign: "center" }}>
                    Add ₹{(999 - totalPrice).toLocaleString()} more for free shipping
                  </p>
                )}

                <button
                  onClick={() => { clearCart(); setOrdered(true); }}
                  style={{
                    width: "100%",
                    padding: "16px",
                    border: "none",
                    backgroundColor: "var(--charcoal)",
                    color: "var(--cream)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    marginBottom: 12,
                  }}
                >
                  Place Order
                </button>

                <Link
                  href="/products"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "14px",
                    border: "1px solid var(--mist)",
                    backgroundColor: "transparent",
                    color: "var(--charcoal)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    textDecoration: "none",
                    textAlign: "center",
                    opacity: 0.6,
                  }}
                >
                  Continue Shopping
                </Link>

                <p style={{ fontSize: 10, color: "var(--charcoal)", opacity: 0.4, textAlign: "center", marginTop: 20, fontFamily: "var(--font-dm-sans)", lineHeight: 1.6 }}>
                  Free returns · Secure checkout · Crafted in India
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
