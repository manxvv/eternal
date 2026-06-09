"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const products = [
  {
    id: "everyday-assam-100g",
    name: "Everyday Assam Tea",
    subtitle: "Classic Bold Blend",
    weight: "100g",
    price: 349,
    image: "/everyday_assam_tea_product_front.jpeg",
    hoverImage: "/everyday_assam_tea_product_back.jpeg",
    bannerImage: "/everyday_assam_tea_product_banner.jpeg",
    desc: "Begin each morning with this bold, malty companion. Sourced from Assam's finest estates, it pairs beautifully with milk or enjoyed plain.",
    note: "Best served: With whole milk",
    category: "tea",
    badge: "Bestseller",
  },
  {
    id: "everyday-assam-250g",
    name: "Everyday Assam Tea",
    subtitle: "Classic Bold Blend",
    weight: "250g",
    price: 749,
    image: "/everyday_assam_tea_product_front.jpeg",
    hoverImage: "/everyday_assam_tea_product_back.jpeg",
    bannerImage: "/everyday_assam_tea_product_banner.jpeg",
    desc: "Begin each morning with this bold, malty companion. Sourced from Assam's finest estates, it pairs beautifully with milk or enjoyed plain.",
    note: "Best served: With whole milk",
    category: "tea",
    badge: "Value Pack",
  },
  {
    id: "majestic-assam-100g",
    name: "Majestic Assam Tea",
    subtitle: "Single Estate Reserve",
    weight: "100g",
    price: 499,
    image: "/majestic_assam_tea_product_front.jpeg",
    hoverImage: "/majestic_assam_tea_product_back.jpeg",
    bannerImage: "/majestic_assam_tea_product_banner.jpeg",
    desc: "Rich and full-bodied, from single-garden estates. A tea for moments that deserve a touch of ceremony.",
    note: "Best served: Black, steeped 4 min",
    category: "tea",
    badge: "Premium",
  },
  {
    id: "majestic-assam-250g",
    name: "Majestic Assam Tea",
    subtitle: "Single Estate Reserve",
    weight: "250g",
    price: 1099,
    image: "/majestic_assam_tea_product_front.jpeg",
    hoverImage: "/majestic_assam_tea_product_back.jpeg",
    bannerImage: "/majestic_assam_tea_product_banner.jpeg",
    desc: "Rich and full-bodied, from single-garden estates. A tea for moments that deserve a touch of ceremony.",
    note: "Best served: Black, steeped 4 min",
    category: "tea",
    badge: "Premium",
  },
];

