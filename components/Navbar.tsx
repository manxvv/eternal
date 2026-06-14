"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FIX: Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] bg-white border-b border-brand-blue/5 transition-all duration-300 ${
        scrolled ? "py-4 shadow-sm" : "py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-center relative">
        
        {/* Desktop Nav - Centered */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-dmsans text-[11px] uppercase tracking-[0.25em] text-brand-blue hover:text-brand-gold transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link href="/cart" className="relative group text-brand-blue hover:text-brand-gold transition-colors ml-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-blue text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-dmsans">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-6 border-l border-brand-blue/10 pl-8 ml-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  {user.name.split(" ")[0]}
                </span>
                <button 
                  onClick={logout} 
                  className="text-[10px] uppercase tracking-widest text-brand-blue/40 hover:text-brand-blue transition-colors font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-[10px] uppercase tracking-widest text-brand-blue font-bold border-b border-brand-gold/60 hover:border-brand-gold transition-all">
                Sign In
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Toggle - Z-index ensures it stays on top of overlay */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden absolute right-6 text-brand-blue z-[110]"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-brand-blue transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-white z-[90] flex flex-col justify-center px-12 space-y-8 transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            onClick={() => setMenuOpen(false)} 
            className="block font-cormorant text-4xl text-brand-blue"
          >
            {link.label}
          </Link>
        ))}
        <div className="pt-10 border-t border-brand-blue/5 flex flex-col gap-6">
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="font-dmsans text-xs uppercase tracking-widest text-brand-blue flex justify-between font-bold">
            Your Selection <span>({totalItems})</span>
          </Link>
          {user ? (
            <button onClick={() => { logout(); setMenuOpen(false); }} className="text-left font-dmsans text-xs uppercase tracking-widest text-brand-gold font-bold">
              Sign Out ({user.name})
            </button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="font-dmsans text-xs uppercase tracking-widest text-brand-gold font-bold">
              Member Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}