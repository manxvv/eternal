"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Tea", href: "/tea" },
  { label: "Coffee", href: "/coffee" },
  { label: "Accessories", href: "/accessories" },
  { label: "Products", href: "/products" },
  { label: "Bulk Buying", href: "/bulk" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? "rgba(255,250,244,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid #E8DDD0" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? "16px 0" : "28px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="/Eternal logo corp2-01.png"
            alt="Eternal Logo"
            style={{ height: scrolled ? "40px" : "50px", transition: "all 0.4s" }}
          />
        </Link>

        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}

          <Link
            href="/cart"
            style={{ position: "relative", display: "flex", alignItems: "center", color: "var(--charcoal)", textDecoration: "none" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: -6, right: -8, background: "var(--charcoal)", color: "var(--cream)", fontSize: 9, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-sans)" }}>
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 11, color: "var(--gold)", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.1em" }}>
                {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                style={{ background: "none", border: "none", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--charcoal)", cursor: "pointer", opacity: 0.6, fontFamily: "var(--font-dm-sans)" }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="nav-link">Sign In</Link>
          )}
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn" aria-label="Toggle menu">
          <span style={{ display: "block", width: 24, height: 1, backgroundColor: "var(--charcoal)", marginBottom: 6, transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: 24, height: 1, backgroundColor: "var(--charcoal)", marginBottom: 6, opacity: menuOpen ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ display: "block", width: 24, height: 1, backgroundColor: "var(--charcoal)", transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ backgroundColor: "var(--cream)", borderTop: "1px solid var(--mist)", padding: "24px 40px" }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--mist)" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none", padding: "14px 0", borderBottom: "1px solid var(--mist)" }}>
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} style={{ display: "block", background: "none", border: "none", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", cursor: "pointer", padding: "14px 0", width: "100%", textAlign: "left" }}>
              Sign Out ({user.name})
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} style={{ display: "block", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--charcoal)", textDecoration: "none", padding: "14px 0" }}>
              Sign In
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
