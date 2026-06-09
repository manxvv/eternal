"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Tea", href: "/tea" },
  { label: "Coffee", href: "/coffee" },
  { label: "Accessories", href: "/accessories" },
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
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-md border-b border-brand-blue/10 py-4" : "bg-transparent py-8"
    }`}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/Eternal logo corp2-01.png"
            alt="Eternal Logo"
            className={`transition-all duration-500 ${scrolled ? "h-10" : "h-16"}`}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-dmsans text-[12px] uppercase tracking-[0.2em] text-brand-blue hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link href="/cart" className="relative group text-brand-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-blue text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          {user ? (
            <div className="flex items-center gap-6 border-l border-brand-blue/10 pl-6">
              <span className="text-[11px] font-medium uppercase tracking-widest text-brand-gold">
                {user.name.split(" ")[0]}
              </span>
              <button onClick={logout} className="text-[10px] uppercase tracking-widest text-brand-blue/50 hover:text-brand-blue">
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-[11px] uppercase tracking-widest text-brand-blue font-bold border-b border-brand-gold">
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-brand-blue">
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-blue/5 px-10 py-10 space-y-6 animate-fade-in">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block font-cormorant text-2xl text-brand-blue">
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="block font-dmsans text-xs uppercase tracking-widest text-brand-gold pt-4">
            Account Login
          </Link>
        </div>
      )}
    </header>
  );
}