function ProductCard({ product }: { product: typeof products[0] }) {
  const { user } = useAuth();
  const { addItem, items } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const inCart = items.find((i) => i.id === product.id);

  const handleAddToCart = () => {
    if (!user) return;
    addItem({
      id: product.id,
      name: `${product.name} (${product.weight})`,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      style={{
        border: "1px solid var(--mist)",
        backgroundColor: "var(--cream)",
        transition: "border-color 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
      }}
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
        <Image
          src={hovered ? product.hoverImage : product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover", transition: "opacity 0.4s ease" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              backgroundColor: "var(--charcoal)",
              color: "var(--cream)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "5px 12px",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: "28px 28px 24px" }}>
        <div style={{ width: 24, height: 1, backgroundColor: "var(--gold)", marginBottom: 16 }} />
        <p style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-dm-sans)", marginBottom: 8 }}>
          {product.subtitle}
        </p>
        <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 400, color: "var(--charcoal)", marginBottom: 4, lineHeight: 1.2 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 11, color: "var(--charcoal)", opacity: 0.45, marginBottom: 12, fontFamily: "var(--font-dm-sans)" }}>
          {product.weight}
        </p>
        <p style={{ fontSize: 12, lineHeight: 1.7, color: "var(--charcoal)", opacity: 0.6, marginBottom: 20 }}>
          {product.desc}
        </p>
        <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", fontStyle: "italic", marginBottom: 20 }}>
          {product.note}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, fontWeight: 400, color: "var(--charcoal)" }}>
            ₹{product.price.toLocaleString()}
          </p>

          {user ? (
            <button
              onClick={handleAddToCart}
              style={{
                padding: "10px 20px",
                border: `1px solid ${added ? "var(--gold)" : "var(--charcoal)"}`,
                backgroundColor: added ? "var(--gold)" : "transparent",
                color: added ? "var(--cream)" : "var(--charcoal)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans)",
                transition: "all 0.3s",
              }}
            >
              {added ? "Added ✓" : inCart ? `In Cart (${inCart.quantity})` : "Add to Cart"}
            </button>
          ) : (
            <Link
              href="/login"
              style={{
                padding: "10px 20px",
                border: "1px solid var(--mist)",
                backgroundColor: "transparent",
                color: "var(--charcoal)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: "var(--font-dm-sans)",
                opacity: 0.6,
              }}
            >
              Sign In to Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <>
      {/* Header with banner image */}
      <div
        style={{
          paddingTop: 160,
          paddingBottom: 80,
          backgroundColor: "#F5EDE0",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/everyday_assam_tea_product_banner.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.08,
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Shop</p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(48px, 7vw, 80px)",
              fontWeight: 300,
              color: "var(--charcoal)",
              letterSpacing: "-0.01em",
              marginBottom: 20,
            }}
          >
            Our Products
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 18,
              fontStyle: "italic",
              color: "var(--charcoal)",
              opacity: 0.65,
              marginBottom: 32,
            }}
          >
            Teas & accessories crafted for life's finest moments.
          </p>

          {!user && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 28px",
                border: "1px solid var(--gold)",
                backgroundColor: "rgba(196,168,130,0.08)",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p style={{ fontSize: 12, color: "var(--charcoal)", fontFamily: "var(--font-dm-sans)", margin: 0 }}>
                <Link href="/login" style={{ color: "var(--charcoal)", fontWeight: 500 }}>Sign in</Link>
                {" "}or{" "}
                <Link href="/register" style={{ color: "var(--charcoal)", fontWeight: 500 }}>create an account</Link>
                {" "}to add items to your cart.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ backgroundColor: "var(--cream)", borderBottom: "1px solid var(--mist)", padding: "0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex", gap: 0 }}>
          {[["all", "All Products"], ["tea", "Teas"], ["coffee", "Coffee"], ["accessories", "Accessories"]].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              style={{
                padding: "16px 24px",
                background: "none",
                border: "none",
                borderBottom: filter === val ? "2px solid var(--charcoal)" : "2px solid transparent",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: filter === val ? "var(--charcoal)" : "var(--charcoal)",
                opacity: filter === val ? 1 : 0.45,
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans)",
                transition: "all 0.2s",
                marginBottom: -1,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--cream)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 28,
            }}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", opacity: 0.5 }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, color: "var(--charcoal)" }}>
                Coming soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured banner — Majestic Assam */}
      <section
        style={{
          position: "relative",
          height: 480,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          src="/majestic_assam_tea_product_banner.jpeg"
          alt="Majestic Assam Tea"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, rgba(86,84,72,0.85) 0%, rgba(86,84,72,0.3) 100%)",
          }}
        />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
            Featured
          </p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, color: "var(--cream)", marginBottom: 16, maxWidth: 500, lineHeight: 1.2 }}>
            Majestic Assam — Single Estate Reserve
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,250,244,0.7)", maxWidth: 400, lineHeight: 1.8, marginBottom: 32 }}>
            From a single high-altitude garden in Assam. Rich, complex, made for slow mornings.
          </p>
          <Link href="#products-grid" className="btn-gold">
            Shop Majestic Assam
          </Link>
        </div>
      </section>

      {/* Bulk CTA */}
      <section style={{ padding: "80px 0", backgroundColor: "var(--cream)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 40px" }}>
          <p className="eyebrow" style={{ textAlign: "center" }}>Bulk & Corporate</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--charcoal)", marginBottom: 20 }}>
            Ordering for your team or gifting?
          </h2>
          <p style={{ fontSize: 14, color: "var(--charcoal)", opacity: 0.6, lineHeight: 1.8, marginBottom: 36 }}>
            We offer custom packaging, curated gift sets, and bulk pricing for corporate and wholesale orders.
          </p>
          <Link href="/bulk" className="btn-primary">Enquire Now</Link>
        </div>
      </section>
    </>
  );
}
